import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { APP_THEME } from "../Constants/Constants";

export default class NewsDetail extends Component {
  state = {
    connection_Status: false
  };

  render() {
    console.log("this.props.navigation", this.props.navigation);
    return (
      <SafeAreaView style={styles.mainView}>
        <WebView
          source={{ uri: this.props.navigation.state.params.url }}
          style={{ marginTop: 20 }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: APP_THEME.APP_BASE_COLOR
  }
});
