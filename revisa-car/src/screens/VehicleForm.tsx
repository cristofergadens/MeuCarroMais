import { useState, useEffect } from "react";
import { Alert, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { RootStackParamList } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleForm'>;

export default function VehicleForm({ navigation, route }: Props) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [vehicleId, setVehicleId] = useState<number | null>(null);

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

    <View style={styles.container}>
      <View style={styles.form}>
      <Text style={styles.label}>Marca</Text>
      <TextInput value={marca} onChangeText={setMarca} style={styles.input} />

      <Text style={styles.label}>Modelo</Text>
      <TextInput value={modelo} onChangeText={setModelo} style={styles.input} />

      <Text style={styles.label}>Ano</Text>
      <TextInput value={ano} onChangeText={setAno} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Quilometragem</Text>
      <TextInput value={quilometragem} onChangeText={setQuilometragem} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Placa</Text>
      <TextInput value={placa} onChangeText={setPlaca} style={styles.input} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
        <Text style={styles.saveButtonText}>Cadastrar veículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: 4,
  },
  form: {
    flex: 1
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#3ba4d8',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});