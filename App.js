import { StyleSheet, Text, View } from 'react-native';
import { LoadScreen } from './telas/load/load_screen';
import { HomeScreen } from './telas/home/home_screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FilterScreen } from './telas/filter/filter_screen';
import IndicatorScreen from './telas/indicatorScreen/IndicatorScreen';
import { Login } from './telas/login/login';
import { Cadastro } from './telas/login/cadastro';

//login
//usuario: User
//senha: 123
import { Avaliacao } from './telas/avaliacao/avaliacao';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ key: 'Login' }}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ key: 'Cadastro' }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ key: 'Home' }}
        />

        <Stack.Screen
          name="Details"
          component={LoadScreen}
          options={{ key: 'Details' }}
        />

        <Stack.Screen
          name="FilterScreen"
          component={FilterScreen}
          options={{ key: 'FilterScreen' }}
        />

        <Stack.Screen
          name="Avaliacao"
          component={Avaliacao}
          options={{ key: 'Avaliacao' }}
        />

        <Stack.Screen
          name="IndicatorScreen"
          component={IndicatorScreen}
          options={{ key: 'IndicatorScreen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
