import React from "react";
import { StyleSheet } from "react-native";
import { RadioButton, Text, useTheme, TouchableRipple } from "react-native-paper";

const RadioButtonComponent = ({text, value, onPress, ...rest}) => {
  const theme = useTheme();

  return (
      <TouchableRipple style={styles.radio} rippleColor="rgba(0, 0, 0, .32)" onPress={onPress}>
        <>
          <Text style={[{color: theme?.colors?.background}, styles.radioText]}>{text}</Text>
          <RadioButton value={value} color={theme?.colors?.background} uncheckedColor={theme?.colors?.background} {...rest} />
        </>
      </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  radioText: {
    fontSize: 20
  },
  radio: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10
  }
});

export default RadioButtonComponent;
