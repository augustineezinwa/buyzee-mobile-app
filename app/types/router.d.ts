declare module "expo-router" {
    import type { LinkProps as OriginalLinkProps } from 'expo-router/build/link/Link';
    export type LinkProps<T extends string> = Omit<OriginalLinkProps<T>, 'href'> & {
        href: T;
    };
} 