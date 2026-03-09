import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native-unistyles'
import { MenuItem } from '@/types'
import { useCart } from '@/context/CartContext'

type ItemCardProps = {
    item: MenuItem
}

const ItemCard = ({item}: ItemCardProps) => {
    const { addItem } = useCart();
  return (
    <View style={styles.container}>
        <View style={styles.image} />
        <View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.rowContainer}>
            <Text style={styles.price}>${item.price}</Text>
            <Pressable style={styles.button} onPress={() => addItem(item)}>
                <Text style={styles.buttonLabel}>+</Text>
            </Pressable>
        </View>
        </View>

    </View>
  )
}

export default ItemCard

const styles = StyleSheet.create(theme=>({
    container: {
        width: 156,
        backgroundColor: theme.colors.surface.white,
        padding: 12,
        borderRadius: 16,
    },
    name: {
        fontSize: 16,
        fontFamily: 'Sora_600SemiBold',
        color: theme.colors.grey.normal,

    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button:{
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLabel: {
        color: theme.colors.surface.white,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        fontFamily: 'Sora_600SemiBold',
        color: theme.colors.grey.darkActive,
    },
    image: {
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        width: '100%',
        height: 128,
    }
}))

