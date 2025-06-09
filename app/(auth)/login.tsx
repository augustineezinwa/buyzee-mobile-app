import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import {
    Button,
    Snackbar,
    Text,
    TextInput,
    useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin } from '../hooks/useAuth';

const { height } = Dimensions.get('window');

const LoginScreen = () => {
    const router = useRouter();
    const loginMutation = useLogin();
    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setSnackbarVisible(true);
            return;
        }

        try {
            await loginMutation.mutateAsync({ email, password });
            router.replace('/(tabs)');
        } catch (error) {
            setSnackbarVisible(true);
            console.error(error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
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
            color: theme.colors.onBackground,
            marginBottom: 8,
        },
        subtitle: {
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
        },
        form: {
            flex: 1,
            justifyContent: 'center',
            paddingBottom: 40,
        },
        input: {
            marginBottom: 20,
            backgroundColor: theme.colors.surface,
        },
        inputOutline: {
            borderColor: theme.colors.outline,
            borderWidth: 1,
        },
        inputContent: {
            fontSize: 16,
        },
        loginButton: {
            marginTop: 12,
            marginBottom: 24,
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
        },
        buttonContent: {
            paddingVertical: 8,
        },
        registerButton: {
            marginTop: 8,
        },
        registerLabel: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 14,
        },
        demo: {
            alignItems: 'center',
            paddingBottom: 40,
        },
        demoCard: {
            backgroundColor: theme.colors.surfaceVariant,
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.outline,
        },
        demoTitle: {
            color: theme.colors.onSurfaceVariant,
            fontWeight: '600',
            marginBottom: 8,
        },
        demoText: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
            fontFamily: 'monospace',
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
                        Welcome Back
                    </Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>
                        Sign in to continue
                    </Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        error={loginMutation.isError && !email}
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry={!showPassword}
                        right={
                            <TextInput.Icon
                                icon={showPassword ? 'eye-off' : 'eye'}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }
                        style={styles.input}
                        outlineStyle={styles.inputOutline}
                        contentStyle={styles.inputContent}
                        error={loginMutation.isError && !password}
                    />

                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        style={styles.loginButton}
                        contentStyle={styles.buttonContent}
                        disabled={loginMutation.isPending}
                        loading={loginMutation.isPending}>
                        Sign In
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => router.push('/register')}
                        style={styles.registerButton}
                        labelStyle={styles.registerLabel}>
                        Don&apos;t have an account? Sign Up
                    </Button>
                </View>

                <View style={styles.demo}>
                    <View style={styles.demoCard}>
                        <Text variant="labelMedium" style={styles.demoTitle}>
                            Demo Account
                        </Text>
                        <Text variant="bodySmall" style={styles.demoText}>
                            user@example.com
                        </Text>
                        <Text variant="bodySmall" style={styles.demoText}>
                            password
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={styles.snackbar}>
                {loginMutation.error?.message || 'Please fill in all fields'}
            </Snackbar>
        </SafeAreaView>
    );
};

export default LoginScreen;