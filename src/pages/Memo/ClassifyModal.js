import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'

export default function ClassifyModal({
  value,
  options,
  onClose,
  changeClassify
}){
  
  const selectClassify = item =>{
    changeClassify(item)
    onClose()
  }

  return (
    <TouchableWithoutFeedback 
      onPress={onClose}
    >
      <View
        style={{
          position:'absolute',
          top:0,
          left:0,
          width:'100%',
          height:'100%',
          backgroundColor:'rgba(0,0,0,.5)',
        }}
      >
          <ScrollView
            style={{
              borderBottomLeftRadius:12,
              borderBottomRightRadius:12,
            }}
          >
            <TouchableWithoutFeedback
              onPress={e=>e.stopPropagation()}
            >
              <View
                style={{
                  padding:12,
                  borderBottomLeftRadius:12,
                  borderBottomRightRadius:12,
                  backgroundColor:'#EEE',
                }}
              >
                <View
                  style={{
                    backgroundColor:'#fff',
                    paddingHorizontal:12,
                    borderRadius:12,
                    paddingVertical:6,
                  }}
                >
                  {
                    options.map((item,index)=>(
                      <ClassifyItem selected={value === item.value} onPress={selectClassify} item={item} key={index}></ClassifyItem>
                    ))
                  }
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}


function ClassifyItem({item,onPress,selected}){

  const colorStyle = {
    color: selected ? 'blue' : '#333'
  }

  return (
    <TouchableWithoutFeedback
      onPress={()=>onPress(item)}
    >
      <View
        style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          paddingVertical:6,
          justifyContent:'space-between',
        }}
      >
        <Text
          style={[
            {
              color:'#000',
              fontSize:16,
              fontWeight:'500',
            },
            colorStyle
          ]}
        >{item.name}</Text>
        <Text style={[
          {
            color:'#333',
            fontSize:12,
          },
          colorStyle
        ]}>{item.amount}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}