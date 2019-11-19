// @flow

import { useCallback } from 'react';
import type { LayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes';

import type { ListItemContentLayoutCallbackType } from '~/types';

export function useListItemLayout(index: number, onLayout: ListItemContentLayoutCallbackType) {
  const onLayoutCallback = useCallback((event: LayoutEvent) => {
    const { height } = event.nativeEvent.layout;
    onLayout(index, height + 16);
  }, [index, onLayout]);

  return onLayoutCallback;
}
