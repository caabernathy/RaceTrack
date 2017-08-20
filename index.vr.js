'use strict';

import React from 'react';
import {
  Animated, 
  AppRegistry, 
  Box, 
  texture, 
  View, 
  Pano,
  asset,
} from 'react-vr';

const AnimatedBox = Animated.createAnimatedComponent(Box);

class RaceTrack extends React.Component {
  constructor() {
    super();

    this.state = {
      rotation: new Animated.Value(0),
    };
    this._rotateTo = 360;
  }

  componentDidMount() {
    this._rotateOnce();
  }

  /**
   * Rotate the cube back and forth
   */
  _rotateOnce() {
    this.state.rotation.setValue(0);
    Animated.timing(this.state.rotation, {
      toValue: this._rotateTo,
      duration: 10000,
    }).start(() => this._rotateOnce());
    this._rotateTo = -this._rotateTo;
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <AnimatedBox
          style={{
            color: 'coral',
            transform: [{translate: [0, 0, -1]}, {rotateY: this.state.rotation}],
          }}
          dimWidth={0.5}
          dimHeight={0.5}
          dimDepth={0.5}
          texture={asset('cheetah.jpg')} // Use our custom texture
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('RaceTrack', () => RaceTrack);
