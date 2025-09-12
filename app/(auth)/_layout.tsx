import { Stack as StackRouter } from 'expo-router/stack';
import React from 'react';

export default function AuthLayout() {
    return (
        <StackRouter
            screenOptions={{ headerShown: false }}
            initialRouteName="intro">
            <StackRouter.Screen name="intro" />
            <StackRouter.Screen name="login" />
            <StackRouter.Screen name="register" />
            <StackRouter.Screen name="login-prompt" />
            <StackRouter.Screen name="signup-intro" />
        </StackRouter>
    );
} 