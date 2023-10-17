import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


export function CheckBoxGrounp({
  data,
  value,
  onChange,
  disable,
}){

  const handleChange = val =>{
    if(disable) return 
    onChange(val)
  }

  return (
    <View
      style={{
        flex:1,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
      }}
    >
      {
        data.map(item=>(
          <CheckBox
            key={item.value}
            checked={value === item.value}
            onPress={() => handleChange(item.value)}
            title={item.title}
            checkedIcon={
                <Icon name="radio-button-on-outline" size={16} color={item.color} />
            }
            uncheckedIcon={
                <Icon name="radio-button-off-outline" size={16}  />
            }
          ></CheckBox>
        ))
      }
    </View>
  )
}




export function CheckBox({
  checked,
  title,
  checkedIcon,
  uncheckedIcon,
  onPress,
}){


  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View
        style={{
          display:'flex',
          padding:5,
          flexDirection:'row',
          alignItems:'center',
          gap:6,
        }}
      >
        {checked ? checkedIcon : uncheckedIcon}
        <Text
          style={{
            color:'#333',
          }}
        >{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}