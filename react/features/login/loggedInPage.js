// @flow

import React, { Component } from 'react';
import {
    Alert, NativeModules, ScrollView, Switch, Text, TextInput,
    View, Image, Button
} from 'react-native';
// import LoginScreen from "react-native-login-screen";

import LoginScreen from './lib/LoginScreen';
import { signUp, signIn } from './apihit';

import Toast from 'react-native-simple-toast';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MeetingPage from './meetings';
import ProfilePage from './profile';
import NewMeetingPage from './newmeeting';

import { createStackNavigator } from '@react-navigation/stack';
/**
 * Application information module.
 */
const { AppInfo } = NativeModules;


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MeetingStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="MeetingPage" component={MeetingPage} />
        <Stack.Screen name="NewMeetingPage" component={NewMeetingPage} />
      </Stack.Navigator>
    );
  }

/**
 * The native container rendering the app settings page.
 *
 * @extends AbstractSettingsView
 */
class LoggedInPage extends React.Component<Props, State> {

    

    render() {
        // const { displayName, email, serverURL, startWithAudioMuted, startWithVideoMuted } = this.state;
        return (
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Meetings') {
                                iconName = focused
                                    ? 'ios-information-circle'
                                    : 'ios-information-circle-outline';
                            } else if (route.name === 'Profile') {
                                iconName = focused ? 'ios-list-circle' : 'ios-list';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Meetings" component={MeetingPage} />
                    <Tab.Screen name="Profile" component={ProfilePage} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }

}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */


export default LoggedInPage;
