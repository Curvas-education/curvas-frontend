import { TextInput as Input, useTheme } from "react-native-paper";

const TextInput = ({
  autoCorrect = false,
  style,
  placeholder,
  leftIcon,
  leftPress = () => {},
  rightIcon,
  rightPress = () => {},
  secure = false,
}) => {
  const theme = useTheme();

  return (
    <Input
      left={
        <Input.Icon
          icon={leftIcon}
          iconColor={theme?.colors?.primary}
          onPress={leftPress}
        />
      }
      right={
        rightIcon ? (
          <Input.Icon
            icon={rightIcon}
            iconColor={theme?.colors?.primary}
            onPress={rightPress}
          />
        ) : (
          <></>
        )
      }
      placeholder={placeholder}
      placeholderTextColor={theme?.colors?.primary}
      textColor={theme?.colors?.primary}
      underlineColor={theme?.colors?.primary}
      contentStyle={{
        fontFamily: "Roboto-Regular",
      }}
      secureTextEntry={secure}
      autoCorrect={autoCorrect}
      style={style}
    />
  );
};

export default TextInput;
