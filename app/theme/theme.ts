import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { empowerbizTheme } from './empowerbiz.theme';

const light = empowerbizTheme.schemes.light;
const dark = empowerbizTheme.schemes.dark;

export const lightTheme: MD3Theme = {
    ...DefaultLightTheme,
    colors: {
        ...DefaultLightTheme.colors,
        primary: light.primary,
        onPrimary: light.onPrimary,
        primaryContainer: light.primaryContainer,
        onPrimaryContainer: light.onPrimaryContainer,

        secondary: light.secondary,
        onSecondary: light.onSecondary,
        secondaryContainer: light.secondaryContainer,
        onSecondaryContainer: light.onSecondaryContainer,

        tertiary: light.tertiary,
        onTertiary: light.onTertiary,
        tertiaryContainer: light.tertiaryContainer,
        onTertiaryContainer: light.onTertiaryContainer,

        background: light.background,
        onBackground: light.onBackground,

        surface: light.surface,
        onSurface: light.onSurface,
        surfaceVariant: light.surfaceVariant,
        onSurfaceVariant: light.onSurfaceVariant,

        error: light.error,
        onError: light.onError,
        errorContainer: light.errorContainer,
        onErrorContainer: light.onErrorContainer,

        outline: light.outline,
        outlineVariant: light.outlineVariant,
        inverseSurface: light.inverseSurface,
        inverseOnSurface: light.inverseOnSurface,
        inversePrimary: light.inversePrimary,

        surfaceDisabled: 'rgba(0, 0, 0, 0.12)',
        onSurfaceDisabled: 'rgba(0, 0, 0, 0.38)',
        backdrop: light.scrim ?? 'rgba(0, 0, 0, 0.5)',

        elevation: {
            level0: 'transparent',
            level1: light.surface,
            level2: light.surfaceVariant,
            level3: light.surfaceVariant,
            level4: light.surfaceVariant,
            level5: light.surfaceVariant,
        },
    },
};

export const darkTheme: MD3Theme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        primary: dark.primary,
        onPrimary: dark.onPrimary,
        primaryContainer: dark.primaryContainer,
        onPrimaryContainer: dark.onPrimaryContainer,

        secondary: dark.secondary,
        onSecondary: dark.onSecondary,
        secondaryContainer: dark.secondaryContainer,
        onSecondaryContainer: dark.onSecondaryContainer,

        tertiary: dark.tertiary,
        onTertiary: dark.onTertiary,
        tertiaryContainer: dark.tertiaryContainer,
        onTertiaryContainer: dark.onTertiaryContainer,

        background: dark.background,
        onBackground: dark.onBackground,

        surface: dark.surface,
        onSurface: dark.onSurface,
        surfaceVariant: dark.surfaceVariant,
        onSurfaceVariant: dark.onSurfaceVariant,

        error: dark.error,
        onError: dark.onError,
        errorContainer: dark.errorContainer,
        onErrorContainer: dark.onErrorContainer,

        outline: dark.outline,
        outlineVariant: dark.outlineVariant,
        inverseSurface: dark.inverseSurface,
        inverseOnSurface: dark.inverseOnSurface,
        inversePrimary: dark.inversePrimary,

        surfaceDisabled: 'rgba(255, 255, 255, 0.12)',
        onSurfaceDisabled: 'rgba(255, 255, 255, 0.38)',
        backdrop: dark.scrim ?? 'rgba(0, 0, 0, 0.5)',

        elevation: {
            level0: 'transparent',
            level1: dark.surface,
            level2: dark.surfaceVariant,
            level3: dark.surfaceVariant,
            level4: dark.surfaceVariant,
            level5: dark.surfaceVariant,
        },
    },
};
