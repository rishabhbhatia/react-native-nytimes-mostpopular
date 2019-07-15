import React from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

const ArticleItem = (props) => {
  const { article = {}, onPress } = props;
  const { title = "", byline = "", published_date: publishedDate = "" } = article;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.itemIndicatorContainer}>
          <View style={styles.circle} />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.byline}>{byline}</Text>
          <View style={styles.dateContainer}>
            <Icon name="calendar" size={10} color="#969696" />
            <Text style={styles.publishedDate}>{publishedDate}</Text>
          </View>
        </View>
        <View style={styles.detailIndicatorContainer}>
          <Icon name="chevron-right" size={15} color="#c9c7c7" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ArticleItem;
