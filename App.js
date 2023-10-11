/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import React from 'react';
 import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
 import { NavigationContainer} from '@react-navigation/native'
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 
 
 import Home from './src/pages/Home'
 import Animation from './src/pages/Animation'
 import Main from './src/pages/Main'
 
 const RootStack = createNativeStackNavigator()
 
 function App() {
 
   const routes = [
     {
       name:'Main',
       component:Main,
       options:{
         headerShown:false
       }
     },
     {
       name:'Home',
       component:Home,
       options:{
         title: 'Home',
         headerTitleAlign:'center'
       }
     },
     {
       name:'Animation',
       component:Animation,
       options:{
         title: 'Animation',
         headerTitleAlign:'center',
         headerShown:false
       }
     },
   ]
 
   return (
     <NavigationContainer>
       <RootStack.Navigator
         initialRouteName="Main"
       >
           {
             routes.map(route=>(
               <RootStack.Screen 
                 name={route.name}
                 component={route.component}
                 options={route.options}
                 key={route.name}
               />
             ))
           }
       </RootStack.Navigator>
     </NavigationContainer>
   );
 }
 
 export default App;
 