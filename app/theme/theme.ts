import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';

// const light = empowerbizTheme.schemes.light;
// const dark = empowerbizTheme.schemes.dark;


type CustomColors = {
    empbizPrimary: string;
    empbizSecondary: string;
    empbizBackground: string;
    empbizBlack: string;
    empbizGray777: string;
    empbizDarkerBackground: string;
    empbizIconGray: string;
    empbizTextGray: string;
    empbizTextDarkerGray: string;
}

export type CustomTheme = MD3Theme & {
    colors: MD3Theme['colors'] & CustomColors;
}

declare global {
    namespace ReactNativePaper {
        interface ThemeColors extends CustomColors { }
    }
}

export const lightTheme: CustomTheme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        primary: '#00D073',
        empbizPrimary: '#00D073',
        empbizSecondary: '#DDEDD9',
        empbizBackground: '#F5F8FA',
        empbizBlack: '#000000',
        empbizGray777: '#777777',
        empbizDarkerBackground: '#EBECF3',
        empbizIconGray: '#9CA1A4',
        empbizTextGray: '#AAADB9',
        empbizTextDarkerGray: '#787D7F',
        surfaceDisabled: 'rgba(0, 0, 0, 0.12)',
        onSurfaceDisabled: 'rgba(0, 0, 0, 0.38)',
        backdrop: 'rgba(0, 0, 0, 0.5)',
    },
};

export const darkTheme: CustomTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        primary: '#00D073',
        empbizPrimary: '#00D073',
        empbizSecondary: '#1E2D1B',
        empbizBackground: '#121517',
        empbizBlack: '#FFFFFF',
        empbizGray777: '#999999',
        empbizDarkerBackground: '#1A1BF',
        empbizIconGray: '#6B7073',
        empbizTextGray: '#71747E',
        empbizTextDarkerGray: '#A5A8AA',
        surfaceDisabled: 'rgba(255, 255, 255, 0.12)',
        onSurfaceDisabled: 'rgba(255, 255, 255, 0.38)',
        backdrop: 'rgba(0, 0, 0, 0.5)',
    },
};

export const withOpacity = (color: string, opacity: number): string => {
    // Clean up the color string by removing any trailing characters after the closing parenthesis
    const cleanColor = color.replace(/\)[^)]*$/, ')');

    // Handle rgb/rgba colors
    if (cleanColor.startsWith('rgb')) {
        const match = cleanColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (match) {
            const [_, r, g, b] = match;
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
    }

    // Handle hex colors
    if (cleanColor.startsWith('#')) {
        // Remove any trailing characters after the hex code
        const hexColor = cleanColor.match(/#[0-9A-Fa-f]{6}/)?.[0] || cleanColor;
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
    }

    // Fallback to a default color if parsing fails
    console.warn(`Unable to parse color: ${color}, using fallback color`);
    return `rgba(0, 0, 0, ${opacity})`;
};
