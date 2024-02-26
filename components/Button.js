
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from './styles'; 

/**
 * Button component represents a touchable button with customizable text and behavior.
 *
 * @param {string} title - The text displayed on the button.
 * @param {function} onPress - Callback function to be executed when the button is pressed.
 * @param {boolean} disabled - Indicates whether the button is disabled.
 * @param {string} textColor - The color of the button text.
 * @returns {JSX.Element} - A React component that represents a customizable button.
 */

const Button = ({ title, onPress, disabled, textColor }) => {
    const [isPressed, setIsPressed] = useState(false);
  
    const handlePressIn = () => {
      setIsPressed(true);
    };
  
    const handlePressOut = () => {
      setIsPressed(false);
      if (!disabled) {
        onPress();
      }
    };
  
    return (
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={styles.button}
      >
        <Text style={[styles.text, { color: isPressed ? 'grey' : textColor }]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 5,
      backgroundColor: colors.button,
    },
    text: {
      fontSize: 16,
    },
  });
  
  export default Button;
  