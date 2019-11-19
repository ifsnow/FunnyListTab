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
import OriginalContentItem from './OriginalContentItem';

import { useListItemLayout } from '~/hooks';
import type { ListItemContentPropsType } from '~/types';

type Props = ListItemContentPropsType;

const OriginalContent = ({
  index,
  title,
  contents,
  onLayout,
}: Props) => {
  const contentsElement = useMemo(() => contents.map((content) => (
    <OriginalContentItem content={content} key={`content-${content.id}`} />
  )), [contents]);

  const onLayoutCallback = useListItemLayout(index, onLayout);

  return (
    <View style={styles.container} onLayout={onLayoutCallback}>
      <ContentTitle text={title} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
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
});

export default React.memo<Props>(OriginalContent);
