import { Stack as StackRouter } from 'expo-router/stack';
import React from 'react';

export default function AuthLayout() {
    return (
        <StackRouter screenOptions={{ headerShown: false }}>
            <StackRouter.Screen name="login" />
            <StackRouter.Screen name="register" />
        </StackRouter>
    );
} 