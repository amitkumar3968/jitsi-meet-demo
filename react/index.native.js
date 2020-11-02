// @flow

// Apply all necessary polyfills as early as possible to make sure anything imported henceforth
// sees them.
import 'react-native-gesture-handler';
import './features/mobile/polyfills';

import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';

import { App } from './features/app/components';
import { _initLogging } from './features/base/logging/functions';
import { IncomingCallApp } from './features/mobile/incoming-call';
import LoginPage  from './features/login/loginpage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoggedInPage from './features/login/loggedInPage';
import NewMeetingPage from './features/login/newmeeting';
import JoinMeetingPage from './features/login/joinmeeting';




declare var __DEV__;
/**
 * The type of the React {@code Component} props of {@link Root}.
 */
type Props = {

    /**
     * The URL, if any, with which the app was launched.
     */
    url: Object | string
};

/**
 * React Native doesn't support specifying props to the main/root component (in
 * the JS/JSX source code). So create a wrapper React Component (class) around
 * features/app's App instead.
 *
 * @extends Component
 */
class Root extends PureComponent<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
     
    
    render() {
        const flagsPropData = {
            'pip.enabled':true,
            'call-integration.enabled':true,
            'server-url-change.enabled':true,
            'resolution':360,
            'welcomepage.enabled':false
        };
        const urlProps ={
            "serverURL":"https://meet.jit.si",
            "config":{ 'subject':'dfds','name':'hh'}
    };
     
        // console.log(...flagsPropData);

        // {
        //     url:'https://meeting.kodulive.com/meeting-room-code#userInfo.displayName="user-first-name-here-without-space"',
        //     timestamp:Date.now(),
        //     flags:{"pip.enabled":true,"call-integration.enabled":false,"server-url-change.enabled":true,"resolution":360,"welcomepage.enabled":true},
        //   }

         return (
            <App
                 {...this.props}
               //room={'amittesting123'}
                // url={ 'https://meeting.kodulive.com/f50f4f37-45aa-42f1-aa0a-9d464e0988c8?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJyYXZpbmRlci5wb29uaWFAbXVsdGl0dnNvbHV0aW9uLmNvbSIsImVtYWlsIjoicmF2aW5kZXIucG9vbmlhQG11bHRpdHZzb2x1dGlvbi5jb20ifSwicm9vbSI6ImY1MGY0ZjM3LTQ1YWEtNDJmMS1hYTBhLTlkNDY0ZTA5ODhjOCIsImlhdCI6MTU5OTYzMzAyNywiYXVkIjoiODhGMkExNjU2OTUwQiIsImlzcyI6Ijg4RjJBMTY1Njk1MEIiLCJzdWIiOiJtZWV0aW5nLmtvZHVsaXZlLmNvbSJ9.kOy1_BdoG8jjIPPAog18MyBaYh-flDn92xIcVSBhk4A#config.subject="talk-with-neil"&config.lobbyEnabled=true'}
            url = {this.props.route.params.url}
                timestamp={Date.now()}
                 flags={flagsPropData}
               //  externalAPIScope={'5d8d27d2-ecd0-4eec-8d95-74d48841bc45'}
             
                />
        );
    }
}

// Initialize logging.
_initLogging();

// HORRIBLE HACK ALERT! React Native logs the initial props with `console.log`. Here we are quickly patching it
// to avoid logging potentially sensitive information.
if (!__DEV__) {
    /* eslint-disable */

    const __orig_console_log = console.log;
    const __orig_appregistry_runapplication = AppRegistry.runApplication;

    AppRegistry.runApplication = (...args) => {
        // $FlowExpectedError
        console.log = () => {};
        __orig_appregistry_runapplication(...args);
        // $FlowExpectedError
        console.log = __orig_console_log;
    };

    /* eslint-enable */
}


// Register the main/root Component of JitsiMeetView.
// AppRegistry.registerComponent('App', () => Root);

const Stack = createStackNavigator();
function NavStack (){
return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false
        }}>
           <Stack.Screen name="Home"  component={LoginPage}>
            
          </Stack.Screen>
          <Stack.Screen name="LoggedInPage" component={LoggedInPage} />
          <Stack.Screen name="NewMeetingPage" component={NewMeetingPage} />
          <Stack.Screen name="JoinMeetingPage" component={JoinMeetingPage} />
          <Stack.Screen name="Root" component={Root} />
        </Stack.Navigator>

      </NavigationContainer>
);
}

 

AppRegistry.registerComponent('App', () => 
NavStack
 );

// Register the main/root Component of IncomingCallView.
AppRegistry.registerComponent('IncomingCallApp', () => IncomingCallApp);
