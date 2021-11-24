import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    Linking
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

const Settings = ({ navigation, route }) => {
    let { Display_name, Name} = route.params;
    return (
        <View style={styles.page}>
            <Text style={styles.textTitle1}>ABOUT</Text>
            <TouchableOpacity style={styles.settingsButton} onPress={() => Linking.openURL('https://www.redditinc.com/policies/content-policy')}>
                <Image style={styles.icon} source={require("../assets/content.png")}/>
                <Text style={styles.textButton}>Content policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton} onPress={() => Linking.openURL('https://www.redditinc.com/policies/privacy-policy')}>
                <Image style={styles.icon} source={require("../assets/settings2.png")}/>
                <Text style={styles.textButton}>Privacy policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton} onPress={() => Linking.openURL('https://www.redditinc.com/policies/user-agreement')}>
                <Image style={styles.icon} source={require("../assets/profil2.png")}/>
                <Text style={styles.textButton}>User agreement</Text>
            </TouchableOpacity>
            <Text style={styles.textTitle2}>SUPPORT</Text>
            <TouchableOpacity style={styles.settingsButton} onPress={() => Linking.openURL('https://www.reddithelp.com/en/submit-request/mobile-help')}>
                <Image style={styles.icon} source={require("../assets/help.png")}/>
                <Text style={styles.textButton}>Help center</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton} onPress={() => Linking.openURL('https://www.reddit.com/r/redditmobile?utm_medium=android_app&utm_source=share')}>
                <Image style={styles.icon} source={require("../assets/fusée2.png")}/>
                <Text style={styles.textButton}>Visit r/redditmobile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton} onPress={() => Linking.openURL('https://reddithelp.com/hc/en-us')}>
                <Image style={styles.icon} source={require("../assets/message.png")}/>
                <Text style={styles.textButton}>Report an issue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Settings


const styles = StyleSheet.create({
    page: {
        backgroundColor: "#2A2A2A",
        flex: 1,
        alignItems: "center",
    },

    settingsButton: {
        width: "92%",
        height: 50,
        backgroundColor: "#303030",
        marginBottom: 2,
    },

    textButton: {
        marginLeft: 90,
        color: "#868686",
        fontSize: 15,
        top: -20,
    },

    icon: {
        width: 25,
        height: 25,
        marginBottom: 10,
        marginLeft: 30,
        top: 15,
    },

    iconArrow: {
        width: 25,
        height: 25,
        marginBottom: 10,
        marginLeft: 190,
    },

    textTitle1: {
        color: "#868686",
        fontSize: 13,
        left: -155,
        marginTop: 10,
    },

    textTitle2: {
        color: "#868686",
        fontSize: 13,
        left: -150,
        marginTop: 10,
    },
})