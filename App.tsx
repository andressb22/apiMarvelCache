/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React from 'react';

import {CachedRequestsProvider} from './context/ProxyProvider.tsx';
import Login from './page/Login.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeroesList from './page/HeroesList.tsx';
import DetailsHero from './page/DetailsHero.tsx';
import {MAXRESULTPERPAGE} from './const.js';
import {UserProvider} from './context/userContext.tsx';
import Header from './page/Header.tsx';

type RootStackParamList = {
  Login: undefined;
  Heroes: undefined;
  HeroeDetails: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <UserProvider>
        <CachedRequestsProvider
          maxResultsPerPage={MAXRESULTPERPAGE}
          url={'https://gateway.marvel.com/v1/public/characters'}>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{header: () => <Header />}}
              name="Heroes"
              component={HeroesList}
            />
            <Stack.Screen
              options={{header: () => <Header />}}
              name="HeroeDetails"
              component={DetailsHero}
            />
          </Stack.Navigator>
        </CachedRequestsProvider>
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;
