import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {APP_SCREEN, RootStackParamList} from './screen-type';
import {ProfileScreen} from '../screens';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import GameOverScreen from '../screens/GameOverScreen';
import AboutScreen from '../screens/AboutScreen';

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigations: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={APP_SCREEN.HOME}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={APP_SCREEN.HOME}
          component={HomeScreen}
          options={{ title: 'Memory Match' }}
        />
        <Stack.Screen
          name={APP_SCREEN.GAME}
          component={GameScreen}
          options={{ title: 'Game' }}
        />
        <Stack.Screen
          name={APP_SCREEN.GAME_OVER}
          component={GameOverScreen}
          options={{ title: 'Game Over' }}
        />
        <Stack.Screen
          name={APP_SCREEN.ABOUT}
          component={AboutScreen}
          options={{ title: 'About' }}
        />
        <Stack.Screen name={APP_SCREEN.PROFILE} component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
