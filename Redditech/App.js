import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./src/LoginPage"
import MenuPage from "./src/Menu"
import ProfilPage from "./src/Profil"
import SubRedditPage from "./src/Subreddit"
import SettingsPage from "./src/Settings"
import Subscriber from "./src/Subscriber"
import ProfileSub from "./src/ProfileSub"
import AccountSettings from "./src/AccountSettings"
import Search from "./src/Search"

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginPage" component={LoginPage}
           options={{
            title: 'LOGIN',
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#7F40BF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />
        <Stack.Screen name="MenuPage" component={MenuPage}
          options={{
            title: 'MENU',
            headerShown: false,
            headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#2A2A2A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',

          },
        }}/>
          <Stack.Screen name="ProfilPage" component={ProfilPage}
            options={{
            title: 'PROFIL',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2A2A2A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',

            },
          }}
          />
          <Stack.Screen name="SubRedditPage" component={SubRedditPage}
            options={{
            title: 'SUBREDDIT',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2A2A2A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',

            },
          }}
          />
          <Stack.Screen name="SettingsPage" component={SettingsPage}
            options={{
            title: 'SETTINGS',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2A2A2A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',

            },
          }}
          />
          <Stack.Screen name="Subscriber" component={Subscriber}
            options={{
            title: '',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2A2A2A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',

            },
          }}
          />
          <Stack.Screen name="ProfileSub" component={ProfileSub}
            options={{
            title: '',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2A2A2A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',

            },
          }}
          />
          <Stack.Screen name="AccountSettings" component={AccountSettings}
            options={{
            title: '',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2A2A2A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',

            },
          }}
          />
          <Stack.Screen name="Search" component={Search}
            options={{
            title: '',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2A2A2A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',

            },
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>

  );
};

export default App;