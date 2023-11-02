

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

export function generateRandomPassword(length = 8,hasSpecial=false) {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if(hasSpecial){
    characters += '!@#$%^&*()'
  }
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}