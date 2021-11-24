import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Linking
} from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

let sub = 2;

const Subreddit = ({ navigation, route}) => {
    const { DataHot, DataNew, DataBest, Token } = route.params;
    const Item = ({ title, item }) => {
        const navigateSubscriber = async () => {
            const acess_token = await AsyncStorage.getItem("access_token");
            const token = JSON.parse(acess_token);
            axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(item.data.subreddit))}/about`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
            .then((res) => {
                const data = res;
                // console.log(data.data.icon_img);
                axios.get(`https://oauth.reddit.com/${JSON.parse(JSON.stringify(item.data.permalink))}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.data)
                .then((res) => {
                    navigation.navigate('Subscriber', {DataSubscriber: res[0].data.children[0].data, DataComment: res[1].data.children == '' ? null : res[1].data.children, IconImg: data.data.icon_img, Token: token});
                })
            })
        };

        const navigateProfileSub = async () => {
            axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(item.data.subreddit))}/about`, {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            })
            .then((res) => res.data)
            .then((res) => {
                const data = res;
                axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(item.data.subreddit))}/hot`, {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                })
                .then((res) => res.data)
                .then((res) => {
                    const dataHot = res;
                    axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(item.data.subreddit))}/best`, {
                        headers: {
                            Authorization: `Bearer ${Token}`,
                        },
                    })
                    .then((res) => res.data)
                    .then((res) => {
                        const dataBest = res;
                        axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(item.data.subreddit))}/new`, {
                        headers: {
                            Authorization: `Bearer ${Token}`,
                        },
                        })
                        .then((res) => res.data)
                        .then((res) => {
                            navigation.navigate('ProfileSub', {DataHot: dataHot.data, DataBest: dataBest.data, DataNew: res.data, DataAbout: data.data});
                        })
                    })
                })
            })
        };

        var a = new Date(JSON.parse(JSON.stringify(item.data.created_utc)) * 1000);
        var b = new Date().getTime();
        var value = Math.floor(Math.abs(b - a) / 3600000);

        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={navigateProfileSub}>
                    <Text style={styles.name}>{JSON.parse(JSON.stringify(item.data.subreddit_name_prefixed))}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateSubscriber}>
                    <Text style={styles.author}>Posted by u/{JSON.parse(JSON.stringify(item.data.author))} • {
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

                    {JSON.parse(JSON.stringify(item.data.thumbnail)) != 'self' ?
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
                        : null}
                        <Text style={styles.subscribers}>{JSON.parse(JSON.stringify(item.data.ups))} likes</Text>
                </TouchableOpacity>
            </View>
        )
    };

    const [count, setCount] = useState(0);
    let Data_array_Hot = DataHot.children; // all data for subscribe Hot
    let Data_array_New = DataNew.children; // all data for subscribe New
    let Data_array_Best = DataBest.children; // all data for subscribe Best

    const renderItem = ({ item }) => (
        <Item title={item.title} item={item} />
    );

    const PressNew = () => {
        setCount(count + 1)
        sub = 1;
    };

    const PressHot = () => {
        setCount(count + 1)
        sub = 0;
    };

    const PressBest = () => {
        setCount(count + 1)
        sub = 2;
    };

    return (
        <View style={styles.page}>
            <TouchableOpacity style={styles.buttonContainer1} onPress={PressBest}>
                {sub == 2 ? <Text style={styles.textButtonPress}>Best</Text> : <Text style={styles.textButton}>Best</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer2} onPress={PressHot}>
                {sub == 0 ? <Text style={styles.textButtonPress}>Hot</Text> : <Text style={styles.textButton}>Hot</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer3} onPress={PressNew}>
                {sub == 1 ? <Text style={styles.textButtonPress}>New</Text> : <Text style={styles.textButton}>New</Text>}
            </TouchableOpacity>
            <View style={{marginTop: 1,}}>
                <FlatList
                    data={sub == 1 ? Data_array_New : sub == 2 ? Data_array_Best : Data_array_Hot}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

export default Subreddit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: "#2A2A2A",
        width: "100%",
    },
    item: {
        backgroundColor: '#2A2A2A',
        width: "100%",
        marginLeft: 0,
        borderColor: "black",
        borderBottomWidth: 20,
        padding: 15,
    },
    title: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
    },
    name: {
        fontSize: 17,
        color: "white",
        marginLeft: 35,

    },
    author: {
        fontSize: 14,
        color: "#868686",
        marginLeft: 35,

    },

    photo: {
        flex: 1,
        aspectRatio: 1.5,
        resizeMode: 'contain',
        marginBottom: 10,
    },

    subscribers: {
        fontSize: 15,
        color: "#fff",
        marginLeft: "80%",
        marginTop: 23,
        marginBottom: -10,
    },
    description: {
        fontSize: 14,
        color: "#868686",
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
        color: "#fff",
    },

    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },

    textButtonPress: {
        color: "#7F40BF",
        borderBottomColor: 'grey',
        borderBottomWidth: 2
    },
});
