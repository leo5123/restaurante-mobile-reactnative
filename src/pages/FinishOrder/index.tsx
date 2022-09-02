import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { Route } from 'react-router-dom'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

type RouteDetailParams = {
    FinishOrder: {
        number: string | number;
        order_id: string
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function finishOrder(){
    
    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
    async function handleFinish(){
        try {
           await api.put('/order/send',{
            id: route.params?.order_id
           })

           

           navigation.popToTop()
        } catch (error) {
            console.log("Erro ao finalizar, tenta mais tarde");
            
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.text1}>Mesa {route.params.number}</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleFinish} >
            
            <Text style={styles.buttonText}>Finalizar pedido</Text>
            
            <Feather name="shopping-cart" size={20} color="#1d1d2e" style={styles.photo}/>

        </TouchableOpacity>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    text1:{
        color: '#FFF',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15
    },
    button:{
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 4,
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    photo:{
        paddingTop: 3,
        paddingRight: 20,
        paddingLeft: 10
    }
})