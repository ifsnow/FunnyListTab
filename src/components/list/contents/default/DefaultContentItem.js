// @flow

import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

import type { ListItemContentType } from '~/types';

type Props = {
  content: ListItemContentType,
};

const DefaultContentItem = ({ content: { image, title, message } }: Props) => (
  <View style={styles.container}>
    <Image source={image} style={styles.image} />
    <View style={styles.text}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.messageText} numberOfLines={3}>{message}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  image: {
    width: 163,
    height: 92,
  },
  text: {
    flex: 1,
    paddingHorizontal: 12,
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  messageText: {
    color: '#fff',
  },
});

export default React.memo<Props>(DefaultContentItem);
