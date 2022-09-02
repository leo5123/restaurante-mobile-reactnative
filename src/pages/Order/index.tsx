import React, { useEffect, useState } from "react";
import { View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList


} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";
import { responseEncoding } from "axios";

import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { StackParamsList } from '../../routes/app.routes'

type RouteDetailParams = {
    Order: {
        number: string | number,
        order_id: number
    }
}

export type CategoryProps = {
    id: string,
    name: string;
}

type RouterOrderProps = RouteProp<RouteDetailParams, 'Order'>;

type ProductProps = {
    id: string,
    name: string
}

type ItemProps = {
    id: string,
    product_id: string,
    name: string,
    amount: string | number
}

export default function Order(){


    const route = useRoute<RouterOrderProps>()
    const navigations = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [product, setProduct] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<CategoryProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)


    const [amount, setAmount] = useState('1')
    const [items, setItems]= useState<ItemProps[]>([])


    useEffect(() => {
        async function loadInfo(){
            const response = await api.get('/categorylist')

            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo()
    }, [])

    useEffect(() => {

        async function loadProducts(){
            const response = await api.get('/productlisting', {
                params:{
                    id_category: categorySelected?.id
                }
            })
        
        setProduct(response.data)
        setProductSelected(response.data[0])
        
        }

        loadProducts()

    }, [categorySelected])

    async function handleCloseOrder(){
        console.log(route.params.order_id);
        

        try {
            await api.delete('/removeorder', {
                params:{
                    id: route.params.order_id
                }
            })

            navigations.goBack()
        } catch (error) {
            console.log(error);
            
        }
    }

    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    function handleChangeProduct(item: ProductProps){
        setProductSelected(item)
    }

    async function handleAdd(){
        const response = await api.post('/order/add', {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id){
        await api.delete('/order/remove',{
            params:{
                id: item_id
            }
        })

        let removeItem = items.filter( item => {
            return (item.id !== item_id)
        })

        setItems(removeItem)

    }

    function handleFinishOrder(){
       navigations.navigate("FinishOrder", {
        number: route.params?.number,
        order_id: route.params?.order_id
        })
    }

    return(
        <View style={styles.container}>
            
            <View style={styles.header}>

            <Text style={styles.title}>
                Mesa {route.params.number}
            </Text>
            { items.length == 0 && (
                <TouchableOpacity style={styles.trashButton} onPress={handleCloseOrder}>
                <Feather name='trash-2' size={25} color='#FF3F4b'/>
    
                </TouchableOpacity>
            )}

            </View>

            
            {category.length !== 0 && (
                <TouchableOpacity style={styles.button} onPress={() => setModalCategoryVisible(true)}>
                <Text style={styles.buttonText}>
                    {categorySelected?.name} 
                    </Text>
                </TouchableOpacity>
            )}

            {product.length != 0 && (
                <TouchableOpacity style={styles.button} onPress={() => setModalProductVisible(true)}>
                <Text style={styles.buttonText}>
                
                {productSelected?.name}</Text>
                
                </TouchableOpacity>
            )}

            <View style={styles.secondContainer}>
            <Text style={styles.inputText}> Quantidade </Text>
            <TextInput style={styles.input}
            placeholderTextColor='#F0F0F0'
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            >

            </TextInput>
            </View>
                <View style={styles.buttonContainer} >
                    <TouchableOpacity onPress={ handleAdd }>
                        <Text style={styles.buttonAdd}>+</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    disabled={items.length == 0}
                    style={[{ opacity: items.length == 0 ? 0.3 : 1}]}
                    onPress={handleFinishOrder}
                    >
                        <Text style={styles.buttonNext}>
                            Avançar</Text>
                    </TouchableOpacity>
                </View>
            
                <FlatList showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24}}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={ ({item}) => <ListItem data={item} deleteItem={handleDeleteItem}/>}
                />

                <Modal
                    transparent={true}
                    visible={modalCategoryVisible}
                    animationType="fade"
                >
                    <ModalPicker
                        handleCloseModal={ () => setModalCategoryVisible(false)}
                        options={category}
                        selectedItem={ handleChangeCategory }
                    />

                </Modal>

                <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType={"fade"}
                >
                    
                    <ModalPicker
                        handleCloseModal={ () => setModalProductVisible(false)}
                        options={product}
                        selectedItem={ handleChangeProduct }
                    />

                </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingStart: 20,
        paddingVertical: 50
    },
    title:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
        marginRight: 10,
        
    },
    header:{
        flexDirection: 'row',
        marginBottom: 10
        
    },
    trashButton:{
        marginTop: 4
    },
    button:{
        backgroundColor: '#101026',
        paddingTop: 10,
        paddingBottom: 12,
        marginBottom: 10,
        width: '90%',
        borderRadius: 3
        
    },
    buttonText:{
        color:'white',
        paddingStart: 5
    },
    secondContainer:{
        flexDirection: 'row',
        width: '90%',
        borderRadius: 3
    },
    input:{
        backgroundColor: '#101026',
        width: '62%',
        borderRadius: 3,
        textAlign: 'center',
        color: 'white',
        paddingTop: 3,
        paddingBottom: 4,
        fontSize: 18,
        marginBottom: 20
        
    },
    inputText:{
        marginRight: 13,
        marginTop: 3,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        
    },
    buttonContainer:{
        flexDirection:'row'
    },
    buttonAdd:{
        backgroundColor: '#3fd1ff',
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 40,
        paddingLeft: 40,
        marginRight: 20,
        borderRadius: 3,
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white'
    },
    buttonNext:{
        backgroundColor: '#3fffa3',
        color: '#101026',
        paddingRight: 82,
        paddingLeft: 81,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 3,
        fontWeight: 'bold',
        fontSize: 15
    }
})