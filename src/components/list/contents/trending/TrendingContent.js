// @flow

import React, {
  useMemo,
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ContentTitle from '~/components/list/contents/common/ContentTitle';
import TrendingContentItem from './TrendingContentItem';

import { useListItemLayout } from '~/hooks';
import type { ListItemContentPropsType } from '~/types';

type Props = ListItemContentPropsType;

const TrendingContent = ({
  index,
  title,
  contents,
  onLayout,
}: Props) => {
  const contentsElement = useMemo(() => contents.map((content) => (
    <TrendingContentItem content={content} key={`content-${content.id}`} />
  )), [contents]);

  const onLayoutCallback = useListItemLayout(index, onLayout);

  return (
    <View style={styles.container} onLayout={onLayoutCallback}>
      <ContentTitle text={title} />
      <View style={styles.contents}>
        {contentsElement}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginTop: 16,
  },
  contents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default React.memo<Props>(TrendingContent);
