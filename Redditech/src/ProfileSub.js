import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Button,
    TouchableOpacity,
    Linking
} from "react-native";

import querystring from 'query-string';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

let sub = 0;

const ProfileSub = ({navigation, route}) => {
    const Item = ({ title, item }) => {
        var a = new Date(JSON.parse(JSON.stringify(item.data.created_utc)) * 1000);
        var b = new Date().getTime();
        var value = Math.floor(Math.abs(b - a) / 3600000);
        return (
            <View style={styles.item}>
                <Text style={styles.author}>u/{JSON.parse(JSON.stringify(item.data.author))} • {
                    Math.floor(value >= 24) ?
                        value / 24 < 1 && value / 24 > 30 ?
                            value / 24 <= 30 && value / 24 > 365 ?
                                Math.floor(value / (24 * 30 * 12)) + "y"
                            : Math.floor(value / (24 * 30)) + "mo"
                        : Math.floor(value / 24) + "d"
                    : value + "h"
                }
                </Text>
                <Text style={styles.title}>{JSON.parse(JSON.stringify(item.data.title))}</Text>
                <Text style={styles.description}>{JSON.parse(JSON.stringify(item.data.selftext)).substring(0, 150)} ...</Text>
                {JSON.parse(JSON.stringify(item.data.thumbnail)) != '' ?
                    JSON.parse(JSON.stringify(item.data.thumbnail)) != 'self' ?
                        JSON.parse(JSON.stringify(item.data.url)).indexOf("youtu") == -1 ?
                            JSON.parse(JSON.stringify(item.data.thumbnail)) != 'default' ?
                                <TouchableOpacity onPress={() => Linking.openURL(`${JSON.parse(JSON.stringify(item.data.url))}`)}>
                                    <Image style={styles.photo} source={{uri: `${JSON.parse(JSON.stringify(item.data.thumbnail))}`}}/>
                                </TouchableOpacity>
                                :
                                <Text style={{color: '#4fbcff'}}
                                onPress={() => Linking.openURL(`${JSON.parse(JSON.stringify(item.data.url))}`)}>
                                {JSON.parse(JSON.stringify(item.data.url)).slice(8)}
                                </Text>
                            :
                            <YoutubePlayer
                                height={200}
                                play={false}
                                videoId={`${JSON.parse(JSON.stringify(item.data.url.slice(JSON.parse(JSON.stringify(item.data.url)).length - 11)))}`}
                            />
                        : null
                    : null
                }
                <Text style={styles.subscribers}>{JSON.parse(JSON.stringify(item.data.ups))} likes</Text>
            </View>
        )
    };

    const { DataHot, DataBest, DataNew, DataAbout } = route.params;
    let Data_array_Hot = DataHot.children; // all data for subscribe Hot
    let Data_array_New = DataNew.children;
    let Data_array_Best = DataBest.children;
    const renderItem = ({ item }) => (
        <Item title={item.title} item={item} />
    );
    const [count, setCount] = useState(0);
    const PressNew = () => {
        if (count == 0) {
            if (DataAbout.user_is_subscriber == true) {
                setCount(4);
            } else {
                setCount(7);
            }
        } if ((count == 3) || (count == 4) || (count == 5) || (count == 6)) {
            setCount(4);
        } else if ((count == 2) || (count == 7) || (count == 8) || (count == 9)) {
            setCount(7);
        }
        sub = 1;
    };

    const PressHot = () => {
        if ((count == 3) || (count == 4) || (count == 5) || (count == 6)) {
            setCount(5);
        } else if ((count == 2) || (count == 7) || (count == 8) || (count == 9)) {
            setCount(8);
        }
        sub = 0;
    };

    const PressBest = () => {
        if (count == 0) {
            if (DataAbout.user_is_subscriber == true) {
                setCount(6);
            } else {
                setCount(9);
            }
        }
        if ((count == 3) || (count == 4) || (count == 5) || (count == 6)) {
            setCount(6);
        } else if ((count == 2) || (count == 7) || (count == 8) || (count == 9)) {
            setCount(9);
        }
        sub = 2;
    };

    const PressUnSub = async () => {
        const acess_token = await AsyncStorage.getItem("access_token");
        const token = JSON.parse(acess_token);
        setCount(2)
        axios.post(`https://oauth.reddit.com/api/subscribe`,
        querystring.stringify({
            api_type: "json",
            action: "unsub",
            sr: DataAbout.name,
        }),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "User-Agent": "user-agent-here"
            },
        })
    };

    const PressSub = async () => {
        const acess_token = await AsyncStorage.getItem("access_token");
        const token = JSON.parse(acess_token);
        setCount(3)
        axios.post(`https://oauth.reddit.com/api/subscribe`,
        querystring.stringify({
            api_type: "json",
            action: "sub",
            skip_initial_defaults: true,
            sr: DataAbout.name,
        }),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "User-Agent": "user-agent-here"
            },
        })
    };

    const ListHeader = () => {
        //View to set in Header
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.buttonSub} onPress={(count == 0) ? DataAbout.user_is_subscriber == true ? PressUnSub : PressSub : (count == 2) || (count == 7) || (count == 8) || (count == 9) ? PressSub : PressUnSub}>
                        {(count == 0) ?
                            DataAbout.user_is_subscriber == true ?
                                <Text style={styles.textButton}>Leave</Text>
                            : <Text style={styles.textButton}>+ Join</Text>
                        : (count == 2) || (count == 7) || (count == 8) || (count == 9) ?
                            <Text style={styles.textButton}>+ Join</Text>
                            : <Text style={styles.textButton}>Leave</Text>
                        }
                    </TouchableOpacity>
                    {DataAbout.icon_img == '' ? <Image style={styles.icon} source={require("../assets/profil_unknown.png")}/>: <Image style={styles.icon} source={{uri: `${DataAbout.icon_img}`}}/> }
                    <Text style={styles.title_name}>{DataAbout.display_name_prefixed}</Text>
                    <Text style={styles.author}>{DataAbout.subscribers} members • {DataAbout.accounts_active} online</Text>
                    <Text style={styles.description}>{DataAbout.public_description}</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer1} onPress={PressHot}>
                    {sub == 0 ? <Text style={styles.textButtonPress}>Hot</Text> : <Text style={styles.textButton}>Hot</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer2} onPress={PressBest}>
                    {sub == 2 ? <Text style={styles.textButtonPress}>Best</Text> : <Text style={styles.textButton}>Best</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer3} onPress={PressNew}>
                    {sub == 1 ? <Text style={styles.textButtonPress}>New</Text> : <Text style={styles.textButton}>New</Text>}
                </TouchableOpacity>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <View style={{marginTop: 1,}}>
                <FlatList
                    data={sub == 1 ? Data_array_New : sub == 2 ? Data_array_Best : Data_array_Hot}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={ListHeader}
                    />
            </View>
        </View>
    )
}

