import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'





export default function RecordItem({item,onPress}){


  return (
    <TouchableWithoutFeedback
      onPress={()=>onPress(item)}
    >
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
          >{item.acount}</Text>
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
          <Text>{item.update_date}</Text>
          {/* <Text>|</Text> */}
          {/* <Text>内容一行</Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}