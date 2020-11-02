// @flow

import React, { Component } from 'react';
import {
  Alert, NativeModules, ScrollView, Switch, Text, TextInput,
  View, Image, Button,Keyboard,SafeAreaView, Dimensions,FlatList
} from 'react-native';
// import LoginScreen from "react-native-login-screen";


import { getAllMeetings } from './apihit';

import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';


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
class JoinMeetingPage extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
       allMeetings:{}
    };


  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
        console.log(value);
        getAllMeetings(value, (response) => {
          console.log(response);
          this.setState({ allMeetings: response.data });
        });

      }
    } catch (e) {
      // error reading value
    }
  }

  async componentDidMount() {
    // await this.getData();
  }

  render() {
    // const { displayName, email, serverURL, startWithAudioMuted, startWithVideoMuted } = this.state;
     
     
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,  }}>

        <View style={{
          height: 70, width: windowWidth, flexDirection: 'row', justifyContent: 'center',
          backgroundColor: '#f4511e', alignContent: 'center', alignItems: 'center'
        }}>
          <Image source={require('./applogo.png')} style={{ width: 60, height: 60 }} />
        </View>

        

        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text>New Meeting</Text>
          {/* <Text>{this.state.userData.name}</Text> */}
        </View>
        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center' }}>
          
          {/* <Button title={'Join Meeting'} />
           
          <Button title={'Create Meeting'}/> */}
          {/* <Text>{this.state.userData.email}</Text> */}
        </View>
        
       

         

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


export default JoinMeetingPage;
