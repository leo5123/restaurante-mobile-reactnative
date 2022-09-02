import React from 'react'
 

import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, StatusBarStyle  } from 'react-native';
import SignIn from './src/pages/SignIn'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes'

import { AuthProvider } from './src/contexts/AuthContext'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      
        <StatusBar backgroundColor='#1d1d2e' barStyle="light-content" translucent={false} ></StatusBar>
        <Routes/>

      </AuthProvider>
      
    </NavigationContainer>
  ) 
}
