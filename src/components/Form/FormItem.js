import React from "react"
import {
  View,
  Text,
} from 'react-native'


export function FormItem(props){
  return (
      <View
          style={{
              display:'flex',
              flexDirection:'row',
              alignItems:'center',
              paddingVertical:8,
              paddingHorizontal:20,
          }}
      >
          <View
              style={{
                  width:80,
              }}
          >
              <Text
                  style={{
                      fontSize:18,
                      fontWeight:500,
                      color:'#333',
                  }}
              >{props.label}</Text>
          </View>
          {props.children}
      </View>
  )
}