import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import VehicleForm from '../screens/VehicleForm';

export type RootStackParamList = {
  Home: undefined;
  VehicleForm: { vehicle?: any } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'RevisaCar' }}
        />
        <Stack.Screen
          name="VehicleForm"
          component={VehicleForm}
          options={({ route }) => ({ 
            title: route.params?.vehicle ? 'Editar Veículo' : 'Cadastrar Veículo' 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
