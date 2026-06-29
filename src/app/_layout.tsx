import "react-native-reanimated";
import { Stack } from "expo-router";
import {Drawer} from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/theme";
import Sidebar from "@/components/home/sidebar";

const RootLayout = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
     <Drawer
     drawerContent={(props)=>(
      <Sidebar {...props}/>
     )}
     screenOptions={{
      headerShown:true,
      drawerType:"front"
     }}
     >
      <Drawer.Screen
      name="index"
      options={{drawerLabel:"Primary"}}
      />
      <Drawer.Screen
      name="archive"
      options={{drawerLabel:"Archived"}}
      />
      <Drawer.Screen
      name="account"
      options={{drawerLabel:"Settings"}}
      />
      <Drawer.Screen
      name="trash"
      options={{drawerLabel:"Trash"}}
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