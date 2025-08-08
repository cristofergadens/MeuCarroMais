import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors, spacing, borderRadius, typography } from '../styles/theme';
import Feather from '@expo/vector-icons/Feather';

export default function SignUp({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Feather name="user-plus" size={64} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Criar Conta</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Cadastre-se para começar
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]}
          placeholder="Digite seu nome"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="words"
        />

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

        <Text style={[styles.label, { color: colors.text }]}>Confirmar Senha</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]}
          placeholder="Confirme sua senha"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Já tem uma conta? Faça login
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