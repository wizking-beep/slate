import "react-native-reanimated";
import {Drawer} from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/theme";
import Sidebar from "@/components/common/sidebar";
import {Pencil,Archive,Trash,Settings} from "lucide-react-native"
import useStorage from "@/stores/storage";

const RootLayout = () => {
  const { colors } = useTheme();
  const {initialiseStorage} = useStorage();

  //initilising the two directories
  initialiseStorage();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
     <Drawer
     drawerContent={(props)=>(
      <Sidebar {...props}/>
     )}
     screenOptions={{
      headerShown:true,
      headerRight:()=>(<View style={{width:40,height:40,backgroundColor:colors.primaryContainer,borderRadius:20,marginRight:10}}/>),
      headerTitle:() => null,
      drawerType:"front",
      drawerActiveTintColor:colors.primaryContainer,
      drawerActiveBackgroundColor:colors.onPrimaryContainer,
     }}
     >
      <Drawer.Screen
      name="index"
      options={{drawerLabel:"Write",
        drawerIcon:({color,size})=>(
          <Pencil color={color} size={size} />
        )
      }}
      />
      <Drawer.Screen
      name="archive"
      options={{drawerLabel:"Archived",
        drawerIcon:({color,size})=>(
          <Archive color={color} size={size} />
        )}}
      />
      <Drawer.Screen
      name="account"
      options={{drawerLabel:"Settings",
        drawerIcon:({color,size})=>(
          <Settings color={color} size={size} />
        )}}
      />
      <Drawer.Screen
      name="trash"
      options={{drawerLabel:"Trash",
        drawerIcon:({color,size})=>(
          <Trash color={color} size={size} />
        )}}
      />
     </Drawer>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});