import React,{
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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddRecord from "../AddRecord"

const MemoStack = createNativeStackNavigator()


const routes = [
    {
      name:'Memo',
      component:Memo,
      options:{
        headerShown:false
      }
    },
    {
      name:'AddRecord',
      component:AddRecord,
      options:{
        // title: 'Home',
        // headerTitleAlign:'center'
        headerShown:false,
      }
    },
]
export default function MemoRoot(){
    return (
        <MemoStack.Navigator
            initialRouteName="Memo"
        >
            {
                routes.map(route=>(
                <MemoStack.Screen 
                    name={route.name}
                    component={route.component}
                    options={route.options}
                    key={route.name}
                />
                ))
            }
        </MemoStack.Navigator>
    )
}

function Memo({navigation}){

    const recordList = Array.from({length:20})
    const [showCategray,setShowCategray] = useState(false)
    const navToAddRecord = ()=>{
        navigation.navigate('AddRecord')
    }
    return (
        <View
            style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'stretch',
                height:'100%',
            }}
        >
            <Header
                showCategray={showCategray}
                onSetShowCategray={setShowCategray}
            ></Header>
            <View
                style={{
                    flex:1,
                    position:'relative',
                }}
            >
                <ListHeader></ListHeader>
                <FlatList 
                    data={recordList}
                    // ListHeaderComponent={ListHeader}
                    renderItem={()=><RecordItem/>}
                >
                </FlatList>
                {!showCategray && <AddButton onPress={navToAddRecord}></AddButton>}
                { showCategray && <ClassifyModal onClose={
                    ()=>{
                        setShowCategray(false)
                        console.log(123);
                    }
                }></ClassifyModal> }
            </View>
        </View>
    )
}


function ListHeader(){
    return (
        <View
            style={{
                marginHorizontal:12,
                marginTop:12,
            }}
            >
            <TextInput
                style={{
                    backgroundColor:'#fff',
                    borderRadius:6,
                    paddingHorizontal:10,
                }}
                placeholder="搜索记录"
            ></TextInput>
        </View>
    )
}