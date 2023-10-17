

export function executeSql(db,sql,params=[]){
  return new Promise((resolve,reject)=>{
    db.transaction(
      tx=>{
        tx.executeSql(sql,params,(_,{rows})=>{
          resolve(rows)
        })
      },
      reject,
      resolve,
    )
  })
}