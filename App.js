import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { 
  AppState,
} from 'react-native';
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {activateKeepAwakeAsync} from 'expo-keep-awake'
import { useConfig } from './src/hooks';
import { preventScreenCaptureAsync,allowScreenCaptureAsync } from 'expo-screen-capture'

import Animation from './src/pages/Animation'
import Home from './src/pages/Home'
import HomeTabs from './src/pages/HomeTabs'
import AddRecord from "./src/pages/AddRecord"
import Main from './src/pages/Main';
import RecordAdd from './src/pages/RecordAdd';
import TagManage from './src/pages/TagManage';
import Setting from './src/pages/Setting';
import Login from './src/pages/Login';
import LoginFirst from './src/pages/LoginFirst';

const RootStack = createNativeStackNavigator()
const routes = [
  {
    name: 'Login',
    component: Login,
    options: {
      headerShown: false
    }
  },
  {
    name: 'LoginFirst',
    component: LoginFirst,
    options: {
      headerShown: false
    }
  },
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
  const [appCofnig,setConfig] = useConfig()
  // const navigationRef = useNavigationContainerRef()
  activateKeepAwakeAsync('global')

  useEffect(()=>{
    if(appCofnig.allowScreenshot){
      allowScreenCaptureAsync('global')
    }else{
      preventScreenCaptureAsync('global')
    }
  },[appCofnig.allowScreenshot])

  AppState.addEventListener('change',state=>{
    // if(
    //   state === 'background' && 
    //   Date.now() - appCofnig.loginDate >= 1000 * 60
    // ){
    //   navigationRef.resetRoot({
    //     index:0,
    //     routes:[{name:'Login'}]
    //   })
    // }
  })
  
  return (
    <NavigationContainer 
      // ref={navigationRef}
    >
      <RootStack.Navigator
        initialRouteName="Login"
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
