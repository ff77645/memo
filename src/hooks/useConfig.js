import {atom,useAtom} from 'jotai'
import {useState} from 'react'
import {getItemAsync,setItemAsync,deleteItemAsync} from 'expo-secure-store'
import {appConfigKey,appConfigValueDefault} from '../config/config'

// deleteItemAsync(appConfigKey)
// let userConfig = getItemAsync(appConfigKey)
// console.log(1,userConfig);
// if(!userConfig){
//   setItemAsync(appConfigKey,JSON.stringify(appConfigValueDefault))
//   userConfig = appConfigValueDefault
// }

const data = atom(
    async ()=>{
    const userConfig = await getItemAsync(appConfigKey)
    if(userConfig) return JSON.parse(userConfig)
    await setItemAsync(appConfigKey,JSON.stringify(appConfigValueDefault))
    return appConfigKey
  }
)
// const configAtom = atom(
//   async ()=>{
//     const userConfig = await getItemAsync(appConfigKey)
//     if(userConfig) return JSON.parse(userConfig)
//     await setItemAsync(appConfigKey,JSON.stringify(appConfigValueDefault))
//     return appConfigKey
//   },
//   async (get,set,value)=>{
//     console.log('set value',value);
//     setItemAsync(appConfigKey,JSON.stringify(value))
//   }
// )

const configAtom = atom(
  get=>get(data),
  (get,set,value)=>{
    set(data,value)
  }
)


export const useConfig = ()=>{
  return useAtom(configAtom)
}