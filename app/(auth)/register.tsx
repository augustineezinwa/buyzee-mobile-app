import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegister } from '../hooks/useAuth';
import { useBizTheme } from '../hooks/useBizTheme';

const { height } = Dimensions.get('window');

const RegisterScreen = () => {
    const router = useRouter();
    const theme = useBizTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const registerMutation = useRegister();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setSnackbarMessage('Please fill in all fields');
            setSnackbarVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setSnackbarMessage('Passwords do not match');
            setSnackbarVisible(true);
            return;
        }

        if (password.length < 6) {
            setSnackbarMessage('Password must be at least 6 characters');
            setSnackbarVisible(true);
            return;
        }

        try {
            await registerMutation.mutateAsync({ name, email, password });
            // The root layout will handle the redirect after successful registration
        } catch (error) {
            setSnackbarMessage(registerMutation.error?.message || 'Registration failed');
            setSnackbarVisible(true);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.empbizBackground,
        },
        scrollContent: {
            flexGrow: 1,
            paddingHorizontal: 24,
        },
        header: {
            paddingTop: height * 0.12,
            paddingBottom: 48,
            alignItems: 'center',
        },
        title: {
            fontWeight: '700',
            color: theme.colors.empbizBlack,
            marginBottom: 8,
            fontFamily: 'Inter',
        },
        subtitle: {
            color: theme.colors.empbizTextDarkerGray,
            textAlign: 'center',
            fontFamily: 'Inter',
        },
        form: {
            flex: 1,
            justifyContent: 'center',
            paddingBottom: 40,
        },
        input: {
            marginBottom: 20,
            backgroundColor: 'white',
        },
        inputOutline: {
            borderColor: theme.colors.empbizIconGray,
            borderWidth: 1,
        },
        inputContent: {
            fontSize: 16,
            fontFamily: 'Inter',
        },
        registerButton: {
            marginTop: 12,
            marginBottom: 24,
            backgroundColor: theme.colors.empbizPrimary,
            borderRadius: 12,
        },
        buttonContent: {
            paddingVertical: 8,
        },
        buttonLabel: {
            color: 'white',
            fontFamily: 'Inter',
        },
        loginButton: {
            marginTop: 8,
        },
        loginLabel: {
            color: theme.colors.empbizTextDarkerGray,
            fontSize: 14,
            fontFamily: 'Inter',
        },
        snackbar: {
            backgroundColor: theme.colors.error,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text variant="displaySmall" style={styles.title}>
                        Create Account
                    </Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>
                        Sign up to get started
                    </Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        mode="outlined"
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        error={registerMutation.isError && !name}
                    />

                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.input}
                        mode="outlined"
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        error={registerMutation.isError && !email}
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        right={
                            <TextInput.Icon
                                icon={showPassword ? 'eye-off' : 'eye'}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }
                        style={styles.input}
                        mode="outlined"
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        error={registerMutation.isError && !password}
                    />

                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        mode="outlined"
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        error={registerMutation.isError && !confirmPassword}
                    />

                    <Button
                        mode="contained"
                        onPress={handleRegister}
                        style={styles.registerButton}
                        contentStyle={styles.buttonContent}
                        labelStyle={styles.buttonLabel}
                        disabled={registerMutation.isPending}
                        loading={registerMutation.isPending}>
                        Create Account
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => router.push('/login')}
                        style={styles.loginButton}
                        labelStyle={styles.loginLabel}>
                        Already have an account? Sign In
                    </Button>
                </View>
            </ScrollView>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={styles.snackbar}>
                {snackbarMessage}
            </Snackbar>
        </SafeAreaView>
    );
};

export default RegisterScreen; 