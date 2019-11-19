// @flow

import {
  Platform,
  Dimensions,
} from 'react-native';

export const IS_OVER_IPHONEX = Platform.OS === 'ios'
  && !Platform.isPad
  && !Platform.isTVOS
  && Dimensions.get('window').height >= 812;

export const COVER_BASE_WIDTH = 360;

export const COVER_BASE_HEIGHT = 202;

export const COVER_TITLE_IMAGE_WIDTH = 174;

export const COVER_TITLE_IMAGE_HEIGHT = 74;

export const CONVER_EXTRA_HEIGHT_FOR_IPHONEX = IS_OVER_IPHONEX ? 60 : 0;

export const SCROLL_THRESHOLD = 200 - CONVER_EXTRA_HEIGHT_FOR_IPHONEX;

export const HALF_OF_SCROLL_THRESHOLD = SCROLL_THRESHOLD / 2;

export const TAB_HEIGHT = 50;
