import { View, TextInput, TextInputProps } from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import { TextInputMask, TextInputMaskOptionProp } from "react-native-masked-text";

import { s } from "./styles";
import { colors } from "@/styles/theme";

type InputProps = Omit<TextInputProps, 'type'> & {
  icon?: React.ComponentType<TablerIconProps>;
  mask?: {
    type: 'cpf' | 'cel-phone' | 'datetime';
    options?: TextInputMaskOptionProp;
  };
};

export function Input({ icon: Icon, mask, ...rest }: InputProps) {
  return (
    <View style={s.container}>
      {Icon && <Icon size={25} color={colors.gray[400]} style={s.icon} />}

      {mask ? (
        <TextInputMask
          style={s.input}
          placeholderTextColor={colors.gray[400]}
          type={mask.type}
          options={mask.options}
          {...rest}
        />
      ) : (
        <TextInput
          style={s.input}
          placeholderTextColor={colors.gray[400]}
          {...rest}
        />
      )}
    </View>
  );
}