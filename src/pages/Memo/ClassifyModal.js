import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'

export default function ClassifyModal(props){

  const categrays = [
    {
      categrayName:'全部',
      amount:8,
    },
    {
      categrayName:'账号',
      amount:8,
    },
    {
      categrayName:'未分类',
      amount:8,
    },
    {
      categrayName:'我的收藏',
      amount:8,
    },
    {
      categrayName:'最近删除',
      amount:8,
    },
  ]
  // categrays.push(...categrays)
  // categrays.push(...categrays)
  // categrays.push(...categrays)

  return (
    <TouchableWithoutFeedback 
      onPress={props.onClose}
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
                    categrays.map((item,index)=>(
                      <View
                        key={index}
                        style={{
                          display:'flex',
                          flexDirection:'row',
                          alignItems:'center',
                          paddingVertical:6,
                          justifyContent:'space-between',
                        }}
                      >
                        <Text
                          style={{
                            color:'#000',
                            fontSize:16,
                            fontWeight:'500',
                          }}
                        >账号</Text>
                        <Text style={{
                          color:'#333',
                          fontSize:12,
                        }}>9</Text>
                      </View>
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
