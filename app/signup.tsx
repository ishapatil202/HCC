import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function SignUpScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create an Account ✨
      </ThemedText>

      {/* Signup Form */}
      <ThemedView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Sign Up
          </ThemedText>
        </TouchableOpacity>

        {/* Back to Login */}
        <Link href="/" asChild>
          <TouchableOpacity>
            <ThemedText style={styles.linkText}>
              Already have an account? Log In
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1D3D47',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  linkText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#1D3D47',
  },
});
