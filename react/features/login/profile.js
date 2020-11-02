// @flow

import React, { Component } from 'react';
import {
  Alert, NativeModules, ScrollView, Switch, Text, TextInput,
  View, Image, Button, Keyboard, SafeAreaView, Dimensions
} from 'react-native';
// import LoginScreen from "react-native-login-screen";

import LoginScreen from './lib/LoginScreen';

import Toast from 'react-native-simple-toast';

import { userProfile } from './apihit';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';

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
class ProfilePage extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };

  }


  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
        console.log(value);
        userProfile(value, (response) => {
          console.log(response);
          this.setState({ userData: response.data });
        });

      }
    } catch (e) {
      // error reading value
    }
  }

  async componentDidMount() {
    await this.getData();
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

          <View style={{ height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <Image source={require('./profile_pic.png')} style={{ width: 60, height: 60 }} />
          </View>

          <View style={{ height: 40, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text>Name -</Text>
            <Text>{this.state.userData.name}</Text>
          </View>
          <View style={{ height: 40, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text>Email -</Text>
            <Text>{this.state.userData.email}</Text>
          </View>

          <View style={{ height: 40, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text>Mobile -</Text>
            {/* <Text>{this.state.userData.email}</Text> */}
          </View>


          <View style={{ height: 40, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text>Plan -</Text>
            <Text>Basic Plan</Text>
            {/* <Text>{this.state.userData.email}</Text> */}
          </View>

          <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}>
            <Button title='LogOut' onPress={  async() => {
              console.log('logout pressed');
              await AsyncStorage.setItem('@storage_Key', '')
              // this.props.navigation.push('Home');
              
              if(this.props.navigation.canGoBack()){
                // const popAction = StackActions.popToTop();
              this.props.navigation.popToTop();
              // this.props.navigation.goBack();
              }
            }}></Button>
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


export default ProfilePage;
