import React from "react";
import {
  View,
  Text,
} from 'react-native'





export default function RecordItem(){


  return (
    <View 
      style={{
        borderRadius:5,
        backgroundColor:'#fff',
        marginTop:12,
        marginHorizontal:12,
        paddingVertical:10,
        paddingHorizontal:6,
      }}
    >
      <View>
        <Text
          style={{
            fontSize:16,
          }}
        >账号管理</Text>
      </View>
      <View
        style={{
          display:'flex',
          flexDirection:'row',
          flexWrap:'nowrap',
          alignItems:'center',
          gap:2,
        }}
      >
        <Text>昨天</Text>
        <Text>|</Text>
        <Text>内容一行</Text>
      </View>
    </View>
  )
}