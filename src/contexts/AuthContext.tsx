import React, { createContext, ReactNode, useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from '../services/api'

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void> 
    loadingAuth: boolean,
    loading: boolean,
    signOut: () => Promise<void>
}

type UserProps = {
    id: string,
    name: string,
    token: string,
    email: string,
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
    children: ReactNode
}

type SignInProps = {
    email: string,
    password: string
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState({
        id: '',
        name: '',
        token: '',
        email: '',
    
    })
    
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getUser() {
            
            const userInfo = await AsyncStorage.getItem('@token')
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    email: hasUser.email,
                    token: hasUser.token,
                    name: hasUser.name
                })
                
                
            }
            setLoading(false)
        }

        getUser()
    },[])

    const isAuthenticated = !!user.name
    
    async function signIn({email, password}: SignInProps){
        setLoadingAuth(true)
       try {
       
        const response = await api.post('/session', {
        email,
        password
       })
       
       const { id, name, token } = response.data

       const data = {
        ...response.data
       }

       await AsyncStorage.setItem('@token', JSON.stringify(data))

       api.defaults.headers.common['Authorization'] = `Bearer ${token}`

       
       setUser({ 
        id,
        name,
        token,
        email
       })

       setLoadingAuth(false)

       } catch (error) {
        console.log('Erro ao conectar', error)
        setLoadingAuth(false)
        
        
       }
    }

    async function signOut() {
        await AsyncStorage.clear().then(
            () => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: ''
                })
            }
        )


    }

    

    return (
    <AuthContext.Provider 
    value={{
        user, 
        isAuthenticated, 
        signIn, 
        loading, 
        loadingAuth,
        signOut
        
        }}>
        {children}
    </AuthContext.Provider>
    )
}