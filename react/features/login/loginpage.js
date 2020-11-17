// @flow

import React, { Component } from 'react';
import {
  Alert, NativeModules, ScrollView, Switch, Text, TextInput,
  View, Image, Button,Keyboard
} from 'react-native';
// import LoginScreen from "react-native-login-screen";

import LoginScreen from './lib/LoginScreen';
import { signUp, signIn } from './apihit';

import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'
/**
 * Application information module.
 */
const { AppInfo } = NativeModules;
 

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}

const storeEmail = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key_Email', value)
  } catch (e) {
    // saving error
  }
}

 
const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
/**
 * The native container rendering the app settings page.
 *
 * @extends AbstractSettingsView
 */
class LoginPage extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      email: '',
      password: '',
      repassword: '',
      cardstate: '1'  // 1 for login, 2 sign up
    };


  }
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render() {
    // const { displayName, email, serverURL, startWithAudioMuted, startWithVideoMuted } = this.state;
    return (
      <LoginScreen
      source=''
      loginButtonBackgroundColor='#ffffff'

      logoComponent={
        <View style={{display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center' }}>
          <Image source={require('./applogo.png')} style={{ width: 100, height: 100 }} />
        <Image source={require('./profile_pic.png')} style={{ width: 60, height: 60 }} />
      
        </View>
        // <Text style={{color:'black', fontSize:24}}>Kodu Live</Text>
      }
      signupText={'NEW USER?REGISTER'}
      
      spinnerEnable
      spinnerVisibility={this.state.loader}
      spinnerColor={'#f4511e'}
      labelTextStyle={{
        color: "#adadad",
         
      }}
      logoTextStyle={{
        fontSize: 27,
        color: "#fdfdfd",
        fontFamily: "Now-Black"
      }}
      loginButtonTextStyle={{
        color: "white",
        
      
        
      }}
       textStyle={{
        color: "#757575",
        fontFamily: "Now-Regular",
      }}
      signupStyle={{
        color: "grey",
        fontSize:10
      }}
      usernameOnChangeText={(username) => this.setState({ email: username })}
      emailOnChangeText={(username) => this.setState({ email: username })}

      onPressSettings={() => alert("Settings Button is pressed")}
      passwordOnChangeText={(password) => this.setState({ password: password })}

      repasswordOnChangeText={(password) => this.setState({ repassword: password })}
      onPressLogin={() => {
        // console.log(value);
        Keyboard.dismiss();
        console.log(this.props);
        // this.props.navigation.push('LoggedInPage');
        if (!validateEmail(this.state.email)) {
          Alert.alert(
            "Message",
            "Please enter valid email",
            [

              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
          return;

        }


        if (this.state.password.length < 8) {
          Alert.alert(
            "Message",
            "Please enter password between 8 and 16 characters",
            [

              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
          return;

        }



        if (this.state.cardstate === '1') {
          
          this.setState({ loader: true });
          signIn(this.state.email, this.state.password, (responseServer) => {
            this.setState({ loader: false });
            if (responseServer.data.authToken) {
              console.log(responseServer);
              Toast.show('Sign In Successful');
              // console.log(this.props);
              storeData(responseServer.data.authToken);
              storeEmail(this.state.email);
              this.props.navigation.push('LoggedInPage');
            }
          });
        }


        if (this.state.cardstate === '2') {
          if (this.state.password !== this.state.repassword) {
            Alert.alert(
              "Message",
              "Passwords should match",
              [

                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
            return;
          }

          this.setState({ loader: true });

          signUp(this.state.email, this.state.password, (responseServer) => {
            this.setState({ loader: false });
            if (responseServer.data.authToken) {
              console.log(responseServer);
              Toast.show('Sign Up Successful');
              storeData(responseServer.data.authToken);
              storeEmail(this.state.email);
              this.props.navigation.push('LoggedInPage');

            }
          });
        }





      }}
      onPressSignup={() => {
        console.log("onPressSignUp is pressed", this.state);
        if (this.state.cardstate === '1') {
          this.setState({ cardstate: '2' });
        }

        if (this.state.cardstate === '2') {
          this.setState({ cardstate: '1' });
        }




      }}
    >

    </LoginScreen>
    );
  }

}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */


export default LoginPage;
