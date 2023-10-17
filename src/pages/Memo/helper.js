import {executeSql} from '../../utils'
import {classifyList} from './mock'
export async function initDatabase(db){
  // 创建分类表
  await executeSql(db,
    `
      create table if not exists classify (
        id integer primary key not null, 
        name text, 
        value text
      );
    `
  )
  // await executeSql(db,'drop table memo_list').then(()=>{
  //   console.log('删表');
  // })
  // 创建记录表
  await executeSql(db,
    `
      create table if not exists memo_list (
        id integer primary key not null, 
        type text,
        acount text,
        password text,
        level int,
        remark text,
        create_date text,
        update_date text
      );
    `
  )
}

export async function initClassify(db){
  for(item of classifyList){
    console.log({item});
    await executeSql(db,
      `insert into classify (name, value) values (?, ?)` ,
      [item.name,item.value]
    )

  }
}