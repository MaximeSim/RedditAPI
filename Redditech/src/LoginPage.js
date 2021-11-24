import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
} from "react-native";
import { authorize } from 'react-native-app-auth';
import AsyncStorage from "@react-native-community/async-storage";


const config = {
    redirectUrl: 'com.myapp://oauth2redirect/reddit',
    clientId: 'E5IlS_CLGtaZVlxOm3Vyig',
    clientSecret: '',
    scopes: ['identity', 'edit', 'flair', 'history', 'modconfig', 'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
      tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
    customHeaders: {
      token: {
        Authorization: 'Basic RTVJbFNfQ0xHdGFaVmx4T20zVnlpZw==',
      },
    },
  };

const LoginPage = ({navigation}) => {

    const login = async () => {
        try {
          const authState = await authorize(config);
          let token = JSON.stringify(authState.accessToken);
          await AsyncStorage.setItem("access_token", token);
          navigation.navigate('MenuPage')
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <View style={styles.container}>
            <Image style={styles.Logo} source={require("../assets/Logo.png")}/>
            <TouchableOpacity style={styles.loginBtn} onPress={login} >
                <Text>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7F40BF",
        alignItems: "center",
        // justifyContent: "center",
    },

    Logo: {
        top: "20%",
        marginBottom: 70,
        width: 250,
        height: 250,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
        backgroundColor: "#FFFFFF",
    },
});