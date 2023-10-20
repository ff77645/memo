import React from "react";
import { 
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import DrawerItemGrounp from "./DrawerItemGrounp";
import { View,Text } from "react-native";


export default function DrawerContent(props) {
  const {
    state,
    navigation,
    descriptors,
  } = props

  const grounps = {}

  state.routes.forEach((route,index)=>{
    const options = descriptors[route.key].options
    route.index = index
    const {
      title
    } = options
    if(grounps[title]){
      grounps[title].push(route)
    }else{
      grounps[title] = [route]
    }
  })
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          padding:20,
        }}
      >
        <Text style={{fontSize:20,color:'#000',textAlign:'center'}}>My Passwords</Text>
      </View>
      {
        Object.values(grounps).map((routes,index)=>(
          <DrawerItemGrounp key={index} state={{...state,routes}} navigation={navigation} descriptors={descriptors}></DrawerItemGrounp>
        ))
      }
    </DrawerContentScrollView>
  );
}