import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    Linking,
    TextInput,
    FlatList
} from "react-native";
import axios from "axios";
import querystring from 'query-string';
import AsyncStorage from "@react-native-community/async-storage";
import { SearchBar } from 'react-native-elements';

const Search = ({ navigation, route }) => {
    const {Token} = route.params;
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        axios.get(`https://oauth.reddit.com/subreddits/mine/subscriber`, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        })
        .then((res) => res.data)
        .then((res) => {
            if (res.error) {
                throw res.error;
            }
            const data = res;
            setFilteredDataSource(data.data.children);
            setMasterDataSource(data.data.children);
        })
    }, []);

    const Item = ({ title, item }) => {
        const navigateProfileSub = async () => {
            axios.get(`https://oauth.reddit.com${JSON.parse(JSON.stringify(item.data.url))}about`, {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            })
            .then((res) => res.data)
            .then((res) => {
                const data = res;
                axios.get(`https://oauth.reddit.com${JSON.parse(JSON.stringify(item.data.url))}hot`, {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                })
                .then((res) => res.data)
                .then((res) => {
                    const dataHot = res;
                    axios.get(`https://oauth.reddit.com${JSON.parse(JSON.stringify(item.data.url))}best`, {
                        headers: {
                            Authorization: `Bearer ${Token}`,
                        },
                    })
                    .then((res) => res.data)
                    .then((res) => {
                        const dataBest = res;
                        axios.get(`https://oauth.reddit.com${JSON.parse(JSON.stringify(item.data.url))}new`, {
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

        return (
            <View style={styles.item}>
              <TouchableOpacity onPress={navigateProfileSub}>
                <Text style={styles.subscribers}>{item.data.display_name_prefixed}</Text>
              </TouchableOpacity>
            </View>
        )
    };

    const renderItem = ({ item }) => (
        <Item title={item.title} item={item} />
    );

    const ItemSeparatorView = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: 'black',
              height: 2,
              justifyContent: "center",
              alignContent: "center",
            }}
          />
        );
    };

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.data.display_name_prefixed
              ? item.data.display_name_prefixed.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
    };

    return (
        <View style={styles.page}>
            <SearchBar
                searchIcon={{ size: 24 }}
                onChangeText={(text) => searchFilterFunction(text)}
                inputStyle={{ backgroundColor: '#303030' }}
                containerStyle={{ backgroundColor: '#303030', borderWidth: 1,}}
                inputContainerStyle={{ backgroundColor: '#303030' }}
                placeholderTextColor={'#fff'}
                placeholder={'Search a subbreddit...'}
                clearIcon={false}
                searchIcon={false}
                value={search}
            />
            <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={renderItem}
            />
        </View>
    );
};

export default Search


const styles = StyleSheet.create({
    page: {
        backgroundColor: "#2A2A2A",
        flex: 1,
    },

    item: {
        justifyContent: "center",
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    subscribers: {
        fontSize: 15,
        color: "#808080",
        marginTop: 10,
        marginLeft: 22,
        marginBottom: 10,
    },
})