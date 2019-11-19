// @flow

import React from 'react';
import { Image } from 'react-native';
import type { ImageSource } from 'react-native/Libraries/Image/ImageSource';

import {
  COVER_TITLE_IMAGE_WIDTH,
  COVER_TITLE_IMAGE_HEIGHT,
} from '~/constants';

type Props = {
  image: ImageSource,
};

const CoverTitleImage = ({ image }: Props) => {
  const containerStyle = {
    width: COVER_TITLE_IMAGE_WIDTH,
    height: COVER_TITLE_IMAGE_HEIGHT,
  };

  return (
    <Image source={image} style={containerStyle} />
  );
};

export default React.memo<Props>(CoverTitleImage);
