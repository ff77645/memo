import React from "react";
import {
    View,
    Text,
} from 'react-native'
import { 
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Record from "../Record";
import CustomDrawerContent from './CustomDrawerContent'


const Drawer = createDrawerNavigator();

export default function Main() {
  return (
    <Drawer.Navigator
        defaultStatus="open"
        screenOptions={{
            headerShown:false,
        }}
        drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="记录" component={Record} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}



function Feed(){
    return(
        <View>
            <Text>Feed</Text>
        </View>
    )
}
function Article(){
    return(
        <View>
            <Text>Article</Text>
        </View>
    )
}
function MyHeader({
    title,
    style,
    openDrawer
}){

    return(
        <View style={[
            style,
            {
                display:'flex',
                flexDirection:'row',
                flexWrap:'nowrap',
                alignItems:'center',
                justifyContent:'space-between',
            }
        ]}>
            <Button onPress={openDrawer}>打开</Button>
            <Text>{title}</Text>
            <View></View>
        </View>
    )
}

