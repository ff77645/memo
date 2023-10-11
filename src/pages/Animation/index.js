import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AnimationDrag from '../../components/AnimationDrag'

const AnimationStack = createNativeStackNavigator()


function Animation() {
  const routes = [
    {
      name:'Drag',
      component:AnimationDrag,
      options:{
        title:'Drag',
        headerTitleAlign:'center'
      }
    }
  ]
  return (
      <AnimationStack.Navigator
        initialRouteName='Drag'
      >
        {
          routes.map(route=>(
            <AnimationStack.Screen
              name={route.name}
              component={route.component}
              options={route.options}
              key={route.name}
            ></AnimationStack.Screen>
          ))
        }
      </AnimationStack.Navigator>
  );
}

export default Animation;
