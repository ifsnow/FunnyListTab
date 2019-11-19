// @flow

import React, {
  useRef,
  useState,
} from 'react';

import {
  Animated,
} from 'react-native';

import {
  type ListItemType,
  type CoverType,
} from '~/types';

import { useTabItemWidth } from '~/hooks';

type Props = {
  items: ListItemType[],
  cover: CoverType,
  children: any,
};

type ListContextType = {
  items: ListItemType[],
  setItems: (items: ListItemType[]) => void,
  itemCount: number,
  cover: CoverType,
  scrollAnimation: Animated.Value,
  tabMoveAnimation: Animated.Value,
  tabActiveIndex: number,
  setTabActiveIndex: (value: number) => void,
  scrollEnabled: boolean,
  setScrollEnabled: (value: boolean) => void,
  tabItemWidth: number,
  tabItemTotalWidth: number,
};

const ListContext = React.createContext<ListContextType>({});

const ListProvider = ({
  items: listItems,
  cover,
  children,
}: Props) => {
  const [items, setItems] = useState(listItems);
  const itemCount = items.length;
  const scrollAnimation = useRef(new Animated.Value(0)).current;
  const tabMoveAnimation = useRef(new Animated.Value(0)).current;
  const [tabActiveIndex, setTabActiveIndex] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const tabItemWidth = useTabItemWidth();
  const tabItemTotalWidth = tabItemWidth * items.length;

  const value = {
    items,
    setItems,
    itemCount,
    cover,
    scrollAnimation,
    tabMoveAnimation,
    tabActiveIndex,
    setTabActiveIndex,
    scrollEnabled,
    setScrollEnabled,
    tabItemWidth,
    tabItemTotalWidth,
  };

  return (
    <ListContext.Provider value={value}>
      {children}
    </ListContext.Provider>
  );
};

export {
  ListContext,
  ListProvider,
};
