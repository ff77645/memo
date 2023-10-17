import React, {
    useEffect,
    useState,
} from "react"
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TextInput,
    Platform,
} from 'react-native'
import Header from "./Header"
import RecordItem from "./RecordItem"
import AddButton from "./AddButton"
import ClassifyModal from "./ClassifyModal"
import * as SQLite from "expo-sqlite";
import {executeSql} from '../../utils'
import {initDatabase,initClassify} from './helper'

import {
    classifyList,
} from './mock'

const db = SQLite.openDatabase("db.db");


export default function Memo({ navigation }) {

    const [memoList,setMemoList] = useState([])
    const [showCategray, setShowCategray] = useState(false)
    const [currentClassifyVal, setCurrentClassifyVal] = useState({})
    const [classify,setClassify] = useState([])

    let id = 0

    const add = async (text) => {
        if (text === null || text === "") return false
        await executeSql(db,"insert into items (done, value) values (0, ?)",[text])
        const rows = await executeSql(db,"select * from items")
        console.log(JSON.stringify(rows))
    }

    const query = async ()=>{
        const rows = await executeSql(db,"select * from items")
        console.log(JSON.stringify(rows))
    }

    const changeClassify = item => {
        setCurrentClassifyVal(item)
        query()
    }

    const navToAddRecord = () => {
        navigation.navigate('AddRecord')
        // add(`text ${id}`)
    }

    const initData = async ()=>{
        const clasRows = await executeSql(db,'select * from classify')
        // console.log({clasRows:JSON.stringify(clasRows)});
        setClassify(clasRows._array)
        const _memoList = await executeSql(db,'select * from memo_list')
        console.log({memoList});
        setMemoList(_memoList._array)
        if(!clasRows.length) {
            console.log('classify empty');
            await initClassify(db)
        }
    }

    useEffect(() => {
        initDatabase(db)
        initData()
    }, [])

    const selectRecord = item =>{
        console.log({item});
        navigation.navigate('AddRecord',{
            id:item.id,
        })
    }


    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                height: '100%',
            }}
        >
            <Header
                showCategray={showCategray}
                categray={currentClassifyVal}
                onSetShowCategray={setShowCategray}
            ></Header>
            <View
                style={{
                    flex: 1,
                    position: 'relative',
                }}
            >
                <ListHeader></ListHeader>
                <FlatList
                    data={memoList}
                    renderItem={({item}) => <RecordItem item={item} onPress={selectRecord}/>}
                >
                </FlatList>
                {!showCategray && <AddButton onPress={navToAddRecord}></AddButton>}
                {showCategray && <ClassifyModal
                    data={classify}
                    value={currentClassifyVal}
                    onClose={() => {
                        setShowCategray(false)
                    }}
                    changeClassify={changeClassify}
                ></ClassifyModal>}
            </View>
        </View>
    )
}


function ListHeader() {
    return (
        <View
            style={{
                marginHorizontal: 12,
                marginTop: 12,
            }}
        >
            <TextInput
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    paddingHorizontal: 10,
                }}
                placeholder="搜索记录"
            ></TextInput>
        </View>
    )
}