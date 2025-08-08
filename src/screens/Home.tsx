import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors, spacing, borderRadius, typography } from "../styles/theme";

import Feather from '@expo/vector-icons/Feather';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Vehicle = {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  quilometragem: number;
  placa: string;
};

export default function Home({ navigation }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const getVehicles = async (): Promise<Vehicle[]> => {
    const data = await AsyncStorage.getItem('@veiculos');
    if (data) {
      const parsed = JSON.parse(data);
      setVehicles(parsed);
      return parsed;
    }
    return [];
  };

  const updateVehicle = async (updatedVehicle: Vehicle) => {
    const vehicles = await getVehicles();
    const updatedVehicles = vehicles.map((vehicle: Vehicle) =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    );
    await AsyncStorage.setItem("@veiculos", JSON.stringify(updatedVehicles));
  };

  const deleteVehicle = async (id: string) => {
    const vehicles = await getVehicles();
    const updatedVehicles = vehicles.filter(v => v.id !== id);
    await AsyncStorage.setItem("@veiculos", JSON.stringify(updatedVehicles));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getVehicles);
    return unsubscribe;

  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Meus Veículos</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Feather name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {vehicles.length === 0 ? (
        <Text style={[styles.info, { color: colors.textMuted }]}>Nenhum veículo cadastrado</Text>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(vehicle) => vehicle.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.cardInfo}>
                <Text style={[styles.carTitle, { color: colors.text }]}>
                  {item.marca} {item.modelo} - ({item.ano})
                </Text>
                <Text style={[styles.carInformation, { color: colors.textSecondary }]}>
                  Quilometragem: {item.quilometragem} km - Placa: {item.placa}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => navigation.navigate('VehicleForm', { vehicle: item })}>
                  <Feather 
                    name="edit" 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteVehicle(item.id)}>
                  <Feather name="trash-2" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity 
        style={[styles.newCarButton, { backgroundColor: colors.primary }]} 
        onPress={() => navigation.navigate('VehicleForm')}
      >
        <Text style={styles.newCarButtonText}>Cadastrar veículo</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  info: {
    textAlign: 'center',
    marginVertical: spacing.lg,
    ...typography.body,
  },
  card: {
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  cardInfo: {
    flex: 1,
  },
  cardActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  carTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  carInformation: {
    ...typography.caption,
  },
  newCarButton: {
    padding: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  newCarButtonText: {
    color: 'white',
    ...typography.body,
    fontWeight: 'bold',
  }
});