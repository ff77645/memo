import React from "react";
import {
  Text,
  View,
} from "react-native";


export default function BaseHeader({
  children,
  backgroundColor='#0984e3',
}) {
  return (
    <View
      style={{
          height: 60,
          backgroundColor: backgroundColor,
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
        }}
    >
      {children}
    </View>
  )
}