// @flow

import React, { useMemo } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import { useWindowDimensions } from '~/hooks';
import type { ListItemContentType } from '~/types';

type Props = {
  content: ListItemContentType,
};

const TrendingContentItem = ({ content: { image } }: Props) => {
  const { width } = useWindowDimensions();

  const containerStyle = useMemo(() => {
    const imageWidth = (width - 16) / 2;
    const imageHeight = imageWidth * 0.5;

    return {
      width: imageWidth,
      height: imageHeight,
      marginBottom: 16,
      paddingRight: 16,
    };
  }, [width]);

  return (
    <View style={containerStyle}>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo<Props>(TrendingContentItem);
