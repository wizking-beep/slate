import React from "react";
import { View,Text, StyleSheet } from "react-native";
import  { DrawerContentScrollView,DrawerItem,DrawerItemList,DrawerContentComponentProps } from "expo-router/drawer";

const Sidebar = ({navigation, state, descriptors}: DrawerContentComponentProps) => {

  const handlePress = () => {
    console.log("navigate to")
  }

  return (
    <DrawerContentScrollView 
    {...{navigation,state,descriptors}}
    contentContainerStyle={styles.container}>
      <DrawerItemList {...{navigation,state,descriptors}}/>
      <DrawerItem 
      label={"Categories"}
      onPress={handlePress}/>
    </DrawerContentScrollView>
  )
}

export default Sidebar;

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})