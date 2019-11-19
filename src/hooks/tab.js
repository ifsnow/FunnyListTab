// @flow
import React, {
  useMemo,
  useContext,
} from 'react';

import {
  Animated,
} from 'react-native';

import { useWindowDimensions } from './core';
import { useCoverSize } from './cover';
import { ListContext } from '~/contexts';
import { SCROLL_THRESHOLD } from '~/constants';

import TabItem from '~/components/tab/TabItem';

export function useTabStyles(moveAnimation:Animated.Value, baseStyles: Object) {
  const {
    container: baseContainerStyle,
    scroll: baseScrollStyle,
  } = baseStyles;

  const { minimumCoverHeight } = useCoverSize();
  const {
    scrollAnimation,
    tabItemWidth,
    tabItemTotalWidth,
  } = useContext(ListContext);

  const styles = useMemo(() => {
    const container = [
      baseContainerStyle,
      {
        top: minimumCoverHeight,
        opacity: scrollAnimation.interpolate({
          inputRange: [SCROLL_THRESHOLD - 0.1, SCROLL_THRESHOLD],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      },
    ];

    const scroll = [
      baseScrollStyle,
      {
        width: tabItemTotalWidth,
        transform: [
          {
            translateX: moveAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -1 * (tabItemWidth * 1.5)],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    ];

    return {
      container,
      scroll,
    };
  }, [baseContainerStyle, baseScrollStyle, minimumCoverHeight, moveAnimation, scrollAnimation, tabItemTotalWidth, tabItemWidth]);

  return styles;
}

export function useTabItemWidth() {
  const { width } = useWindowDimensions();
  const itemWidth = useMemo(() => Math.round(width / 3.5), [width]);
  return itemWidth;
}

export function useTabItems() {
  const {
    items,
  } = useContext(ListContext);

  const tabItems = useMemo(() => items.map<any>(({ tabTitle }, index) => (
    <TabItem
      key={`item-${index}`}
      index={index}
      title={tabTitle}
    />
  )), [items]);

  return tabItems;
}
