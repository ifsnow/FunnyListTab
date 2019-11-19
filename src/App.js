// @flow

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { HomeScreen } from '~/screens';

import {
  cover,
  items,
} from './data';

const App = () => {
  useEffect(() => {
    StatusBar.setHidden(true, 'none');

    return () => {
      StatusBar.setHidden(false, 'none');
    };
  }, []);

  return <HomeScreen items={items} cover={cover} />;
};

export default App;
