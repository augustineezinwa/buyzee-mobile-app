import { useTheme } from "react-native-paper";
import { CustomTheme } from "../theme/theme";



export function useBizTheme<T = CustomTheme>(overrides?: $DeepPartial<T>) {
    return useTheme<T>(overrides);
}