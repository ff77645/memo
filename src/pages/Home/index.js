import React from 'react';
import {View, Text,TouchableWithoutFeedback,StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  touchText:{
    textAlign:'center',
  },
  touchView:{
    padding:12,
    backgroundColor:'pink',
    width:100,
  }
})

function Home({navigation}) {

  const toAnimation = ()=>{
    navigation.navigate('Animation')
  }
  return (
    <View>
      <TouchableWithoutFeedback onPress={toAnimation}>
        <View style={styles.touchView}>
          <Text style={styles.touchText}>Animation</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Home;
