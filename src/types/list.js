// @flow

export const LIST_ITEM_KIND = {
  DEFAULT: 'DEFAULT',
  PREVIEW: 'PREVIEW',
  TRENDING: 'TRENDING',
  ORIGINAL: 'ORIGINAL',
};

export type ListItemKindType = $Values<typeof LIST_ITEM_KIND>;

export type ListItemContentType = {
  id: number,
  image: any,
  title?: string,
  titleImage?: any,
  message?: string,
};

export type ListItemContentsType = ListItemContentType[];

export type ListItemType = {
  kind: ListItemKindType,
  tabTitle: string,
  contents: ListItemContentsType,
};

export type ListScrollPositionsType = {
  start: number,
  end: number,
};

export type ListItemContentLayoutCallbackType = (index: number, height: number) => void;

export type ListItemContentPropsType = {
  index: number,
  title: string,
  contents: ListItemContentsType,
  onLayout: ListItemContentLayoutCallbackType,
}
