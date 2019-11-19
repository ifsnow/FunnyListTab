// @flow

import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import type { ListItemContentType } from '~/types';

type Props = {
  content: ListItemContentType,
};

const PopularContentItem = ({ content: { image, titleImage } }: Props) => (
  <View style={styles.container}>
    <Image source={image} style={styles.image} />
    <View style={styles.title}>
      <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: 'center',
    marginRight: 40,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    marginTop: -16,
    backgroundColor: '#111',
  },
  titleImage: {
    width: 100,
    height: 30,
  },
});

export default React.memo<Props>(PopularContentItem);
