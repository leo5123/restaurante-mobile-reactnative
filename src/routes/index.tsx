import React, { useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'


export default function Routes() {
    const { isAuthenticated, loading } = useContext(AuthContext)
    
   
    
    if(loading){
        return (
            <View style={{
            flex: 1,
            backgroundColor: '#1D1D2E',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size={60} color='white'></ActivityIndicator>
        </View>)
    }

    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

