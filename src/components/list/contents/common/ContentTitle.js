// @flow

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

type Props = {
  text: string,
};

const ContentTitle = ({ text }: Props) => (
  <View style={styles.title}>
    <Text style={styles.titleText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e5e5e5',
  },
});

export default React.memo<Props>(ContentTitle);
