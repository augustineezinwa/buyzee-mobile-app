import { Stack as StackRouter } from 'expo-router/stack';
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useCurrentUser } from "./hooks/useAuth";

export default function Index() {
  const { data: user, isLoading } = useCurrentUser();


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <StackRouter screenOptions={{ headerShown: false }}>
      {user ? (
        <StackRouter.Screen name="(tabs)" />
      ) : (
        <StackRouter.Screen name="(auth)" />
      )}
    </StackRouter>
  );
}



const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});