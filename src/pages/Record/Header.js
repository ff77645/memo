import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseHeader from '../../components/BaseHeader';
import {List} from 'react-native-paper';
import {openDatabase} from 'expo-sqlite';
import {executeSql} from '../../utils';
import ModalAction from '../../components/ModalAction';

const db = openDatabase('db.db');

const flexRowAlignCenterBetween = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const fontStyle = {
  color: '#fff',
  fontSize: 18,
};

export default function Header({backgroundColor, ...props}) {
  const [visible, setVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const handleOption = () => {
    setVisible(!visible);
  };

  const deleteTable = async () => {
    await executeSql(db, 'drop table records');
    console.log('删除成功');
    setVisible(!visible);
  };

  const createTable = async () => {
    await executeSql(
      db,
      `
            create table if not exists records (
            id integer primary key not null, 
            type text,
            title text,
            acount text,
            userName text,
            password text,
            url int,
            desc text,
            create_date text,
            update_date text
            );
        `,
    );
    console.log('创建成功');
    setVisible(!visible);
  };

  return (
    <>
      <BaseHeader backgroundColor={backgroundColor}>
        {isSearch ? (
          <SearchView {...props} onBack={() => setIsSearch(false)} />
        ) : (
          <DefaultView {...props} setIsSearch={setIsSearch} />
        )}

        <View
          style={[
            {
              width: 60,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            },
          ]}>
          <TouchableOpacity onPress={handleOption}>
            <Icon name="ellipsis-vertical" size={20} color="#fff"></Icon>
          </TouchableOpacity>
        </View>
      </BaseHeader>
      <ModalAction visible={visible} onClose={() => setVisible(false)}>
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 6,
          }}>
          <List.Item title="创建表" onPress={createTable} />
          <List.Item title="删除表" onPress={deleteTable} />
        </View>
      </ModalAction>
    </>
  );
}

function DefaultView({openDrawer, title, setIsSearch}) {
  return (
    <View
      style={[
        flexRowAlignCenterBetween,
        {
          flex: 1,
          paddingHorizontal: 20,
        },
      ]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          gap: 20,
        }}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="menu-outline" size={20} color="#fff"></Icon>
        </TouchableOpacity>
        <Text
          style={[
            fontStyle,
            {
              fontWeight: 500,
            },
          ]}>
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={() => setIsSearch(true)}>
        <Icon name="search-outline" size={20} color="#fff"></Icon>
      </TouchableOpacity>
    </View>
  );
}

function SearchView({onBack, onSearch}) {
  const [value, setValue] = useState('');
  const onChange = val => {
    setValue(val);
    onSearch(val);
  };
  const handleBack = ()=>{
    onChange('')
    onBack()
  }
  return (
    <View
      style={[
        flexRowAlignCenterBetween,
        {
          flex: 1,
          paddingHorizontal: 20,
        },
      ]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          gap: 20,
        }}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back-outline" size={20} color="#fff"></Icon>
        </TouchableOpacity>
      </View>
      <TextInput
        style={{
            flex:1,
            marginLeft:30,
            color:'#FFF',
        }}
        cursorColor="#b33939"
        placeholderTextColor="#CCC"
        value={value}
        onChangeText={onChange}
        placeholder="搜索..."></TextInput>
    </View>
  );
}
