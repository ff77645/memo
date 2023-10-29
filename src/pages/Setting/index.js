import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingEntry from './SettingEntry';
import DataBase from './DataBase';
import Safe from './Safe';


const SettingStack = createNativeStackNavigator()

const routes = [
  {
    name:'SettingEntry',
    component:SettingEntry,
    options: {
      headerShown: false
    },
  },
  {
    name:'DataBase',
    component:DataBase,
    options: {
      headerShown: false
    },
  },
  {
    name:'Safe',
    component:Safe,
    options: {
      headerShown: false
    },
  },
]

export default function Setting() {
  return (
    <SettingStack.Navigator
      initialRouteName="SettingEntry"
    >
      {
        routes.map(route => (
          <SettingStack.Screen
            name={route.name}
            component={route.component}
            options={route.options}
            key={route.name}
          />
        ))
      }
    </SettingStack.Navigator>
  );
}
