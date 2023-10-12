import React from "react";
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'




export default function AddButton(){



  return (
    <View
      style={{
        position:'absolute',
        right:16,
        bottom:20,
      }}
    >
      <Icon name="add-circle" color="blue" size={50} />
    </View>
  )
}