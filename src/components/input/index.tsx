import { TextInput, TextInputProps, View } from "react-native";
import { IconProps as TablerIconProps } from '@tabler/icons-react-native';

import { s } from "./styles";
import { colors } from "@/styles/theme";

type InputProps = TextInputProps & {
    icon?: React.ComponentType<TablerIconProps>;
};

export function Input({ icon: Icon, ...rest }: InputProps) {
    return (
        <>
            <View style={s.container}>
                {Icon && <Icon size={25} color={colors.gray[400]} />}
                <TextInput style={s.input} placeholderTextColor={colors.gray[400]} {...rest}/>
            </View>
        </>
    )
}