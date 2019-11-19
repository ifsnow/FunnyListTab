// @flow

import React, {
  useMemo,
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ContentTitle from '~/components/list/contents/common/ContentTitle';
import DefaultContentItem from './DefaultContentItem';

import { useListItemLayout } from '~/hooks';
import type { ListItemContentPropsType } from '~/types';

type Props = ListItemContentPropsType;

const DefaultContent = ({
  index,
  title,
  contents,
  onLayout,
}: Props) => {
  const contentsElement = useMemo(() => contents.map((content) => (
    <DefaultContentItem content={content} key={`content-${content.id}`} />
  )), [contents]);

  const onLayoutCallback = useListItemLayout(index, onLayout);

  return (
    <View style={styles.container} onLayout={onLayoutCallback}>
      <ContentTitle text={title} />
      {contentsElement}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginTop: 16,
  },
});

export default React.memo<Props>(DefaultContent);
