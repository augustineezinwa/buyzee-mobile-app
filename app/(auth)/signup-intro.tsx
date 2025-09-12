import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleIcon from '../components/GoogleIcon';
import { useBizTheme } from '../hooks/useBizTheme';

const { height } = Dimensions.get('window');

const SignupIntroScreen = () => {
    const router = useRouter();
    const theme = useBizTheme();

    const handleGoogleSignUp = () => {
        // TODO: Implement Google Sign Up
        console.log('Google Sign Up pressed');
    };

    const handleEmailSignUp = () => {
        router.push('/register');
    };

    const handleSignIn = () => {
        router.push('/intro');
    };

    const handleBack = () => {
        router.back();
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
        signInContainer: {
            alignItems: 'center',
            marginBottom: 24,
        },
        signInText: {
            color: theme.colors.empbizTextDarkerGray,
            fontSize: 14,
            fontFamily: 'Inter',
            marginBottom: 8,
        },
        signInButton: {
            marginTop: 4,
        },
        signInButtonLabel: {
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
                        Join EmpowerMe Biz
                    </Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>
                        Create your account and start your{'\n'}business journey with us today.
                    </Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <Button
                        mode="contained"
                        onPress={handleGoogleSignUp}
                        style={styles.googleButton}
                    >
                        <View style={styles.googleButtonContent}>
                            <GoogleIcon size={16} />
                            <Text>Sign up with Google</Text>
                        </View>
                    </Button>

                    <Button
                        mode="contained"
                        onPress={handleEmailSignUp}
                        style={styles.emailButton}
                        contentStyle={styles.emailButtonContent}
                        labelStyle={styles.emailButtonLabel}
                        icon="email">
                        Sign up with Email & Password
                    </Button>
                </View>

                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>
                        Already have an account?
                    </Text>
                    <Button
                        mode="text"
                        onPress={handleSignIn}
                        style={styles.signInButton}
                        labelStyle={styles.signInButtonLabel}>
                        Sign In
                    </Button>
                </View>

                <View style={styles.backContainer}>
                    <Button
                        mode="text"
                        onPress={handleBack}
                        style={styles.backButton}
                        labelStyle={styles.backButtonLabel}>
                        Go Back
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignupIntroScreen;
