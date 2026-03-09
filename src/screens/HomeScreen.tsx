import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native-unistyles'
import ItemCard from '@/components/ItemCard'
import { useMenuItems } from '@/hooks/useMenuItems'


const HomeScreen = () => {
 const { data:MenuItems, isLoading }  = useMenuItems();
  const [selected, setSelected] = React.useState("All Coffee");
  
   const renderItem = ({ item, idx }) => {
    const isSelected = item === selected;

    return (
      <Pressable
        onPress={() => setSelected(item)}
        style={[
          styles.item(isSelected, idx === 0),
        ]}
      >
        <Text
          style={[
            styles.itemText(isSelected),
          ]}
        >
          {item}
        </Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList 
        data={["All Coffee", "Espresso", "Cappuccino", "Latte", "Mocha" ]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        style={{flexGrow: 0}}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={MenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({item})=><ItemCard item={item}/>}
        columnWrapperStyle={{
        gap: 12
        }}  
        contentContainerStyle={{
        padding: 16,
        gap: 12
        }}
        style={{flexGrow: 0, marginHorizontal: 'auto'}}
        showsVerticalScrollIndicator={false}
        numColumns={2}

      />
    </View>
  )
}


const styles = StyleSheet.create((theme, rt)=>({
  container: {
    flex: 1,
    marginTop: rt.insets.top,

  },
  item: (isSelected, isFirtItem) => ( {
    height: 29,
    backgroundColor: isSelected ? theme.colors.primary : 'transparent',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: isFirtItem ? 0 : 8,
  } ),
  itemText: (isSelected) => ({
    color: isSelected ? theme.colors.surface.white : theme.colors.grey.normal,
    fontFamily: 'Sora-Regular',
    fontSize: 14
  }),
}))

export default HomeScreen