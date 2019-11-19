// @flow

import {
  useMemo,
  useContext,
} from 'react';

import {
  Animated,
} from 'react-native';

import { ListContext } from '~/contexts';

const ANIMATION_PART_COUNT = 4;

export function useTabFocusStyles(partAnimations: Animated.Value[], baseStyle: Object) {
  const {
    itemCount,
    tabItemWidth,
  } = useContext(ListContext);

  const styles = useMemo(() => {
    const translateXInputRange = [];
    const translateYInputRange = [];
    const translateYOutputRange = [];
    const rotateInputRange = [];
    const rotateOutputRange = [];
    const scaleInputRange = [];
    const scaleOutputRange = [];

    const partWidth = Math.round(tabItemWidth / ANIMATION_PART_COUNT);

    for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
      translateXInputRange.push(itemIndex);
      translateYInputRange.push(itemIndex, itemIndex + 0.5);
      translateYOutputRange.push(0, 50);
      rotateInputRange.push(itemIndex, itemIndex + 0.5);
      rotateOutputRange.push('0deg', '90deg');
      scaleInputRange.push(itemIndex, itemIndex + 0.25);
      scaleOutputRange.push(1, 0.5);
    }

    const containerStyles = [];

    for (let partIndex = 0; partIndex < ANIMATION_PART_COUNT; partIndex++) {
      const translateXOutputRange = [];

      const fixPostionForAndroid = partIndex > 0 ? 1 : 0;
      for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
        const baseX = tabItemWidth * itemIndex;
        const translateX = baseX + (partWidth * partIndex) - fixPostionForAndroid;
        translateXOutputRange.push(translateX);
      }

      containerStyles.push(
        [
          baseStyle,
          {
            width: partWidth + fixPostionForAndroid,
            transform: [
              {
                translateX: partAnimations[partIndex].interpolate({
                  inputRange: translateXInputRange,
                  outputRange: translateXOutputRange,
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: partAnimations[partIndex].interpolate({
                  inputRange: translateYInputRange,
                  outputRange: translateYOutputRange,
                  extrapolate: 'clamp',
                }),
              },
              {
                rotate: partAnimations[partIndex].interpolate({
                  inputRange: rotateInputRange,
                  outputRange: rotateOutputRange,
                  extrapolate: 'clamp',
                }),
              },
              {
                scale: partAnimations[partIndex].interpolate({
                  inputRange: scaleInputRange,
                  outputRange: scaleOutputRange,
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ],
      );
    }

    return containerStyles;
  }, [baseStyle, itemCount, partAnimations, tabItemWidth]);

  return styles;
}
