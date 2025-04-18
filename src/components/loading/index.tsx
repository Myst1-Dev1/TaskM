import { ActivityIndicator } from "react-native";

import { colors } from "@/styles/theme";
import { s } from "./styles";

export function Loading() {
    return <ActivityIndicator style={s.container} color={colors.green[500]} />
}