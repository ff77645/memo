import React, {useState,useCallback} from 'react';
import {View, Text, TextInput, ScrollView, Alert, ToastAndroid} from 'react-native';
import IconButton from '../../components/IconButton';
import Header from './Header';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalAction from '../../components/ModalAction';
import {List} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native'
import {openDatabase} from 'expo-sqlite'
import { dbName } from '../../config/config';
import { executeSql } from '../../utils';
import {randomUUID} from 'expo-crypto'

const db = openDatabase(dbName)
let currentTag = {}

export default function TagManage({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal,setShowEditModal] = useState(false)
  const [editValue,setEditValue] = useState('edit value')
  const [tagList,setTagList] = useState([])
  
  
  const getTagList = async ()=>{
    const data = await executeSql(db,'select * from tags')
    setTagList(data._array)
  }
  
  

  const onEditTag = () => {
    setShowModal(false)
    setShowEditModal(true)
  };

  const handleDelete = async () => {
    console.log('handleDelete');
    await executeSql(db,`delete from tags where id = ?`,[currentTag.id])
    getTagList()
 
  };

  const onDeleteTag = () => {
    setShowModal(false);
    Alert.alert('确定删除标签?', '', [
      {
        text: '取消',
        style: 'cancel',
      },
      {text: '删除', onPress: handleDelete},
    ]);
  };
  const updateTag = async ()=>{
    if(!editValue) return ToastAndroid.show('标签名称不能为空',ToastAndroid.SHORT)
    console.log({editValue,currentTag});
    await executeSql(db,`update tags set text = ? where id = ?`,[editValue,currentTag.id])
    getTagList()
    setShowEditModal(false)
  }

  const onOperation = item =>{
    currentTag= item
    setEditValue(item.text)
    setShowModal(true)
  }

  const handleAddTag = async val => {
    if(val === '') return ToastAndroid.show('标签名称不能为空',ToastAndroid.SHORT)
    const date = Date.now() + ''
    const id = randomUUID()
    await executeSql(db,'insert into tags (id,text,create_date,update_date) values (?,?,?,?)',[id,val,date,date])
    getTagList()
  };

  useFocusEffect(useCallback(()=>{
    getTagList()
  },[]))

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
      }}>
      <Header onBack={() => navigation.goBack()} title="编辑标签"></Header>
      <TagNameInput onConfirm={handleAddTag} />
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        {
          tagList.map(item=>(
            <TagItem key={item.id} item={item} onOperation={onOperation} />
          ))
        }
      </ScrollView>
      <ModalAction
        visible={showModal}
        transparent
        animationType="fade "
        onClose={() => setShowModal(false)}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,.5)',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 30,
              borderRadius: 6,
              padding: 20,
            }}>
            <List.Item title="编辑" onPress={onEditTag} />
            <List.Item title="删除" onPress={onDeleteTag} />
          </View>
        </View>
      </ModalAction>
      <ModalAction
        visible={showEditModal}
        transparent
        animationType="fade "
        onClose={() => setShowEditModal(false)}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,.5)',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 30,
              borderRadius: 6,
              padding: 20,
            }}>
                <Text style={{color:'#333',fontSize:18}}>编辑</Text>
              <TextInput
                value={editValue}
                onChangeText={setEditValue}
                style={{
                  borderBottomWidth:1,
                  borderColor:'#b33939',
                  borderStyle:'solid',
                  marginTop:15,
                }}
              ></TextInput>
              <View
                style={{
                  display:'flex',
                  alignItems:'flex-end',
                  marginTop:20,
                  
                }}
              >
                <Text 
                  style={{
                    fontSize:16,
                    color:'#1e90ff',
                    marginRight:6,
                  }}
                  onPress={updateTag}
                >确定</Text>
              </View>
          </View>
        </View>
      </ModalAction>
    </View>
  );
}

function TagItem({item, onOperation}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 20,
        borderBottomWidth: 1,
        borderColor: '#dadada',
        borderStyle: 'solid',
      }}>
      <Icon name="bookmark-outline" size={24} color="#666" />
      <Text style={{color: '#333', fontSize: 16, flex: 1}}>{item.text}</Text>
      <IconButton
        onPress={()=>onOperation(item)}
        name="ellipsis-vertical"
        size={24}
        color="#666"
      />
    </View>
  );
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
        onPress={() => {
          onConfirm(value)
          setValue('')
        }}
        name="checkmark"
        size={26}
        color="#666"></IconButton>
    </View>
  );
}
