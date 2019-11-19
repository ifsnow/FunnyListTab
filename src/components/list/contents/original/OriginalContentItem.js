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

const OriginalContentItem = ({ content: { image } }: Props) => (
  <View style={styles.container}>
    <Image source={image} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 171,
    height: 324,
  },
});

export default React.memo<Props>(OriginalContentItem);
