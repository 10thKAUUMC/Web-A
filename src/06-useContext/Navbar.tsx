import clsx from 'clsx';
import { THEME, useTheme } from './context/ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';

export default function Navbar(): JSX.Element {
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav className={clsx(
            'w-full p-4 flex justify-end',  // justify-between → justify-end, border-b 제거
            isLightMode ? 'bg-zinc-50' : 'bg-zinc-900'
        )}>
            <ThemeToggleButton />
        </nav>
    );
}