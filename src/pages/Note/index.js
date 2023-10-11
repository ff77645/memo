import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native'

const StatusBarPlaceholder =()=>(
  <View style={styles.placeholder}></View>
)

function NoteHeader(){
    

    return (
      <View
        style={styles.header}
      >
        <View>
          <Text>this is note header</Text>
        </View>
      </View>
    )
}

function NoteItem(){


  return (
    <View>
      <Text>note item  {StatusBar.currentHeight}</Text>
    </View>
  )
}

function Note({navigation}){
    return (
        <View>
          <StatusBarPlaceholder></StatusBarPlaceholder>
          <NoteHeader></NoteHeader>
          <ScrollView>
            <NoteItem></NoteItem>
          </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
  placeholder:{
    height:StatusBar.currentHeight
  },
  header:{
    display:'flex',
    flexDireact:'row',
  }
});

export default Note