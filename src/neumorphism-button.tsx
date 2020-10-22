import * as React from 'react';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonOuter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 12,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: '#5ba9a7',
    shadowOpacity: 1.0,
    shadowRadius: 18,
    marginTop: 12,
    marginBottom: 12,
  },
  buttonInner: {
    backgroundColor: '#55b9f3',
    borderRadius: 12,
    shadowOffset: { width: -12, height: -12 },
    shadowColor: '#7be5e3',
    shadowOpacity: 1.0,
    shadowRadius: 18,
  },
  buttonFace: {
    borderRadius: 12,
    padding: 12,
  },
});

const NeumorphismButton = (props) => {
  const { size = 12 } = props;
  const [isDown, setDown] = useState(false);
  const handlePressIn = useCallback(() => {
    setDown(true);
  }, [setDown]);
  const handlePressOut = useCallback(() => {
    setDown(false);
  }, [setDown]);

  const gradColors = isDown ? ['#72d5d3', '#60b3b1'] : ['#60b3b1', '#72d5d3'];
  const buttonCommonStyle = {
    borderRadius: size,
    shadowRadius: size * 1.5,
  };
  const buttonOuterStyle = {
    shadowOffset: { width: size, height: size },
    marginTop: size,
    marginBottom: size,
  };
  const buttonInnerStyle = {
    shadowOffset: { width: -size, height: -size },
  };
  const buttonFaceStyle = {
    borderRadius: size,
    padding: size,
  };

  return (
    <View style={[styles.buttonOuter, buttonCommonStyle, buttonOuterStyle]}>
      <View style={[styles.buttonInner, buttonCommonStyle, buttonInnerStyle]}>
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <LinearGradient
            colors={gradColors}
            useAngle={true}
            angle={145}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={[styles.buttonFace, buttonFaceStyle, props.style]}>
            {props.children}
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

NeumorphismButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  size: PropTypes.number,
};

export default NeumorphismButton;
