import React from "react";
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'




export default function AddButton(props){



  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
    >
      <View
        style={{
          position:'absolute',
          right:16,
          bottom:20,
        }}
      >
        <Icon name="add-circle" color="blue" size={50} />
      </View>
    </TouchableWithoutFeedback>
  )
}