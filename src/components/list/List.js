// @flow

import React, {
  useCallback,
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';

import type { ScrollEvent } from 'react-native/Libraries/Types/CoreEventTypes';

import { ListContext } from '~/contexts';

import ListRenderer from './ListRenderer';

const List = () => {
  const {
    scrollEnabled,
    setScrollEnabled,
    tabActiveIndex,
    setTabActiveIndex,
  } = useContext(ListContext);

  const listRef = useRef<any>();
  const [contentScrollPositions, setContentScrollPositions] = useState([]);

  const onChangeScrollPositions = useCallback((newContentScrollPositions: any[]) => {
    setContentScrollPositions(newContentScrollPositions);
  }, []);

  const onScrollListener = useCallback(({ nativeEvent: { contentOffset } }: ScrollEvent) => {
    if (!scrollEnabled) {
      return;
    }

    const { y } = contentOffset;

    let selectedTabIndex = -1;
    contentScrollPositions.forEach(({ start, end }, index) => {
      if (selectedTabIndex === -1 && y >= start && y <= end) {
        selectedTabIndex = index;
      }
    });

    if (selectedTabIndex !== -1) {
      setTabActiveIndex(selectedTabIndex);
    }
  }, [contentScrollPositions, scrollEnabled, setTabActiveIndex]);

  useEffect(() => {
    if (scrollEnabled) {
      return;
    }

    if (!listRef.current) {
      return;
    }

    const offset = tabActiveIndex === 0 ? 0 : (contentScrollPositions[tabActiveIndex]?.start ?? 0);

    listRef.current.getNode().scrollToOffset({
      offset,
    });

    setTimeout(() => {
      setScrollEnabled(true);
    }, 500);
  }, [contentScrollPositions, listRef, scrollEnabled, setScrollEnabled, tabActiveIndex]);

  return (
    <ListRenderer
      listRef={listRef}
      onChangeScrollPositions={onChangeScrollPositions}
      onScrollListener={onScrollListener}
    />
  );
};

export default React.memo<{}>(List);
