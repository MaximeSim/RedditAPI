import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    Linking,
    TextInput
} from "react-native";
import axios from "axios";
import querystring from 'query-string';
import AsyncStorage from "@react-native-community/async-storage";

const AccountSettings = ({ navigation, route }) => {
    const {name} = route.params;
    const [body, setBody] = useState("");


    const postComment = async () => {
        const acess_token = await AsyncStorage.getItem("access_token");
        const token = JSON.parse(acess_token);
        axios.post(`https://oauth.reddit.com/api/site_admin`,
        querystring.stringify({
            api_type: "json",
            thing_id: "RedditechTech3",
            public_description: body
        }),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "User-Agent": "user-agent-here"
            }
        })
    };

    return (
        <View style={styles.page}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setBody(text)}
                value={body}
                placeholder="Add a comment"
            />
            <TouchableOpacity onPress={postComment}>
                <Text>Post</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AccountSettings


const styles = StyleSheet.create({
    page: {
        backgroundColor: "#2A2A2A",
        flex: 1,
        alignItems: "center",
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})