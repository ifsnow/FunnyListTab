// @flow

import React, {
  useEffect,
  useContext,
  useRef,
} from 'react';

import {
  Animated,
  StyleSheet,
} from 'react-native';

import { ListContext } from '~/contexts';
import { useTabFocusStyles } from '~/hooks';

let prevTabActiveIndex = 0;

const LAST_PART_INDEX = 3;

const TabFocus = () => {
  const {
    tabActiveIndex,
  } = useContext(ListContext);

  const partAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    const animations = [];
    const isMoveRight = tabActiveIndex > prevTabActiveIndex;

    function addAnimation(index) {
      animations.push(Animated.spring(partAnimations[index], {
        toValue: tabActiveIndex,
        useNativeDriver: true,
      }));
    }

    if (isMoveRight) {
      for (let partIndex = LAST_PART_INDEX; partIndex >= 0; partIndex--) {
        addAnimation(partIndex);
      }
    } else {
      for (let partIndex = 0; partIndex <= LAST_PART_INDEX; partIndex++) {
        addAnimation(partIndex);
      }
    }

    const compositeAnimation = Animated.stagger(100, animations);
    compositeAnimation.start();

    prevTabActiveIndex = tabActiveIndex;

    return () => compositeAnimation.stop();
  }, [partAnimations, tabActiveIndex]);

  const [
    partStyle1,
    partStyle2,
    partStyle3,
    partStyle4,
  ] = useTabFocusStyles(partAnimations, styles.part);

  return (
    <>
      <Animated.View style={partStyle1} />
      <Animated.View style={partStyle2} />
      <Animated.View style={partStyle3} />
      <Animated.View style={partStyle4} />
    </>
  );
};

const styles = StyleSheet.create({
  part: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#E50914',
  },
});

export default React.memo<{}>(TabFocus);
