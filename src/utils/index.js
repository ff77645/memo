import CryptoJS from 'crypto-js'

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

// 密码加密
export function encryptPassword(password, key) {
  var encrypted = CryptoJS.AES.encrypt(password, key);
  return encrypted.toString();
}

// 密码解密
export function decryptPassword(encryptedPassword, key) {
  var decrypted = CryptoJS.AES.decrypt(encryptedPassword, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

