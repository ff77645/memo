import React from "react";
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'




export default function RecordAdd({onPress}){

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
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