import {openDatabase} from 'expo-sqlite'
import { executeSql } from './src/utils';
export default async function initDataBase(){
  const db = openDatabase('db.db');

  await executeSql(
    db,
    `
      create table if not exists records (
        id text primary key not null, 
        tag_id text,
        title text,
        acount text,
        userName text,
        password text,
        url text,
        desc text,
        create_date text,
        update_date text,
        is_delete number,
        delete_date text
      );
    `,
  );
  // console.log('records 创建成功');
  await executeSql(
    db,
    `
      create table if not exists tags (
        id text primary key not null, 
        text text,
        create_date text,
        update_date text,
        is_delete text default 'false'
      );
    `,
  );
  // console.log('tags 创建成功');
}