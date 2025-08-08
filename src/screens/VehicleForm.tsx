import { useState, useEffect } from "react";
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors, spacing, borderRadius, typography } from "../styles/theme";

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleForm'>;

export default function VehicleForm({ navigation, route }: Props) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [vehicleId, setVehicleId] = useState<number | null>(null);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  useEffect(() => {
    if (route.params?.vehicle) {
      const vehicle = route.params.vehicle;

      setMarca(vehicle.marca);
      setModelo(vehicle.modelo);
      setAno(vehicle.ano.toString());
      setPlaca(vehicle.placa);
      setQuilometragem(vehicle.quilometragem.toString());
      setVehicleId(vehicle.id);
      setIsEditing(true);
    }
  }, [route.params]);

  const handleSalvar = async () => {
    if (!marca || !modelo || !ano || !quilometragem || !placa) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novoVeiculo = {
      id: isEditing ? vehicleId : Date.now(),
      marca,
      modelo,
      ano: parseInt(ano),
      quilometragem: parseInt(quilometragem),
      placa,
    };

    try {
      const data = await AsyncStorage.getItem('@veiculos');
      const lista = data ? JSON.parse(data) : [];

      if (isEditing) {
        const updatedList = lista.map((vehicle: any) =>
          vehicle.id === vehicleId ? novoVeiculo : vehicle
        );
        await AsyncStorage.setItem('@veiculos', JSON.stringify(updatedList));
        Alert.alert('Sucesso', 'Veículo atualizado com sucesso.');
      } else {
        lista.push(novoVeiculo);
        await AsyncStorage.setItem('@veiculos', JSON.stringify(lista));
        Alert.alert('Sucesso', 'Veículo salvo com sucesso.');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar veículo.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Marca</Text>
        <TextInput 
          value={marca} 
          onChangeText={setMarca} 
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]} 
        />

        <Text style={[styles.label, { color: colors.text }]}>Modelo</Text>
        <TextInput 
          value={modelo} 
          onChangeText={setModelo} 
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]} 
        />

        <Text style={[styles.label, { color: colors.text }]}>Ano</Text>
        <TextInput 
          value={ano} 
          onChangeText={setAno} 
          keyboardType="numeric" 
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]} 
        />

        <Text style={[styles.label, { color: colors.text }]}>Quilometragem</Text>
        <TextInput 
          value={quilometragem} 
          onChangeText={setQuilometragem} 
          keyboardType="numeric" 
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]} 
        />

        <Text style={[styles.label, { color: colors.text }]}>Placa</Text>
        <TextInput 
          value={placa} 
          onChangeText={setPlaca} 
          style={[styles.input, { 
            borderColor: colors.border, 
            backgroundColor: colors.surface,
            color: colors.text 
          }]} 
        />
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, { backgroundColor: colors.primary }]} 
        onPress={handleSalvar}
      >
        <Text style={styles.saveButtonText}>
          {isEditing ? "Atualizar" : "Cadastrar veículo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
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
  form: {
    flex: 1
  },
  saveButton: {
    padding: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  saveButtonText: {
    color: 'white',
    ...typography.body,
    fontWeight: 'bold',
  }
});