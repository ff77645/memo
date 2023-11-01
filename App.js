/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {activateKeepAwakeAsync} from 'expo-keep-awake'
import { useConfig } from './src/hooks';
import { usePreventScreenCapture,addScreenshotListener,preventScreenCaptureAsync } from 'expo-screen-capture'

import Animation from './src/pages/Animation'
import Home from './src/pages/Home'
import HomeTabs from './src/pages/HomeTabs'
import AddRecord from "./src/pages/AddRecord"
import Main from './src/pages/Main';
import RecordAdd from './src/pages/RecordAdd';
import TagManage from './src/pages/TagManage';
import Setting from './src/pages/Setting';

const RootStack = createNativeStackNavigator()
const routes = [
  {
    name: 'Main',
    component: Main,
    options: {
      headerShown: false
    }
  },
  {
    name: 'Setting',
    component: Setting,
    options: {
      headerShown: false
    }
  },
  {
    name: 'RecordAdd',
    component: RecordAdd,
    options: {
      headerShown: false
    }
  },
  {
    name: 'TagManage',
    component: TagManage,
    options: {
      headerShown: false
    }
  },
  {
    name: 'HomeTabs',
    component: HomeTabs,
    options: {
      headerShown: false
    }
  },
  {
    name: 'AddRecord',
    component: AddRecord,
    options: {
      headerShown: false,
    }
  },
  {
    name: 'Home',
    component: Home,
    options: {
      title: 'Home',
      headerTitleAlign: 'center'
    }
  },
  {
    name: 'Animation',
    component: Animation,
    options: {
      title: 'Animation',
      headerTitleAlign: 'center',
      headerShown: false
    }
  },
]
function App() {
  const [appCofnig] = useConfig()

  useEffect(()=>{
    if(!appCofnig.allowScreenshot){
      preventScreenCaptureAsync('blobal')
      const subscription = addScreenshotListener(()=>{
        console.log('截图了截图了');
      })
      return ()=>subscription.remove()
    }
  },[])
  
  activateKeepAwakeAsync('gobal')
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Main"
      >
        {
          routes.map(route => (
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
