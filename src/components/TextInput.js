import { TextInput as Input, useTheme } from "react-native-paper";

const TextInput = ({
  value,
  onChangeText = () => {},
  autoCorrect = false,
  style,
  placeholder,
  leftIcon,
  leftPress = () => {},
  rightIcon,
  rightPress = () => {},
  secure = false,
  label,
  ...rest
}) => {
  const theme = useTheme();

  let left = leftIcon ? (
    <Input.Icon
      icon={leftIcon}
      iconColor={theme?.colors?.primary}
      onPress={leftPress}
    />
  ) : null;

  let right = rightIcon ? (
    <Input.Icon
      icon={rightIcon}
      iconColor={theme?.colors?.primary}
      onPress={rightPress}
    />
  ) : null;

  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      left={left}
      right={right}
      label={label}
      placeholder={placeholder}
      placeholderTextColor={theme?.colors?.primary}
      textColor={theme?.colors?.primary}
      underlineColor={theme?.colors?.primary}
      outlineColor={theme?.colors?.primary}
      contentStyle={{
        fontFamily: "Roboto-Regular",
        color: theme?.colors?.primary,
      }}
      secureTextEntry={secure}
      autoCorrect={autoCorrect}
      style={style}
      {...rest}
    />
  );
};

export default TextInput;
