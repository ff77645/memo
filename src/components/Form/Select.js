import React, {
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native'



export function Select({
    options,
    value,
    onChange,
    disable,
  }) {

  const [showOptions, setShowOptions] = useState(false)
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const getCurrentLabel = ()=>{
    const match = options.filter(i=>i.value === value)[0]
    return match ? match.label : ''
  }
  const [currentLabel,setCurrentLabel] = useState(getCurrentLabel)

  useEffect(()=>{
    setCurrentLabel(getCurrentLabel())
  },[value,options])

  const handleClick = ({ nativeEvent }) => {
    if(disable) return
    const x = nativeEvent.pageX - nativeEvent.locationX
    const y = nativeEvent.pageY - nativeEvent.locationY + 50
    setLocation({ ...location, x, y })
    setShowOptions(!showOptions)
  }

  const onLayout = ({ nativeEvent }) => {
    const { width, height, x, y } = nativeEvent.layout
    console.log({ width, height, x, y });
    setLocation({
      ...location,
      width,
      height,
    })
  }

  const selectOption = item =>{
    if(item.value === value) return setShowOptions(false)
    console.log({val:item.value});
    onChange(item.value)
    setShowOptions(false)
  }

  

  return (
    <>
      <TouchableWithoutFeedback
        onPress={handleClick}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 6,
            height: 50,
          }}
          onLayout={onLayout}
        >
          <Text
            style={{
              lineHeight: 50,
              paddingHorizontal:10,
            }}
          >
            {currentLabel}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={showOptions}
        transparent
      >
        <TouchableWithoutFeedback
          onPress={() => setShowOptions(false)}
        >
          <View
            style={{
              height: '100%',
              position: 'relative',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: location.y,
                left: location.x,
                width: location.width,
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingHorizontal:10,
              }}
            >
              {
                options.map(item => (
                  <Option item={item} key={item.value} onPress={selectOption}></Option> 
                ))
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

function Option({item,onPress,}){

  return (
    <TouchableWithoutFeedback
      onPress={()=>onPress(item)}
    >
      <View
        style={{
          paddingVertical: 6,
        }}
      >
        <Text
          style={{
            color: '#000',
          }}
        >{item.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
