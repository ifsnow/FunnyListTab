// @flow

import React from 'react';

import {
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

import { useCoverStyles } from '~/hooks';
import { COVER_TITLE_IMAGE_HEIGHT } from '~/constants';

import CoverTitleImage from './CoverTitleImage';

import type { CoverType } from '~/types';

type Props = {
  data: CoverType,
  scrollAnimation: Animated.Value,
};

const Cover = ({
  data,
  scrollAnimation,
}: Props) => {
  const coverStyles = useCoverStyles(scrollAnimation, {
    container: styles.container,
    containerOverlay: styles.containerOverlay,
    containerImage: styles.containerImage,
    coverTitle: styles.coverTitle,
    content: styles.content,
  });

  const {
    backgroundImage,
    titleImage,
    content,
  } = data;

  return (
    <Animated.View style={coverStyles.container}>
      <Animated.Image source={backgroundImage} style={coverStyles.containerImage} />
      <Animated.View style={coverStyles.containerOverlay} />
      <Animated.View style={coverStyles.coverTitle}>
        <CoverTitleImage image={titleImage} />
      </Animated.View>
      <Animated.View style={coverStyles.content}>
        <Text style={styles.contentText}>{content}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    overflow: 'hidden',
  },
  containerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
    zIndex: 2,
  },
  containerImage: {
    ...StyleSheet.absoluteFill,
  },
  coverTitle: {
    position: 'absolute',
    left: 16,
    bottom: COVER_TITLE_IMAGE_HEIGHT,
    zIndex: 3,
  },
  content: {
    position: 'absolute',
    left: 16,
    bottom: 20,
    zIndex: 1,
  },
  contentText: {
    color: '#fff',
    fontSize: 14,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 10,
  },
});

export default React.memo<Props>(Cover);
