import React from "react";
import {
  View,
  Text,
} from 'react-native'



export default function RecordItem(){


  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
        gap:10,
        borderBottomWidth:1,
        borderColor:'#DDDDDD',
        borderStyle:'solid',
      }}
    >
      <View
        style={{
          width:50,
          height:50,
          borderRadius:25,
          backgroundColor:'#0984e3',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }}
      >
        <Text>icon</Text>
      </View>
      <View
        style={{
          flex:1,
          display:'flex',
          justifyContent:'space-between',
        }}
      >
        <View
          style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
          }}
        >
          <Text>test</Text>
          <Text>10月 18</Text>
        </View>
        <View>
          <Text>s</Text>
        </View>
      </View>
    </View>
  )
}