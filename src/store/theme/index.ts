import { useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { atom, useRecoilState } from 'recoil';

import { localPersist } from '../utils';
import type { Actions } from './types';

enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
}

const initialColorScheme = Appearance.getColorScheme();

const themeModeState = atom<Themes.DARK | Themes.LIGHT>({
  key: 'theme-mode-state',
  default: initialColorScheme as Themes,
  effects: [localPersist],
});

function useTheme(): [Themes.DARK | Themes.LIGHT, Actions] {
  const colorScheme = useColorScheme(); // Follow device theme
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);

  useEffect(() => {
    if (colorScheme) setThemeMode(colorScheme as Themes);
  }, [colorScheme, setThemeMode]);

  function toggle() {
    setThemeMode((mode: Themes) => (mode === Themes.DARK ? Themes.LIGHT : Themes.DARK));
  }

  return [themeMode, { toggle }];
}

export default useTheme;
