import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import axios from "axios";

const Profil = ({navigation, route}) => {
    let { Display_name, Icon_img, Public_description, Token} = route.params;
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Image source={require("../assets/title.png")}/>
            </View>
            <View style={styles.body}>
                <Image style={styles.photo} source={{uri: `${Icon_img}`}}/>
                <Text style={styles.username}>{Display_name}</Text>
                <Text style={styles.description}>{Public_description}</Text>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('LoginPage')}>
                <Text style={{color: "#fff", fontWeight: "bold",}}>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profil

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#2A2A2A",
        alignItems: "center",
        paddingTop: 100,
        // justifyContent: "center",
    },

    header: {
        marginTop: "-40%",
        alignItems: "center",
        width: "100%",
        height: 130,
        borderBottomWidth: 1,
        borderBottomColor: "white",
        marginBottom: 20,
    },

    body: {
        width: "100%",
        height: 200,
        alignItems: "center",
        marginBottom: 200,
    },

    photo: {
        width: 180,
        height: 180,
        borderRadius: 120,
        borderColor: "white",
        borderWidth: 1,
        marginBottom:10,
    },

    description: {
        fontSize: 15,
        color: "#fff",
        textAlign: "center",
    },

    username: {
        fontSize: 30,
        color: "#7F40BF",
    },

    loginBtn: {
        width: "60%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
        backgroundColor: "#7F40BF",
    },
});