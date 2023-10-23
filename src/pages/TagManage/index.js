import React, {useState} from 'react';
import {View, Text, TextInput,ScrollView} from 'react-native';
import IconButton from '../../components/IconButton';
import Header from './Header';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TagManage({navigation}) {
  const handleAddTag = val => {
    console.log({val});
  };
  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
      }}>
      <Header onBack={() => navigation.goBack()}></Header>
      <TagNameInput onConfirm={handleAddTag} />
      <ScrollView
        style={{
          flex:1,
        }}
      >
        <TagItem/>
      </ScrollView>
    </View>
  );
}

function ModalAction(){

  return (
    <View>
      
    </View>
  )
}

function TagItem({item}){
  const tagOpreation = ()=>{}
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:12,
        paddingHorizontal:20,
        gap:20,
        borderBottomWidth: 1,
        borderColor: '#dadada',
        borderStyle: 'solid',
      }}
    >
      <Icon name="bookmark-outline" size={24} color="#666"/>
      <Text style={{color:'#333',fontSize:16,flex:1,}}>tabName</Text>
      <IconButton onPress={tagOpreation} name="ellipsis-vertical" size={24} color="#666"/>
    </View>
  )
}

function TagNameInput({onConfirm}) {
  const [value, setValue] = useState('');
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#dadada',
        borderStyle: 'solid',
        gap: 20,
      }}>
      <Icon name="add-outline" color="#666" size={24}></Icon>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="添加新标签"
        style={{flex: 1, fontSize: 16}}></TextInput>
      <IconButton
        onPress={() => onConfirm(value)}
        name="checkmark"
        size={26}
        color="#666"></IconButton>
    </View>
  );
}
