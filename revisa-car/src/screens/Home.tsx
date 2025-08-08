import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
 return (
  <View style={styles.container}>
    <Text>Bem-vindo ao RevisaCar</Text>
    <Text>Para começar, cadastre seu veículo</Text>
    <Button title="Cadastrar Veículo" onPress={() => navigation.navigate('VehicleForm')} />
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
});