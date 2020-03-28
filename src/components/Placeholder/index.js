import React from 'react';
import { Easing, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { loop, bInterpolateColor } from 'react-native-redash';
import { useMemoOne } from 'use-memo-one';
import { useColorScheme } from 'react-native-appearance';
import { isDark } from '../../helpers/color';

const { Clock, Value, set, useCode } = Animated;

function Placeholder(props) {
  const scheme = useColorScheme();

  const { animation, clock } = useMemoOne(
    () => ({
      animation: new Value(0),
      clock: new Clock()
    }),
    []
  );

  useCode(
    () =>
      set(
        animation,
        loop({
          clock,
          duration: 500,
          easing: Easing.linear,
          boomerang: true
        })
      ),
    []
  );

  const backgroundColor = bInterpolateColor(
    animation,
    'rgb(210, 210, 210)',
    'rgb(240, 240, 240)'
  );

  const backgroundColorDark = bInterpolateColor(
    animation,
    'rgb(25, 25, 25)',
    'rgb(35, 35, 35)'
  );

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: isDark(scheme) ? backgroundColorDark : backgroundColor,
        borderRadius: 3,
        zIndex: 1
      }}
    />
  );
}

export default Placeholder;
