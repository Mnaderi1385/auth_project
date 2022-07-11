import { useEffect, useState } from 'react';


const useDarkMode = () => {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        document.documentElement.classList.remove(colorTheme)
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, setTheme]);

    return [colorTheme, setTheme];
};

export default useDarkMode;