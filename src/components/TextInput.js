import { TextInput as Input, useTheme } from "react-native-paper";

const TextInput = ({
  value,
  onChangeText = () => { },
  autoCorrect = false,
  placeholder,
  leftIcon,
  leftPress = () => { },
  rightIcon,
  rightPress = () => { },
  secure = false,
  label,
  multiline = false,
  rightColor,
  leftColor,
  content = {},
  ...rest
}) => {
  const theme = useTheme();

  let left = leftIcon ? (
    <Input.Icon
      icon={leftIcon}
      iconColor={leftColor ? leftColor : theme?.colors?.primary}
      onPress={leftPress}
    />
  ) : null;

  let right = rightIcon ? (
    <Input.Icon
      icon={rightIcon}
      iconColor={rightColor ? rightColor : theme?.colors?.primary}
      onPress={rightPress}
    />
  ) : null;

  const countLines = Math.ceil(
    1 + Math.round(value?.length / 132) + ((value?.match(/\n/g) || []).length)
  )

  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      left={left}
      multiline={multiline}
      right={right}
      label={label}
      placeholder={placeholder}
      placeholderTextColor={theme?.colors?.primary}
      textColor={theme?.colors?.primary}
      underlineColor={theme?.colors?.primary}
      outlineColor={theme?.colors?.primary}
      numberOfLines={multiline ? countLines : 1}
      contentStyle={{
        fontFamily: "Roboto-Regular",
        marginTop: 0,
        color: theme?.colors?.primary,
        ...content
      }}
      secureTextEntry={secure}
      autoCorrect={autoCorrect}
      {...rest}
    />
  );
};

export default TextInput;
