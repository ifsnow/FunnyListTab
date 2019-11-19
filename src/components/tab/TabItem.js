// @flow

import React, {
  useMemo,
  useCallback,
  useContext,
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { ListContext } from '~/contexts';

type Props = {
  index: number,
  title: string,
};

const TabItem = ({
  index,
  title,
}: Props) => {
  const {
    tabActiveIndex,
    setTabActiveIndex,
    tabItemWidth,
    setScrollEnabled,
  } = useContext(ListContext);

  const containerStyle = useMemo(() => [styles.container, { width: tabItemWidth }], [tabItemWidth]);

  const titleStyle = useMemo(() => [
    styles.titleText,
    index === tabActiveIndex && styles.titleTextIsSelected,
  ], [tabActiveIndex, index]);

  const onPress = useCallback(() => {
    setScrollEnabled(false);
    setTabActiveIndex(index);
  }, [setScrollEnabled, setTabActiveIndex, index]);

  return (
    <TouchableOpacity style={containerStyle} activeOpacity={0.7} onPress={onPress}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#e5e5e5',
    fontSize: 16,
  },
  titleTextIsSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default React.memo<Props>(TabItem);
