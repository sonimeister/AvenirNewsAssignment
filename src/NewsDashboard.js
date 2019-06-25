import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import {
  APP_THEME,
  APP_ROUTE,
  WEBSERICE_URL,
  WEBSERVICE_METHODS,
  API_KEY
} from "../Constants/Constants";
import NewsHeadlineCell from "../src/NewsHeadlineCell";

export default class NewsDashboard extends Component {
  state = {
    loading: false,
    newsArray: [],
    connection_Status: false
  };

  async componentDidMount() {
    NetInfo.fetch().then(state => {
      this.setState({ connection_Status: state.isConnected }, () =>
        this.fetchNews()
      );
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ connection_Status: state.isConnected });
    });
  }

  componentWillUnmount() {
    unsubscribe();
  }

  _keyExtractor = (item, index) => `${index}`;

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  pushToNewsDetailScreen = url => {
    this.props.navigation.navigate(APP_ROUTE.NEWS_DETAIL, { url });
  };

  fetchNews = async () => {
    const { connection_Status } = this.state;
    if (connection_Status) {
      this.showLoading();
      const URL = WEBSERICE_URL + WEBSERVICE_METHODS.SEVEN_DAYS + API_KEY;
      try {
        let response = await fetch(URL);
        let responseJson = await response.json();
        console.log("responseJson", responseJson);
        this.setState({ newsArray: responseJson.results }, () =>
          this.hideLoading()
        );
      } catch (error) {
        this.hideLoading();
        console.error(error);
      }
    } else {
      Alert.alert(
        "Error",
        "No active internet connection found. Please connect to internet.",
        [
          {
            text: "OK"
          }
        ]
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.mainView}>
        <View style={styles.mainView}>
          <FlatList
            data={this.state.newsArray}
            style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <NewsHeadlineCell
                item={item}
                pushToNewsDetailScreen={this.pushToNewsDetailScreen}
              />
            )}
          />
        </View>
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: APP_THEME.APP_BASE_COLOR
  },
  loading: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
});
