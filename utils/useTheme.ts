import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./themes";

export function useTheme() {
  const scheme = useColorScheme() ?? 'light'
  const theme = scheme === 'light' ? lightTheme : darkTheme
  return theme;
}
