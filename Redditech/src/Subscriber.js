import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Button,
    TouchableOpacity,
    Linking,
    TextInput
} from "react-native";
import querystring from 'query-string';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const Subscriber = ({navigation, route}) => {
    const { DataSubscriber, DataComment, IconImg, Token} = route.params;

    const navigateProfileSub = async () => {
        axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(DataSubscriber.subreddit))}/about`, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        })
        .then((res) => res.data)
        .then((res) => {
            const data = res;
            axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(DataSubscriber.subreddit))}/hot`, {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            })
            .then((res) => res.data)
            .then((res) => {
                const dataHot = res;
                axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(DataSubscriber.subreddit))}/best`, {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                })
                .then((res) => res.data)
                .then((res) => {
                    const dataBest = res;
                    axios.get(`https://oauth.reddit.com/r/${JSON.parse(JSON.stringify(DataSubscriber.subreddit))}/new`, {
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
    var a = new Date(JSON.parse(JSON.stringify(DataSubscriber.created_utc)) * 1000);
    var b = new Date().getTime();
    var value = Math.floor(Math.abs(b - a) / 3600000);
    var c = new Date(DataComment.created) * 1000;
    var d = new Date().getTime();
    var valueComment = Math.floor(Math.abs(d - c) / 3600000);
    const [body, setBody] = useState("");


    const postComment = async () => {
        console.log(DataSubscriber.name);
        axios.post(`https://oauth.reddit.com/api/comment`,
        querystring.stringify({
            api_type: "json",
            thing_id: DataSubscriber.name,
            text: body
        }),
        {
            headers: {
                Authorization: `Bearer ${Token}`,
                "User-Agent": "user-agent-here"
            }
        })
    };



    const Item = ({ title, item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.nameComment}>{item.data.author} - {
                    Math.floor(valueComment >= 24) ?
                        valueComment / 24 < 1 && valueComment / 24 > 30 ?
                            valueComment / 24 <= 30 && valueComment / 24 > 365 ?
                                Math.floor(valueComment / (24 * 30 * 12)) + "y"
                            : Math.floor(valueComment / (24 * 30)) + "mo"
                        : Math.floor(valueComment / 24) + "d"
                        : valueComment + "h"
                    }
                </Text>
                <Text style={styles.description}>{item.data.body}</Text>
                <Text style={styles.subscribers}>{item.data.ups} likes</Text>
            </View>
        )
    };
    const renderItem = ({ item }) => (
        <Item title={item.title} item={item}/>
    );

    const ListHeader = () => {
        //View to set in Header
        return (
            <View style={styles.container2}>
                {IconImg == '' ? <Image style={styles.icon} source={require("../assets/profil_unknown.png")}/>: <Image style={styles.icon} source={{uri: `${IconImg}`}}/> }
                <TouchableOpacity onPress={navigateProfileSub}>
                    <Text style={styles.name}>{DataSubscriber.subreddit_name_prefixed}</Text>
                </TouchableOpacity>
                <Text style={styles.author}>Posted by u/{JSON.parse(JSON.stringify(DataSubscriber.author))} • {
                    Math.floor(value >= 24) ?
                        value / 24 < 1 && value / 24 > 30 ?
                            value / 24 <= 30 && value / 24 > 365 ?
                                Math.floor(value / (24 * 30 * 12)) + "y"
                            : Math.floor(value / (24 * 30)) + "mo"
                        : Math.floor(value / 24) + "d"
                    : value + "h"
                }
                </Text>
                <Text style={styles.title}>{JSON.parse(JSON.stringify(DataSubscriber.title))}</Text>
                <Text style={styles.description}>{JSON.parse(JSON.stringify(DataSubscriber.selftext)).substring(0, 150)} ...</Text>
                {JSON.parse(JSON.stringify(DataSubscriber.thumbnail)) != '' ?
                    JSON.parse(JSON.stringify(DataSubscriber.thumbnail)) != 'self' ?
                        JSON.parse(JSON.stringify(DataSubscriber.url)).indexOf("youtu") == -1 ?
                            JSON.parse(JSON.stringify(DataSubscriber.thumbnail)) != 'default' ?
                                <TouchableOpacity onPress={() => Linking.openURL(`${JSON.parse(JSON.stringify(DataSubscriber.url))}`)}>
                                    <Image style={styles.photo} source={{uri: `${JSON.parse(JSON.stringify(DataSubscriber.thumbnail))}`}}/>
                                </TouchableOpacity>
                                :
                                <Text style={{color: '#4fbcff'}}
                                onPress={() => Linking.openURL(`${JSON.parse(JSON.stringify(DataSubscriber.url))}`)}>
                                {JSON.parse(JSON.stringify(DataSubscriber.url)).slice(8)}
                                </Text>
                            :
                            <YoutubePlayer
                                height={200}
                                play={false}
                                videoId={`${JSON.parse(JSON.stringify(DataSubscriber.url.slice(JSON.parse(JSON.stringify(DataSubscriber.url)).length - 11)))}`}
                            />
                        : null
                    : null
                }
                <Text style={styles.subscribers}>{JSON.parse(JSON.stringify(DataSubscriber.ups))} likes</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setBody(text)}
                    value={body}
                    placeholder="Add a comment"
                    placeholderTextColor= "#fff"
                />
                <TouchableOpacity style={styles.postButton} onPress={postComment}>
                    <Text style={styles.textButton}>POST</Text>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={{marginTop: 1,}}>
                    <FlatList
                        data={DataComment}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={ListHeader}
                    />
                </View>
            </View>
        </View>
    )
}

export default Subscriber;

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
        borderBottomWidth: 10,
        padding: 15,
    },

    name: {
        fontSize: 17,
        color: "white",
        marginLeft: 70,
        marginTop: -40,

    },

    nameComment: {
        fontSize: 17,
        color: "white",
    },

    textButton: {
        fontSize: 15,
        color: "white",
        marginLeft: 45,
    },

    author: {
        fontSize: 14,
        color: "#868686",
        marginLeft: 70,
        marginTop: -2,
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
        color: "#868686",
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
        marginLeft: "75%",
        marginTop: 23,
    },

    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },

    postButton: {
        height: 40,
        margin: 12,
        width: 150,
        marginLeft: 100,
        padding: 10,
        backgroundColor: "#303030",
        borderRadius: 5,
      },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 2,
        borderColor: "#808080",
        borderRadius: 5,
      },
});