// @flow

import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  List,
  Tab,
} from '~/components';

import { ListProvider } from '~/contexts';

import {
  type ListItemType,
  type CoverType,
} from '~/types';

type Props = {
  cover: CoverType,
  items: ListItemType[],
};

const HomeScreen = ({
  items,
  cover,
}: Props) => (
  <View style={styles.container}>
    <ListProvider items={items} cover={cover}>
      <List />
      <Tab />
    </ListProvider>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
  },
});

export default React.memo<Props>(HomeScreen);
