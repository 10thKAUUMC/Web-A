import { THEME, useTheme } from './context/ThemeProvider';
import clsx from 'clsx';

export default function ThemeToggleButton(): JSX.Element {
    const { theme, toggleTheme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <button
            onClick={toggleTheme}   
        >
            <span className="flex items-center justify-center gap-2">
                {isLightMode ? '🌙 다크 모드' : '☀️ 라이트 모드'}
            </span>
        </button>
    );
}