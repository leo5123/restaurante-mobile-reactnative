import React, { useState, useContext } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'

export default function SignIn(){
   const { signIn, loadingAuth } = useContext(AuthContext)
   
    const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')


   async function handleButton(){
    if(email === '' || password === ''){
        return
    }

    await signIn({email, password})
   }
   
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Login:
            </Text>
            
                <TextInput style={styles.input} 
                placeholderTextColor='#f8f8f8' 
                placeholder='Digite seu email'
                value={email}
                onChangeText={(e) => {setEmail(e)}}
                >

                </TextInput>
                
                <TextInput style={styles.input} 
                secureTextEntry={true}
                placeholderTextColor='#f8f8f8'
                 placeholder='Digite sua senha'
                 value={password}
                onChangeText={(e) => {setPassword(e)}}
                 >

                 </TextInput>
                
                <TouchableOpacity 
                style={styles.button}
                onPress={handleButton}
                >
                    { loadingAuth ? (
                        <ActivityIndicator size={25} color={'#FFF'}></ActivityIndicator>
                    ) : (
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#101026'}}>
                    Acessar
                        
                    </Text>
                    )}
                    
                    </TouchableOpacity>
                    
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },
    input:{
        
        backgroundColor: '#101026',
        marginTop: 10,
        width: '75%',
        borderRadius: 3,
        color: 'white',
        paddingLeft: 10,
        padding: 7
        
        
    },
    title:{
        color: '#FF3F48',
        fontSize: 25,
        marginBottom: 20,
        fontWeight:'bold'
        
    },
    button:{
        backgroundColor: '#3fffa3',
        width: '75%',
        marginTop: 10,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 3,
        alignItems: 'center',
        
        
        

    }
})