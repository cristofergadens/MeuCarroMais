import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors, spacing, borderRadius, typography } from '../styles/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="car-wrench" size={64} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>RevisaCar</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Faça login para continuar
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]}
          placeholder="Digite seu email"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]}
          placeholder="Digite sua senha"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Não tem uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  label: {
    ...typography.body,
    fontWeight: 'bold',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
    ...typography.body,
  },
  button: {
    padding: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  buttonText: {
    color: 'white',
    ...typography.body,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  linkText: {
    ...typography.body,
  },
}); 