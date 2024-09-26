import React from "react";
import { Text, View, ScrollView } from "react-native";
import formatText from "../../utils/formatText";
import styles from "./style";
export default function ArcilesDetailsScreen({ route }) {
  const { articles } = route.params;
  // console.log('title', articles.title);
  const content = formatText(articles.content);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{articles.title}</Text>
        <Text style={styles.description}>{articles.description}</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.content}>{formatText(articles.content)}</Text>
      </ScrollView>
    </View>
  );
}
