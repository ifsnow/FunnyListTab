// @flow

import React, {
  useContext,
  useEffect,
} from 'react';

import {
  Animated,
  StyleSheet,
} from 'react-native';

import { TAB_HEIGHT } from '~/constants';
import { ListContext } from '~/contexts';
import {
  useTabItems,
  useTabStyles,
} from '~/hooks';

import TabFocus from './TabFocus';

const Tab = () => {
  const {
    tabActiveIndex,
    tabMoveAnimation,
  } = useContext(ListContext);

  useEffect(() => {
    Animated.timing(tabMoveAnimation, {
      toValue: tabActiveIndex >= 3 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [tabActiveIndex, tabMoveAnimation]);

  const tabItems = useTabItems();

  const tabStyles = useTabStyles(tabMoveAnimation, {
    container: styles.container,
    scroll: styles.scroll,
  });

  return (
    <Animated.View style={tabStyles.container}>
      <Animated.View style={tabStyles.scroll}>
        <TabFocus />
        {tabItems}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: TAB_HEIGHT,
    backgroundColor: 'rgb(20, 20, 20)',
    zIndex: 2,
  },
  scroll: {
    overflow: 'visible',
    position: 'absolute',
    left: 0,
    top: 0,
    height: TAB_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    zIndex: 2,
  },
});

export default React.memo<{}>(Tab);
