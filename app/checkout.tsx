import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function CheckoutScreen() {
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>
                Checkout
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
                Complete your purchase
            </Text>
            <Button mode="contained" style={styles.button}>
                Place Order
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        marginBottom: 8,
    },
    subtitle: {
        textAlign: 'center',
        color: '#757575',
        marginBottom: 24,
    },
    button: {
        width: '100%',
    },
}); 