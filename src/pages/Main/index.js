import React from "react";
import { Text, View,StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Note from '../Note'
import TodoList from "../TodoList";
import Icon from 'react-native-vector-icons/Ionicons'
  
const Tab = createBottomTabNavigator();
  
const styles = StyleSheet.create({
    iconStyle: {
      fontFamily: 'iconfont',
      textAlign: 'center',
      fontSize:20
    },
});

export default function Main() {
    return (
        <Tab.Navigator
            screenOptions={({route})=>({
                headerShown:false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({focused, color, size}) => {
                  const name = route.name === 'Note' ? 'reader' : 'checkmark-circle'
                  return <Icon name={name} style={[styles.iconStyle,{color}]}></Icon>;
                },
            })}
        >
            <Tab.Screen name="Note" component={Note} options={{tabBarLabel:'笔记'}} />
            <Tab.Screen name="TodoList" component={TodoList} options={{tabBarLabel:'待办'}} />
        </Tab.Navigator>
    );
}