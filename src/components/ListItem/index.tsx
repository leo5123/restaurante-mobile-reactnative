import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'

interface ItemProps {
    data: {
    id: string,
    product_id: string,
    name: string,
    amount: string | number
    },
    deleteItem: (item_id: string) => void
}



export function ListItem({ data, deleteItem }: ItemProps){
    
    async function handleDeleteItem(){
        deleteItem(data.id)
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                {data.amount} - {data.name}
            </Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name='trash-2' color="#FF3F4B" size={20}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: '#101026',
        width: '89.5%',
        borderRadius: 4  ,
        padding: 13,
        marginBottom: 10,
        marginTop: 7,
        borderWidth: 1,
        borderColor: '#8a8a8a'       
        
    },
    text:{
        fontSize: 15,
        paddingRight: 160,
        color: 'white'
    }
})