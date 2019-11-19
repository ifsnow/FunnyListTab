// @flow

import React, {
  useCallback,
  useMemo,
  useContext,
  useRef,
} from 'react';

import {
  StyleSheet,
  Animated,
} from 'react-native';

import type { ScrollEvent } from 'react-native/Libraries/Types/CoreEventTypes';

import { ListContext } from '~/contexts';
import {
  TAB_HEIGHT,
  CONVER_EXTRA_HEIGHT_FOR_IPHONEX,
} from '~/constants';

import {
  LIST_ITEM_KIND,
  type ListScrollPositionsType,
} from '~/types';

import Cover from './cover/Cover';
import {
  DefaultContent,
  PreviewContent,
  TrendingContent,
  OriginalContent,
} from './contents';

type Props = {
  listRef: any,
  onChangeScrollPositions: (positions: ListScrollPositionsType[]) => void,
  onScrollListener: (event: ScrollEvent) => void,
};

const ListItemComponents = {
  [LIST_ITEM_KIND.DEFAULT]: DefaultContent,
  [LIST_ITEM_KIND.TRENDING]: TrendingContent,
  [LIST_ITEM_KIND.PREVIEW]: PreviewContent,
  [LIST_ITEM_KIND.ORIGINAL]: OriginalContent,
};

const ListRenderer = ({
  listRef,
  onChangeScrollPositions,
  onScrollListener,
}: Props) => {
  const {
    items,
    itemCount,
    cover,
    scrollAnimation,
  } = useContext(ListContext);

  const keyExtractor = useCallback((item, index) => `list-${item.kind}-${index}`, []);
  const listHeaderComponent = useMemo(() => <Cover data={cover} scrollAnimation={scrollAnimation} />, [cover, scrollAnimation]);
  const stickyHeaderIndices = useMemo(() => [0], []);

  const contentHeights = useRef([]).current;

  const onLayoutContent = useCallback((index: number, height: number) => {
    contentHeights[index] = height;

    const visibleContentHeights = contentHeights.filter((contentHeight) => contentHeight > 0);
    if (visibleContentHeights.length === itemCount) {
      const contentScrollPositions = [];
      visibleContentHeights.forEach((contentHeight, contentIndex) => {
        let start = contentScrollPositions[contentIndex - 1]?.end ?? 0;
        if (contentIndex === 0) start += TAB_HEIGHT - CONVER_EXTRA_HEIGHT_FOR_IPHONEX - 10;
        const end = start + contentHeight;
        contentScrollPositions.push({
          start,
          end,
        });
      });

      onChangeScrollPositions(contentScrollPositions);
    }
  }, [contentHeights, itemCount, onChangeScrollPositions]);

  const onScroll = useMemo(() => Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollAnimation } } }],
    {
      useNativeDriver: true,
      listener: onScrollListener,
    },
  ), [onScrollListener, scrollAnimation]);

  const renderItem = useCallback(({
    item,
    index,
  }) => {
    const {
      kind,
      title,
      contents,
    } = item;

    const ListItemComponent = ListItemComponents[kind];

    if (ListItemComponent) {
      return (
        <ListItemComponent
          index={index}
          title={title}
          contents={contents}
          onLayout={onLayoutContent}
        />
      );
    }

    return null;
  }, [onLayoutContent]);

  return (
    <Animated.FlatList
      ref={listRef}
      contentContainerStyle={styles.listContent}
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      pinchGestureEnabled={false}
      vertical
      bounces
      directionalLockEnabled
      onScroll={onScroll}
      scrollEventThrottle={16}
      ListHeaderComponent={listHeaderComponent}
      stickyHeaderIndices={stickyHeaderIndices}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 200,
    backgroundColor: '#111',
  },
});

export default React.memo<Props>(ListRenderer);
