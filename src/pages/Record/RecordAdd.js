import React from "react";
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ToastExample } from "../../NativeMoudles";


export default function RecordAdd({onPress}){
  const showToast = ()=>{
    ToastExample.show('Awesome', ToastExample.SHORT);
  }
  return (
    <TouchableWithoutFeedback
      onPress={showToast}
    >
      <View
        style={{
          position:'absolute',
          right:16,
          bottom:20,
        }}
      >
        <Icon name="add-circle" color="#0984e3" size={68} />
      </View>
    </TouchableWithoutFeedback>
  )
}