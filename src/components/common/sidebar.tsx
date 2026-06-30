import React from "react";
import { View,Text, StyleSheet, Image,useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import  { DrawerContentScrollView,DrawerItem,DrawerItemList,DrawerContentComponentProps } from "expo-router/drawer";
import useThemeStore from "@/stores/themestore";
import { useTheme } from "@/hooks/theme";
import { Hash } from "lucide-react-native";
import Icon from "@/assets/images/icon.png"

type Categories = {
  id:number,
  label:string,
  total:number,
}

const Sidebar = ({navigation, state, descriptors}: DrawerContentComponentProps) => {

  const {toggleTheme} = useThemeStore();
  const insets = useSafeAreaInsets();

 const categoryColors = [
  "#ffadad",
  "#ffd29d",
  "#fff194",
  "#bbf3b3",
  "#96effa",
  "#a0c4ff",
  "#bdb2ff",
  "#ffaef7",
  "#f1f2f6"
];

  const categories:Categories[] = [
    {
      id:1,
      label:"Personal",
      total:5
    },
    {
      id:2,
      label:"Work",
      total:2,
    },
    {
      id:3,
      label:"Tasks",
      total:7,
    },
    {
      id:4,
      label:"Logs",
      total:2,
    },
    {
      id:5,
      label:"Ideas",
      total:2,
    },
    {
      id:6,
      label:"Vault",
      total:2,
    }
  ]
    
  

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
      <View style={styles.profileSection}>
       <Image 
       source={Icon}
       style={{
        alignSelf:"flex-start",
        width:100,
        height:100
       }}
       />
       <View style={styles.profileContent}>

       </View>

      </View>
      <DrawerItemList {...{navigation,state,descriptors}}/>
      
      {
        categories.map((category,index)=>(
          <DrawerItem 
          key={category.id}
          label={category.label}
          icon={({size})=>(
            <Hash color={categoryColors[index]} size={size} />
          )}
          labelStyle={{
            color:categoryColors[index]
          }}
          onPress={handlePress}
          />
        ))
      }

      <View style={styles.settingsSection}>

      </View>
    </DrawerContentScrollView>
  )
}

export default Sidebar;

const styles = StyleSheet.create({
  container:{
    flexGrow:1,
  },
  profileSection:{
    height:"20%",
    borderRadius:9,
    marginBottom:10,
    display:"flex",
    padding:9,
    justifyContent:"center",
    alignContent:"center",
    backgroundColor:"red"
  },
  profileContent:{
    alignSelf:"flex-end",
    backgroundColor:"yellow"
  },
  settingsSection:{
    height:200,
    borderRadius:9,
    marginTop:10,
    display:"flex",
    padding:9,
    justifyContent:"center",
    alignContent:"center",
    backgroundColor:"blue"
  }
})