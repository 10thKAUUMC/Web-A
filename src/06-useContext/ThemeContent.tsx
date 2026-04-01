import clsx from 'clsx';
import { THEME, useTheme } from './context/ThemeProvider';

export default function ThemeContent(): JSX.Element {
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <div className={clsx(
            'p-8 transition-colors duration-300',
            isLightMode ? 'text-zinc-900' : 'text-zinc-100'
        )}>
            <h1 className='font-bold text-2xl mb-4'>Theme Content</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Maiores placeat dolorum magnam magni facere vel sequi itaque obcaecati, 
                at, minus perspiciatis error sint iste quas quam laboriosam recusandae esse provident.
            </p>
        </div>
    );
}