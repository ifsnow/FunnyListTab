// @flow

import {
  LIST_ITEM_KIND,
  type ListItemType,
  type CoverType,
} from '~/types';

export const cover: CoverType = {
  backgroundImage: require('~/assets/cover_background.png'),
  titleImage: require('~/assets/cover_title.png'),
  content: "Her father says it's too risky,\nbut nothing can stop this courageous girl",
};

export const items: ListItemType[] = [
  {
    kind: LIST_ITEM_KIND.PREVIEW,
    title: 'Previews',
    tabTitle: 'Previews',
    contents: [
      {
        id: 1,
        image: require('~/assets/content_1.jpg'),
        titleImage: require('~/assets/content_1_title.png'),
      },
      {
        id: 4,
        image: require('~/assets/content_4.png'),
        titleImage: require('~/assets/content_4_title.png'),
      },
      {
        id: 2,
        image: require('~/assets/content_2.png'),
        titleImage: require('~/assets/content_2_title.png'),
      },
      {
        id: 9,
        image: require('~/assets/content_9.jpg'),
        titleImage: require('~/assets/content_9_title.png'),
      },
    ],
  },
  {
    kind: LIST_ITEM_KIND.DEFAULT,
    title: 'TV Shows',
    tabTitle: 'TV Shows',
    contents: [
      {
        id: 1,
        image: require('~/assets/content_1.jpg'),
        title: 'The Good Place',
        message: 'Eleanor wants Chidi to teach her to be a good person, so he insists that she participate in a neighborhood cleanup instead of learning to fly.',
      },
      {
        id: 2,
        image: require('~/assets/content_2.png'),
        title: 'Modern Family',
        message: 'This Emmy-winning sitcom follows Jay Pritchett and his eclectic family as they deal with the challenges of contemporary life in Los Angeles.',
      },
      {
        id: 3,
        image: require('~/assets/content_3.jpg'),
        title: 'Money Heist',
        message: 'This riveting crime series won Best Drama at the International Emmy Awards and the Premios Fénix.',
      },
      {
        id: 4,
        image: require('~/assets/content_4.png'),
        title: 'Friends',
        message: 'This hit sitcom follows the merry misadventures of six 20-something pals as they navigate the pitfalls of work, life and love in 1990s Manhattan.',
      },
    ],
  },
  {
    kind: LIST_ITEM_KIND.TRENDING,
    title: 'Trending Now',
    tabTitle: 'Trending',
    contents: [
      {
        id: 5,
        image: require('~/assets/content_5.jpg'),
      },
      {
        id: 6,
        image: require('~/assets/content_6.jpg'),
      },
      {
        id: 7,
        image: require('~/assets/content_7.jpg'),
      },
      {
        id: 8,
        image: require('~/assets/content_8.png'),
      },
    ],
  },
  {
    kind: LIST_ITEM_KIND.ORIGINAL,
    title: 'NETFLIX ORIGINAL >',
    tabTitle: 'Original',
    contents: [
      {
        id: 10,
        image: require('~/assets/content_10.png'),
      },
      {
        id: 11,
        image: require('~/assets/content_11.png'),
      },
      {
        id: 12,
        image: require('~/assets/content_12.png'),
      },
      {
        id: 13,
        image: require('~/assets/content_13.png'),
      },
    ],
  },
  {
    kind: LIST_ITEM_KIND.DEFAULT,
    title: 'Popular on Netflix',
    tabTitle: 'Popular',
    contents: [
      {
        id: 1,
        image: require('~/assets/content_1.jpg'),
        title: 'The Good Place',
        message: 'Eleanor wants Chidi to teach her to be a good person, so he insists that she participate in a neighborhood cleanup instead of learning to fly.',
      },
      {
        id: 2,
        image: require('~/assets/content_2.png'),
        title: 'Modern Family',
        message: 'This Emmy-winning sitcom follows Jay Pritchett and his eclectic family as they deal with the challenges of contemporary life in Los Angeles.',
      },
      {
        id: 3,
        image: require('~/assets/content_3.jpg'),
        title: 'Money Heist',
        message: 'This riveting crime series won Best Drama at the International Emmy Awards and the Premios Fénix.',
      },
      {
        id: 4,
        image: require('~/assets/content_4.png'),
        title: 'Friends',
        message: 'This hit sitcom follows the merry misadventures of six 20-something pals as they navigate the pitfalls of work, life and love in 1990s Manhattan.',
      },
    ],
  },
];
