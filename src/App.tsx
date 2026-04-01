import ContextPage from './06-useContext/ContextPage';
import './App.css';
import { ThemeProvider, useTheme, THEME } from './06-useContext/context/ThemeProvider';
import clsx from 'clsx';

function AppContainer(): JSX.Element {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  
  return (
    <div
      className={clsx(
        'min-h-screen w-full transition-colors duration-500 flex flex-col', 
        isLightMode ? 'bg-zinc-50' : 'bg-zinc-900'
      )}
    >
      <ContextPage />
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}