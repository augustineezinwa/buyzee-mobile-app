import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleIcon from '../components/GoogleIcon';
import { useBizTheme } from '../hooks/useBizTheme';

interface LoginPromptScreenProps {
    title?: string;
    subtitle?: string;
    onBack?: () => void;
}

const LoginPromptScreen = ({
    title = "Please login to continue",
    subtitle = "Sign in to access this feature and manage your account.",
    onBack
}: LoginPromptScreenProps) => {
    const router = useRouter();
    const theme = useBizTheme();
    const { fallback } = useLocalSearchParams<{ fallback?: string }>();

    const handleGoogleSignIn = () => {
        // TODO: Implement Google Sign In
        console.log('Google Sign In pressed');
    };

    const handleEmailSignIn = () => {
        // Pass the fallback route to the login screen
        const loginRoute = fallback ? `/login?fallback=${encodeURIComponent(fallback)}` : '/login';
        router.push(loginRoute);
    };

    const handleSignUp = () => {
        // Pass the fallback route to the signup intro screen
        const signupRoute = fallback ? `/signup-intro?fallback=${encodeURIComponent(fallback)}` : '/signup-intro';
        router.push(signupRoute);
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            // If there's a fallback route, go to home instead of back
            // This prevents users from getting stuck in a loop
            if (fallback) {
                router.replace('/(tabs)');
            } else {
                router.back();
            }
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        content: {
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: 'center',
        },
        header: {
            alignItems: 'center',
            marginBottom: 60,
        },
        logo: {
            width: 100,
            height: 100,
            marginBottom: 32,
        },
        title: {
            fontWeight: '700',
            color: theme.colors.empbizBlack,
            marginBottom: 12,
            fontFamily: 'Inter',
            textAlign: 'center',
        },
        subtitle: {
            color: theme.colors.empbizTextDarkerGray,
            textAlign: 'center',
            fontFamily: 'Inter',
            lineHeight: 24,
        },
        buttonsContainer: {
            marginBottom: 32,
        },
        googleButton: {
            marginBottom: 16,
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.empbizIconGray,
        },
        googleButtonContent: {
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 48,
            gap: 10
        },
        emailButton: {
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 12,
        },
        emailButtonContent: {
            paddingVertical: 12,
        },
        emailButtonLabel: {
            color: 'white',
            fontFamily: 'Inter',
            fontWeight: '600',
        },
        signUpContainer: {
            alignItems: 'center',
            marginBottom: 24,
        },
        signUpText: {
            color: theme.colors.empbizTextDarkerGray,
            fontSize: 14,
            fontFamily: 'Inter',
            marginBottom: 8,
        },
        signUpButton: {
            marginTop: 4,
        },
        signUpButtonLabel: {
            color: theme.colors.empbizPrimary,
            fontSize: 14,
            fontFamily: 'Inter',
            fontWeight: '600',
        },
        backContainer: {
            alignItems: 'center',
        },
        backButton: {
            marginTop: 8,
        },
        backButtonLabel: {
            color: theme.colors.empbizTextGray,
            fontSize: 14,
            fontFamily: 'Inter',
            textDecorationLine: 'underline',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/images/empower-biz-logo.png')}
                        style={styles.logo}
                        contentFit="contain"
                    />
                    <Text variant="displaySmall" style={styles.title}>
                        {title}
                    </Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>
                        {subtitle}
                    </Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <Button
                        mode="contained"
                        onPress={handleGoogleSignIn}
                        style={styles.googleButton}
                    >
                        <View style={styles.googleButtonContent}>
                            <GoogleIcon size={16} />
                            <Text>Sign in with Google</Text>
                        </View>
                    </Button>

                    <Button
                        mode="contained"
                        onPress={handleEmailSignIn}
                        style={styles.emailButton}
                        contentStyle={styles.emailButtonContent}
                        labelStyle={styles.emailButtonLabel}
                        icon="email">
                        Sign in with Email & Password
                    </Button>
                </View>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>
                        Don't have an account?
                    </Text>
                    <Button
                        mode="text"
                        onPress={handleSignUp}
                        style={styles.signUpButton}
                        labelStyle={styles.signUpButtonLabel}>
                        Sign Up
                    </Button>
                </View>

                <View style={styles.backContainer}>
                    <Button
                        mode="text"
                        onPress={handleBack}
                        style={styles.backButton}
                        labelStyle={styles.backButtonLabel}>
                        {fallback ? 'Go to Home' : 'Go Back'}
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginPromptScreen;
