import React from "react";
import { 
  DrawerItem,
} from '@react-navigation/drawer';
import {
useLinkBuilder,
DrawerActions,
CommonActions,
} from '@react-navigation/native';
import { View } from "react-native";



export default function DrawerItemGrounp({
  state,
  navigation,
  descriptors,
}){
  const buildLink = useLinkBuilder();

  const onPress = (route) => {
    const focused = route.index === state.index
    const event = navigation.emit({
      type: 'drawerItemPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.dispatch({
        ...(focused
          ? DrawerActions.closeDrawer()
          : CommonActions.navigate({ name: route.name, merge: true })),
        target: state.key,
      });
    }
  };
  return (
    <View
      style={{
        borderTopWidth:1,
        borderStyle:'solid',
        borderColor:'#F1F1F1',
        paddingVertical:10,
      }}
    >
      {
        state.routes.map(route => {
          const focused = route.index === state.index;
      
          const {
            title,
            drawerLabel,
            drawerIcon,
            drawerLabelStyle,
            drawerItemStyle,
            drawerAllowFontScaling,
            
            drawerActiveTintColor,
            drawerInactiveTintColor,
            drawerActiveBackgroundColor,
            drawerInactiveBackgroundColor,
          } = descriptors[route.key].options;
      
          return (
            <DrawerItem
              key={route.key}
              label={
                drawerLabel !== undefined
                  ? drawerLabel
                  : title !== undefined
                  ? title
                  : route.name
              }
              icon={drawerIcon}
              focused={focused}
              activeTintColor={drawerActiveTintColor}
              inactiveTintColor={drawerInactiveTintColor}
              activeBackgroundColor={drawerActiveBackgroundColor}
              inactiveBackgroundColor={drawerInactiveBackgroundColor}
              allowFontScaling={drawerAllowFontScaling}
              labelStyle={drawerLabelStyle}
              style={drawerItemStyle}
              to={buildLink(route.name, route.params)}
              onPress={()=>onPress(route)}
            />
          );
        })
      }
    </View>
  )
}