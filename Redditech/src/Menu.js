import React from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const Menu = ({navigation}) => {

    // ------------------------ GetDataSearch ------------------------
    const GetDataSearch = async () => {
        const acess_token = await AsyncStorage.getItem("access_token");
        const token = JSON.parse(acess_token);
        navigation.navigate('Search', {Token: token});
    }

    // ------------------------ GetProfilDataSettings ------------------------
    const GetProfilDataSettings = async () => {
        const acess_token = await AsyncStorage.getItem("access_token");
        const token = JSON.parse(acess_token);
        axios.get(`https://oauth.reddit.com/api/v1/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data)
        .then((res) => {
            if (res.error) {
                throw res.error;
            }
            const data = res;
            const display_name = JSON.parse(JSON.stringify(data.subreddit.display_name));
            const name = JSON.parse(JSON.stringify(data.subreddit.name));
            navigation.navigate('SettingsPage', { Display_name: display_name, Name: name});
        })
        .catch((error) => {
            console.log("error : " + JSON.stringify(error));
        });
    }

    // ------------------------ GetProfilData ------------------------
    const GetProfilData = async () => {
        const acess_token = await AsyncStorage.getItem("access_token");
        const token = JSON.parse(acess_token);
        axios.get(`https://oauth.reddit.com/api/v1/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data)
        .then((res) => {
            if (res.error) {
                throw res.error;
            }
            const data = res;
            const display_name = JSON.parse(JSON.stringify(data.subreddit.display_name));
            const icon_img = JSON.parse(JSON.stringify(data.snoovatar_img));
            const public_description = JSON.parse(JSON.stringify(data.subreddit.public_description));
            navigation.navigate('ProfilPage', { Display_name: display_name, Icon_img: icon_img, Public_description: public_description, Token: token});
        })
        .catch((error) => {
            console.log("error : " + JSON.stringify(error));
        });
    }

    // ------------------------ GetSubscribe ------------------------
    const GetSubscribe = async () => {
        const acess_token = await AsyncStorage.getItem("access_token");
        const token = JSON.parse(acess_token);
        axios
        .get(`https://oauth.reddit.com/hot/`, { // -------- Get for Hot --------
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data)
        .then((res) => {
            const dataHot = res;
            axios.get(`https://oauth.reddit.com/new/`, { // -------- Get for New --------
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
            .then((res) => {
                const dataNew = res;
                axios.get(`https://oauth.reddit.com/best/`, { // -------- Get for Best --------
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.data)
                .then((res) => {
                    const dataBest = res;
                    // -------- Send data --------
                    navigation.navigate('SubRedditPage', { DataHot: dataHot.data, DataNew: dataNew.data, DataBest: dataBest.data, Token: token});
                })
            })
          })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../assets/title.png")}/>
            </View>
            <TouchableOpacity style={styles.menuSubreddit} onPress={GetSubscribe}>
                <Image style={styles.icon} source={require("../assets/fusée.png")}/>
                <Text style={styles.loginText}>SUBREDDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuProfil} onPress={GetProfilData}>
                <Image style={styles.icon} source={require("../assets/Profil.png")}/>
                <Text style={styles.loginText}>PROFIL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuSettings} onPress={GetProfilDataSettings}>
                <Image style={styles.icon} source={require("../assets/settings.png")}/>
                <Text style={styles.loginText}>SETTINGS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuLogout} onPress={() => navigation.navigate('LoginPage')}>
                <Image style={styles.icon} source={require("../assets/logout.png")}/>
                <Text style={styles.loginText}>LOGOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuSubreddit} onPress={GetDataSearch}>
                <Image style={styles.icon} source={require("../assets/search.png")}/>
                <Text style={styles.loginText}>SEARCH</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2A2A2A",
        alignItems: "center",
        paddingTop: 100,
    },

    header: {
        marginTop: "-40%",
        alignItems: "center",
        width: "100%",
        height: 130,
        borderBottomWidth: 1,
        borderBottomColor: "white",
        marginBottom: 40,
    },

    menuSubreddit: {
        width: "90%",
        borderRadius: 15,
        height: 110,
        marginBottom: 20,
        paddingLeft: 10,
        paddingTop: 10,
        backgroundColor: "#7F40BF",
    },

    menuProfil: {
        width: "45%",
        borderRadius: 15,
        height: 110,
        marginBottom: 20,
        marginLeft: -175,
        paddingLeft: 10,
        paddingTop: 10,
        backgroundColor: "#7F40BF",
    },

    menuSettings: {
        width: "40%",
        borderRadius: 15,
        height: 300,
        marginBottom: 20,
        marginTop: -130,
        marginLeft: 200,
        paddingLeft: 10,
        paddingTop: 10,
        backgroundColor: "#7F40BF",
    },

    menuLogout: {
        width: "45%",
        borderRadius: 15,
        height: 170,
        marginBottom: 20,
        marginTop: -190,
        marginLeft: -175,
        paddingLeft: 10,
        paddingTop: 10,
        backgroundColor: "#7F40BF",
    },

    fondButtonMenu: {
        width: "100%",
        height: 100,
        borderRadius: 15,
    },

    icon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },

    loginText: {
        color: "black",
        fontSize: 20,
    }
});