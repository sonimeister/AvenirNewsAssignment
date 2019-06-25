import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { APP_FONTS, APP_THEME } from "../Constants/Constants";
import { isEmpty } from "loadsh";

export default class NewsHeadlineCell extends Component {
  render() {
    const { title, published_date, byline, media, url } = this.props.item;
    let mediaURL = "";
    if (!isEmpty(media)) {
      const mediaImagesArray = media[0]["media-metadata"];
      if (!isEmpty(mediaImagesArray)) {
        mediaURL = mediaImagesArray[0].url;
      }
    }

    return (
      <TouchableOpacity onPress={() => this.props.pushToNewsDetailScreen(url)}>
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 30 }}
              source={{
                uri: mediaURL
              }}
            />
          </View>
          <View style={styles.subContainer}>
            <View style={styles.container}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.lightText}>{byline}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{published_date}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    flex: 1,
    borderBottomColor: APP_THEME.APP_TITLE_COLOR,
    borderBottomWidth: 1
  },
  subContainer: {
    flex: 5,
    marginBottom: 10,
    marginLeft: 4
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2
  },
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  dateContainer: {
    flexDirection: "row",
    marginTop: 3,
    marginBottom: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  titleText: {
    fontSize: 16,
    fontFamily: APP_FONTS.FONT_SEMIBOLD,
    color: APP_THEME.APP_TITLE_COLOR
  },
  lightText: {
    fontSize: 12,
    fontFamily: APP_FONTS.FONT_LIGHT,
    color: APP_THEME.APP_DESCRIPTION_COLOR
  },
  dateText: {
    fontSize: 10,
    fontFamily: APP_FONTS.FONT_EXTRALIGHT,
    color: APP_THEME.APP_SUBTITLE_COLOR
  }
});
