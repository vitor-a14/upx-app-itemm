import { StyleSheet, Text, View } from 'react-native';
import { LoadScreen } from './telas/load/load_screen';
import { HomeScreen } from './telas/home/home_screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FilterScreen } from './telas/filter/filter_screen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}  options={{
            headerShown: false, // Oculta o cabeçalho na tela "Home"
          }}/>
      <Stack.Screen name="Details" component={LoadScreen}  options={{
            headerShown: false, // Oculta o cabeçalho na tela "Home"
          }}/>

      <Stack.Screen name="FilterScreen" component={FilterScreen}  options={{
      headerShown: false, // Oculta o cabeçalho na tela "Home"
    }}/>
    </Stack.Navigator>
  </NavigationContainer>  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
