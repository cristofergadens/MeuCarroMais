import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation";
import { useEffect, useState } from "react";

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
    <View style={styles.container}>
      <Text style={styles.title}>Meus Veículos</Text>

      {vehicles.length === 0 ? (
        <Text style={styles.info}>Nenhum veículo cadastrado</Text>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(vehicle) => vehicle.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.carTitle}>
                  {item.marca} {item.modelo} - ({item.ano})
                </Text>
                <Text style={styles.carInformation}>Quilometragem: {item.quilometragem} km - Placa: {item.placa}</Text>
              </View>
              <View style={styles.cardActions}>
                <Feather 
                  name="edit" 
                  size={20} 
                  color="gray" 
                  onPress={() => navigation.navigate('VehicleForm', { vehicle: item })}
                />
                <Feather name="trash-2" size={20} color="red" onPress={() => deleteVehicle(item.id)}/>

              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity 
        style={styles.newCarButton} 
        onPress={() => navigation.navigate('VehicleForm')}
      >
        <Text style={styles.newCarButtonText}>Cadastrar veículo</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#777',
  },
  card: {
    backgroundColor: '#fefefe',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  cardInfo: {

  },
  cardActions: {
    flexDirection: "row",
    gap: 6
  },
  carTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  carInformation: {
    color: '#555',
  },
  newCarButton: {
    padding: 15,
    backgroundColor: '#3ba4d8',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  newCarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});