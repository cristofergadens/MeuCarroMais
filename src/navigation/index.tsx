import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { getThemeColors } from '../styles/theme';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import VehicleForm from '../screens/VehicleForm';
import Settings from '../screens/Settings';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  VehicleForm: { vehicle?: any } | undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const colors = getThemeColors(theme);

  if (loading) {
    // Você pode criar uma tela de loading aqui
    return null;
  }

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
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ 
                title: 'Login',
                headerShown: false 
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ 
                title: 'Criar Conta',
                headerShown: false 
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