export default ProfileSub;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: 10,
    },

    container2: {
        padding: 10,
        backgroundColor: "#303030",
    },

    item: {
        backgroundColor: '#2A2A2A',
        width: "100%",
        marginLeft: 0,
        borderColor: "black",
        borderBottomWidth: 20,
        padding: 15,
    },

    title_name: {
        fontSize: 17,
        color: "white",
        marginTop: 10,
    },

    name: {
        fontSize: 17,
        color: "white",
        marginLeft: 70,
        marginTop: -40,

    },
    author: {
        fontSize: 15,
        color: "#868686",
        // marginLeft: 10,
        marginTop: 4,
    },

    title: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20,
    },

    description: {
        fontSize: 14,
        color: "white",
        marginTop: 4,
    },

    photo: {
        aspectRatio: 1.5,
        resizeMode: 'contain',
        width: 100,
        height: 200,
        marginTop: 23,
    },

    subscribers: {
        fontSize: 15,
        color: "#fff",
        marginLeft: "80%",
        marginTop: 23,
    },

    icon: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderColor: "#868686",
        borderWidth: 3,
    },

    buttonSub: {
        width: "32%",
        height: 40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#808080",
        marginLeft: "60%",
        borderRadius: 5,
    },

    buttonContainer1: {
        width: "35%",
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#2A2A2A",
    },

    buttonContainer2: {
        width: "35%",
        height: 50,
        marginLeft: 135,
        marginTop: -50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#2A2A2A",
    },

    buttonContainer3: {
        width: "35%",
        height: 50,
        marginLeft: 272,
        marginTop: -50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#2A2A2A",
    },

    textButton: {
        color: "white",
        fontSize: 14,
    },

    textButtonPress: {
        color: "#7F40BF",
        borderBottomColor: 'grey',
        borderBottomWidth: 2
    },
});