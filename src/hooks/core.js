// @flow
import { useEffect, useState } from 'react';
import {
  Dimensions,
} from 'react-native';

export function useWindowDimensions() {
  const [dims, setDims] = useState(() => Dimensions.get('window'));
  useEffect(() => {
    function handleChange({ window }) {
      setDims(window);
    }
    Dimensions.addEventListener('change', handleChange);
    // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.
    setDims(Dimensions.get('window'));
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);
  return dims;
}
