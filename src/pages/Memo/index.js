import React, {
    useState,
} from "react"
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TextInput,
} from 'react-native'
import Header from "./Header"
import RecordItem from "./RecordItem"
import AddButton from "./AddButton"
import ClassifyModal from "./ClassifyModal"
import {
    memoList,
    classifyList,
} from './mock'


export default function Memo({ navigation }) {

    const recordList = Array.from({ length: 20 })
    const [showCategray, setShowCategray] = useState(false)
    const [currentClassifyVal,setCurrentClassifyVal] = useState('all')


    const navToAddRecord = () => {
        navigation.navigate('AddRecord')
    }
    const changeClassify = item => {
        setCurrentClassifyVal(item.value)
        console.log({item});
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
                    data={recordList}
                    // ListHeaderComponent={ListHeader}
                    renderItem={() => <RecordItem />}
                >
                </FlatList>
                {!showCategray && <AddButton onPress={navToAddRecord}></AddButton>}
                {showCategray && <ClassifyModal
                    options={classifyList}
                    value={currentClassifyVal}
                    onClose={() => {
                        setShowCategray(false)
                        console.log(123);
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