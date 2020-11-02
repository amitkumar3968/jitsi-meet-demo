// @flow

import React, { Component } from 'react';
import {
  Alert, NativeModules, ScrollView, Switch, Text, TextInput,
  View, Image, Button, Keyboard, SafeAreaView, Dimensions, FlatList
} from 'react-native';
// import LoginScreen from "react-native-login-screen";


import { getAllMeetings ,getMeetingToken} from './apihit';

import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { appNavigate } from '../app/actions';
// import RNPureJwt from "react-native-pure-jwt";
// var jwt = require('jsonwebtoken');
import moment from "moment";

// import jwt from './jwt';
/**
 * Application information module.
 */
const { AppInfo } = NativeModules;
const windowWidth = Dimensions.get('window').width;



/**
 * The native container rendering the app settings page.
 *
 * @extends AbstractSettingsView
 */
class MeetingPage extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      allMeetings: {},
      currentEmail: '',
      authToken:''
    };


  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
        console.log(value);
        this.setState({authToken:value});
        getAllMeetings(value, (response) => {
          console.log(response);
          this.setState({ allMeetings: response.data });
        });

      }
    } catch (e) {
      // error reading value
    }
  }

  getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key_Email')
      if (value !== null) {
        // value previously stored
        this.setState({ currentEmail: value });



      }
    } catch (e) {
      // error reading value
    }
  }


  async componentDidMount() {
    await this.getData();
    await this.getEmail();
  }

  render() {
    // const { displayName, email, serverURL, startWithAudioMuted, startWithVideoMuted } = this.state;

    const renderItem = ({ item }) => (
      <View style={{ borderColor: 'grey', borderWidth: 2 }}>
        <Text >{item.title}</Text>
        <Text > Meeting Date - {moment(item.meetingDate).format('DD-MM-YYYY')}</Text>
        <Text > Guests- {item.guestEmailsString}</Text>
        <Text > startTime - {moment.unix(item.startTime).format('HH:mm ')}</Text>
        <Text > EndTime - {moment.unix(item.endTime).format('HH:mm ')}</Text>
        <Button title='Join' onPress={() => {

          // this.props.navigation.push('Root');

           

         // this.props.navigation.push('Root', { url: meetingUrl });
          getMeetingToken(item.meetingCode,this.state.authToken, (response) => {
            console.log(response.data);

            if(response.data.token){
              const meetingUrl = 'https://meeting.kodulive.com/' + item.meetingCode + '?jwt=' + response.data.token + '#config.subject=' + '"' + item.title + '"';
            
              this.props.navigation.push('Root', { url: meetingUrl });
            }else{
              Toast.show('No Meeting Token Found');
            }
           // this.setState({ allMeetings: response.data });
          });


        }} />
      </View>

    );

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, }}>

          <View style={{
            height: 70, width: windowWidth, flexDirection: 'row', justifyContent: 'center',
            backgroundColor: '#f4511e', alignContent: 'center', alignItems: 'center'
          }}>
            <Image source={require('./applogo.png')} style={{ width: 60, height: 60 }} />
          </View>



          <View style={{ height: 40, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text>Meetings</Text>
            {/* <Text>{this.state.userData.name}</Text> */}
          </View>
          <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center' }}>

            <Button title={'Join Meeting'} />

            <Button title={'Create Meeting'} onPress={() => {
              console.log(this.props);
              this.props.navigation.push('NewMeetingPage');



            }} />
            {/* <Text>{this.state.userData.email}</Text> */}
          </View>
          <FlatList
            data={this.state.allMeetings.data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />




        </View>
      </SafeAreaView>
    );
  }

}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */


export default MeetingPage;
