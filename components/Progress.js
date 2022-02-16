import React, {Component} from 'react';
import {StyleSheet, View, Animated} from 'react-native';

export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration,
      });
    }
  }

  render() {
    const {
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor,
      row,
    } = this.props;
    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={[{flexDirection: 'row', height}, row ? {flex: 1} : undefined]}>
        <View style={{flex: 1, borderColor, borderWidth, borderRadius}}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {backgroundColor: fillColor, borderRadius},
            ]}
          />
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: widthInterpolated,
              backgroundColor: barColor,
              borderRadius,
            }}
          />
        </View>
      </View>
    );
  }
}

Progress.defaultProps = {
  height: 10,
  borderColor: '#000000',
  borderWidth: 0,
  borderRadius: 4,
  barColor: 'tomato',
  fillColor: 'rgba(0, 0, 205, 0.5)',
  duration: 100,
};
