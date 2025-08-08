import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/theme';

import Home from '../screens/Home';
import VehicleForm from '../screens/VehicleForm';
import Settings from '../screens/Settings';

export type RootStackParamList = {
  Home: undefined;
  VehicleForm: { vehicle?: any } | undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            color: colors.text,
          },
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
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
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Configurações' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
