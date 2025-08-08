import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors, spacing, borderRadius, typography } from '../styles/theme';
import Feather from '@expo/vector-icons/Feather';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>
      
      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Aparência</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Feather 
              name={theme === 'dark' ? 'moon' : 'sun'} 
              size={20} 
              color={colors.textSecondary} 
            />
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Modo Escuro
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                {theme === 'dark' ? 'Ativado' : 'Desativado'}
              </Text>
            </View>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Sobre</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Feather name="info" size={20} color={colors.textSecondary} />
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Versão do App
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                1.0.0
              </Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Feather name="help-circle" size={20} color={colors.textSecondary} />
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Ajuda
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                Como usar o app
              </Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textMuted} />
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
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
  },
  section: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...typography.h3,
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    fontWeight: '500',
  },
  settingDescription: {
    ...typography.caption,
    marginTop: 2,
  },
}); 