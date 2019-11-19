// @flow

import React, {
  useMemo,
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ContentTitle from '~/components/list/contents/common/ContentTitle';
import PreviewContentItem from './PreviewContentItem';

import { useListItemLayout } from '~/hooks';
import type { ListItemContentPropsType } from '~/types';

type Props = ListItemContentPropsType;

const PreviewContent = ({
  index,
  title,
  contents,
  onLayout,
}: Props) => {
  const contentsElement = useMemo(() => contents.map((content) => (
    <PreviewContentItem content={content} key={`content-${content.id}`} />
  )), [contents]);

  const onLayoutCallback = useListItemLayout(index, onLayout);

  return (
    <View style={styles.container} onLayout={onLayoutCallback}>
      <ContentTitle text={title} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.contents}
      >
        {contentsElement}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginTop: 16,
  },
  contents: {
    marginTop: 10,
  },
});

export default React.memo<Props>(PreviewContent);
