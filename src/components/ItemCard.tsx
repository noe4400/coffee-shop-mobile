import { Text, View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native-unistyles'

type ItemCardProps = {
    item: {
        name: string;
        price: string;
    }
}

const ItemCard = ({item}: ItemCardProps) => {
  return (
    <View style={styles.container}>
        <View style={styles.image} />
        <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
            <Text style={{fontSize: 14, color: '#888'}}>{item.price}</Text>
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
    image: {
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        width: '100%',
        height: 128,
    }
}))

