// @flow

import React, { Component } from 'react';
import {
  Alert, NativeModules, ScrollView, Switch, Text, TextInput,
  View, Image, Button, Keyboard, SafeAreaView, Dimensions, FlatList, KeyboardAvoidingView
} from 'react-native';
// import LoginScreen from "react-native-login-screen";


import { createMeeting } from './apihit';

import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Spinner from "react-native-spinkit";

/**
 * Application information module.
 */
const { AppInfo } = NativeModules;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



/**
 * The native container rendering the app settings page.
 *
 * @extends AbstractSettingsView
 */
class NewMeetingPage extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      allMeetings: {},
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      isEndTimePickerVisible: false,
      meetingtitle: '',
      meetingDate: Date.now(),
      meetingTime: Date.now(),
      meetingEndTime: Date.now(),
      guestsEmail: [],
      currentGuestEmail: '',
      showSpinner:false
    };


  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
        // console.log(value);
        return value;
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

    const showDatePicker = () => {
      // setDatePickerVisibility(true);
      this.setState({ isDatePickerVisible: true });
    };

    const hideDatePicker = () => {
      // setDatePickerVisibility(false);
      this.setState({ isDatePickerVisible: false });
    };

    const handleConfirm = (date) => {
      // console.warn("A date has been picked: ", date);
      this.setState({ meetingDate: date });
      hideDatePicker();
    };


    const showTimePicker = () => {
      // setDatePickerVisibility(true);
      this.setState({ isTimePickerVisible: true });
    };

    const hideTimePicker = () => {
      // setDatePickerVisibility(false);
      this.setState({ isTimePickerVisible: false });
    };

    const handleTimeConfirm = (date) => {
      // console.warn("A time has been picked: ", date);
      this.setState({ meetingTime: date });
      hideTimePicker();
    };


    const showEndTimePicker = () => {
      // setDatePickerVisibility(true);
      this.setState({ isEndTimePickerVisible: true });
    };

    const hideEndTimePicker = () => {
      // setDatePickerVisibility(false);
      this.setState({ isEndTimePickerVisible: false });
    };

    const handleEndTimeConfirm = (date) => {
      // console.warn("A time has been picked: ", date);
      this.setState({ meetingEndTime: date });
      hideEndTimePicker();
    };


    function saveMeeting() {

    }


    const validateEmail = email => {
      var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    const renderGuestList = ({ item }) => (
      <View style={{
        width: windowWidth, flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', borderColor: 'grey', borderWidth: 2
      }}>
        <Text >{item}</Text>
        <Button title='Del' onPress={() => {
          console.log(this.state.guestsEmail.indexOf(item));
          if (this.state.guestsEmail.indexOf(item) !== -1) {
            this.state.guestsEmail.splice(this.state.guestsEmail.indexOf(item), 1);
            this.setState({ guestsEmail: Object.assign(this.state.guestsEmail) });
          }

        }} />
      </View>

    );
    return (

      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flex: 1, }}>
       
          <KeyboardAvoidingView behavior='position'>
            <View style={{
              height: 70, width: windowWidth, flexDirection: 'row', justifyContent: 'space-around',
              backgroundColor: '#f4511e', alignContent: 'center', alignItems: 'center'
            }}>
              <Image source={require('./applogo.png')} style={{ width: 60, height: 60 }} />
              <View style={{ marginRight: -60 }}>
                <Button title="Save" onPress={async () => {
                  // validation pending.
                  if(this.state.meetingtitle.length <1){
                    Toast.show('Please enter Meeting title');
                    return;
                  }
                  this.setState({showSpinner:true});
                  const authtoken = await this.getData();
                  createMeeting(authtoken, this.state.meetingtitle, moment(this.state.meetingDate).utc(), moment(this.state.meetingTime).unix(), moment(this.state.meetingEndTime).unix(), this.state.guestsEmail, (res) => {
                    console.log(res);
                    this.setState({showSpinner:false});
                    if (res.data.meetingCode) {
                      Toast.show('Meeting created Successfully');
                      this.props.navigation.push('LoggedInPage');
                    }else{
                      Toast.show('Error in creating Meeting');
                    }
                  });
                }} />
              </View>
            </View>



            <View style={{ height: 40, flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Text>New Meeting</Text>
              {/* <Text>{this.state.userData.name}</Text> */}
            </View>
            <View style={{ height: 80, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text>Enter Meeting Title</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: windowWidth * 0.8 }}
                onChangeText={text => this.setState({ meetingtitle: text })}
                value={this.state.meetingtitle}
              />


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text>Meeting Date </Text>

              <Button title={moment(this.state.meetingDate).format("DD-MM-YYYY")} onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />



            </View>
            {/* <Text>Date Selected - {this.state.meetingDate}</Text> */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text>Start Time </Text>

              <Button title={moment(this.state.meetingTime).format("HH:mm")} onPress={showTimePicker} />
              <DateTimePickerModal
                isVisible={this.state.isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />

              {/* <Text>Time Selected - {this.state.meetingTime}</Text> */}

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text>End Time </Text>

              <Button title={moment(this.state.meetingEndTime).format("HH:mm")} onPress={showEndTimePicker} />
              <DateTimePickerModal
                isVisible={this.state.isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={hideEndTimePicker}
              />

              {/* <Text>Time Selected - {this.state.meetingTime}</Text> */}

            </View>


            <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'flex-start' }}>
              <Text>Enter Guests email id</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: windowWidth * 0.8 }}
                  onChangeText={text => this.setState({ currentGuestEmail: text })}
                  value={this.state.currentGuestEmail}
                />
                <Button style={{ width: 40, height: 40 }} title="+" onPress={() => {
                  Keyboard.dismiss();
                  if (validateEmail(this.state.currentGuestEmail)) {
                    if (this.state.guestsEmail.indexOf(this.state.currentGuestEmail) === -1) {

                      this.state.guestsEmail.push(this.state.currentGuestEmail);
                      console.log(this.state.guestsEmail);
                      this.setState({ currentGuestEmail: '' });
                    } else {
                      Toast.show('Email id Already present');
                    }

                  } else {
                    // show toast
                    Toast.show('Enter Valid Emailid');
                  }

                }} />


              </View>
              <Text>Guests List</Text>

              <FlatList
                data={this.state.guestsEmail}
                renderItem={renderGuestList}
                keyExtractor={item => this.state.guestsEmail.indexOf(item).toString()}
                style={{ backgroundColor: 'white' }}
              />

            </View>




          </KeyboardAvoidingView>

         {this.state.showSpinner && 
          <View style={{flex:1, zIndex:3443, position:'absolute', 
          backgroundColor:'lightgrey', width:windowWidth, height:windowHeight, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
         <Spinner
       size={100}
       type= 'Wave'
       // style={spinnerStyle}
       color={'red'}
       isVisible={this.state.showSpinner}
     />
         </View>}
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


export default NewMeetingPage;
