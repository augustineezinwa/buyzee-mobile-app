import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleIcon from '../components/GoogleIcon';
import { useBizTheme } from '../hooks/useBizTheme';

const { height } = Dimensions.get('window');

const IntroScreen = () => {
    const router = useRouter();
    const theme = useBizTheme();

    const handleGoogleSignIn = () => {
        // TODO: Implement Google Sign In
        console.log('Google Sign In pressed');
    };

    const handleEmailSignIn = () => {
        router.push('/login');
    };

    const handleSignUp = () => {
        router.push('/signup-intro');
    };

    const handleSkip = async () => {
        try {
            // Store that user has chosen to skip authentication
            await AsyncStorage.setItem('userSkippedAuth', 'true');
            // Navigate to home screen
            router.replace('/(tabs)');
        } catch (error) {
            console.error('Error saving skip preference:', error);
            // Still navigate even if storage fails
            router.replace('/(tabs)');
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
            width: 120,
            height: 120,
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
        skipContainer: {
            alignItems: 'center',
        },
        skipButton: {
            marginTop: 8,
        },
        skipButtonLabel: {
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
                        EmpowerMe Biz
                    </Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>
                        Your business, empowered.{'\n'}Start your journey with us today.
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

                <View style={styles.skipContainer}>
                    <Button
                        mode="text"
                        onPress={handleSkip}
                        style={styles.skipButton}
                        labelStyle={styles.skipButtonLabel}>
                        Skip for now
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default IntroScreen;
