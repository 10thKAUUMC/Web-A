import { THEME, useTheme } from './context/ThemeProvider';

export default function ThemeToggleButton(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button onClick={toggleTheme}>
      {isLightMode ? '🌙 다크 모드' : '🌞 라이트 모드'}
    </button>
  );
}