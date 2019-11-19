// @flow
import {
  useMemo,
} from 'react';

import {
  Animated,
} from 'react-native';

import {
  useWindowDimensions,
} from './core';

import {
  SCROLL_THRESHOLD,
  HALF_OF_SCROLL_THRESHOLD,
  COVER_BASE_WIDTH,
  COVER_BASE_HEIGHT,
  COVER_TITLE_IMAGE_HEIGHT,
  CONVER_EXTRA_HEIGHT_FOR_IPHONEX,
  IS_OVER_IPHONEX,
} from '~/constants';

type CoverSizeType = {
  coverWidth: number,
  coverHeight: number,
  minimumCoverHeight: number,
};

export function useCoverSize(): CoverSizeType {
  const { width: coverWidth } = useWindowDimensions();

  const extra = useMemo(() => {
    const coverHeight = Math.floor((COVER_BASE_HEIGHT * coverWidth) / COVER_BASE_WIDTH);
    const minimumCoverHeight = Math.floor(coverHeight * 0.6) + CONVER_EXTRA_HEIGHT_FOR_IPHONEX;

    return {
      coverHeight,
      minimumCoverHeight,
    };
  }, [coverWidth]);

  return {
    coverWidth,
    ...extra,
  };
}

export function useCoverStyles(scrollAnimation: Animated.Value, baseStyles: Object) {
  const {
    coverWidth,
    coverHeight,
    minimumCoverHeight,
  } = useCoverSize();

  const {
    container: baseContainerStyle,
    containerOverlay: baseContainerOverlayStyle,
    containerImage: baseContainerImageStyle,
    coverTitle: baseCoverTitleStyle,
    content: baseContentStyle,
  } = baseStyles;

  const shrinkHeight = coverHeight - minimumCoverHeight;

  const styles = useMemo(() => {
    const container = [
      baseContainerStyle,
      {
        width: coverWidth,
        height: coverHeight,
        transform: [
          {
            translateY: scrollAnimation.interpolate({
              inputRange: [0, SCROLL_THRESHOLD],
              outputRange: [0, -1 * shrinkHeight],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    const containerOverlay = [
      baseContainerOverlayStyle,
      {
        opacity: scrollAnimation.interpolate({
          inputRange: [0, SCROLL_THRESHOLD],
          outputRange: [0, 0.45],
          extrapolate: 'clamp',
        }),
      },
    ];

    const containerImage = [
      baseContainerImageStyle,
      {
        width: coverWidth,
        height: coverHeight,
        transform: [
          {
            translateY: scrollAnimation.interpolate({
              inputRange: [0, SCROLL_THRESHOLD],
              outputRange: [0, shrinkHeight - (IS_OVER_IPHONEX ? 0 : 30)],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: scrollAnimation.interpolate({
              inputRange: [0, HALF_OF_SCROLL_THRESHOLD, SCROLL_THRESHOLD],
              outputRange: [1.0, 1.15, 1],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    const coverTitle = [
      baseCoverTitleStyle,
      {
        transform: [
          {
            translateY: scrollAnimation.interpolate({
              inputRange: [0, SCROLL_THRESHOLD],
              outputRange: [0, COVER_TITLE_IMAGE_HEIGHT - (minimumCoverHeight / 4)],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: scrollAnimation.interpolate({
              inputRange: [0, HALF_OF_SCROLL_THRESHOLD, SCROLL_THRESHOLD],
              outputRange: [1, 1.1, 0.85],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    const content = [
      baseContentStyle,
      {
        opacity: scrollAnimation.interpolate({
          inputRange: [0, HALF_OF_SCROLL_THRESHOLD],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ];

    return {
      container,
      containerOverlay,
      containerImage,
      coverTitle,
      content,
    };
  }, [baseContainerImageStyle, baseContainerOverlayStyle, baseContainerStyle, baseContentStyle, baseCoverTitleStyle, coverHeight, coverWidth, minimumCoverHeight, scrollAnimation, shrinkHeight]);

  return styles;
}
