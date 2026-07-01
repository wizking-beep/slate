import React from "react";
import { View,Text, StyleSheet, Image,useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import  { DrawerContentScrollView,DrawerItem,DrawerItemList,DrawerContentComponentProps } from "expo-router/drawer";
import useThemeStore from "@/stores/themestore";
import useStorage from "@/stores/storage";
import { useTheme } from "@/hooks/theme";
import { Hash } from "lucide-react-native";
import Icon from "@/assets/images/icon.png"


const Sidebar = ({navigation, state, descriptors}: DrawerContentComponentProps) => {

  const {toggleTheme} = useThemeStore();
  const insets = useSafeAreaInsets();
  const {categories} = useStorage();

    
  const handlePress = () => {
    console.log("navigate to")
  }

  const {width,height} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <DrawerContentScrollView 
    {...{navigation,state,descriptors}}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={[styles.container,{backgroundColor:colors.background,paddingBottom:insets.bottom}]}>
      <DrawerItemList {...{navigation,state,descriptors}}/>
      
      {
        categories.map((category,index)=>(
          <DrawerItem 
          key={category.id}
          label={category.label}
          icon={({size})=>(
            <Hash color={category.color} size={size} />
          )}
          labelStyle={{
            color:category.color
          }}
          onPress={handlePress}
          />
        ))
      }
    </DrawerContentScrollView>
  )
}

export default Sidebar;

const styles = StyleSheet.create({
  container:{
    flexGrow:1,
  }
})