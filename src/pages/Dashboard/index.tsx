import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import {AuthContext} from '../../contexts/AuthContext'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { api } from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

export default function Dashboard(){

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [number, setNumber] = useState('')

    async function handleTable() {
        
        if(number == ''){
            return
        }
        
        const response = await api.post('/order', {
            table: Number(number)
        })

        
        

        navigation.navigate('Order', {number: number, order_id: response.data.id})
        
        setNumber('')
        
        
    }

    const { signOut } = useContext(AuthContext)
    return(
        
            <SafeAreaView style={styles.container}>
               
                <Text style={styles.title}>Novo pedido</Text>
                <TextInput
                placeholder='Número da mesa'
                placeholderTextColor='#F0F0F0'
                style={styles.input}
                value={number}
                onChangeText={(e) => {setNumber(e)}}
                ></TextInput>
                <TouchableOpacity 
                style={styles.button}
                onPress={handleTable}
                >
                    <Text style={{ fontWeight: 'bold'}}>
                        Abrir mesa
                    </Text>
                </TouchableOpacity>
               
            </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'

    },
    title:{
         fontSize: 30,
         color: '#FFF',
         fontWeight: 'bold',
         marginBottom: 15
    },
    button:{
        backgroundColor: '#3fffa3',
        width: '80%',
        alignItems: 'center',
        padding: 8,
        borderRadius: 4,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: '#101026',
        width: '80%',
        padding: 10,
        borderRadius: 4,
        color:'#FFF',
        marginBottom: 15,
        borderColor: 'grey',
        borderWidth: 1
        
    },

})