// import http from 'http';
const http = require('https');
const fs = require('fs');
const path = require('path');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url,{
      host:'jc.zhcw.com',
      headers:{
        cookie:'PHPSESSID=3q9gbbibhjbifthtdishm6j6o4',
        referer:'https://www.zhcw.com/'
      }
    },(res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data.substring('jQuery1122019318583474225615_1700816478841('.length,data.length - 1)));
      });
    });
  })
}
const getUrl = pageNum =>`https://jc.zhcw.com/port/client_json.php?callback=jQuery1122019318583474225615_1700816478841&transactionType=10001001&lotteryId=1&issueCount=0&startIssue=0&endIssue=0&startDate=2023-01-01&endDate=2023-11-23&type=2&pageNum=${pageNum}&pageSize=30&tt=0.4222978752173794&_=1700816478846`

get(url,res=>{
  res = JSON.parse(res.substring('jQuery1122019318583474225615_1700816478841('.length,res.length - 1))
  if(res.message !== '成功') return console.log({res});
  const data = res.data
  console.log({
    total:res.total,
    pages:res.pages,
  });
  const json = data.map(i=>({
    issue:i.issue,
    frontWinningNum:i.frontWinningNum,
    backWinningNum:i.backWinningNum,
    prizePoolMoney:i.prizePoolMoney,
    saleMoney:i.saleMoney,
    week:i.week,
    openTime:i.openTime,
  }))
  const p = path.resolve(__dirname,'data.json')
  console.log(p);
  fs.writeFileSync('data.json',JSON.stringify(json))
})

function request(n){
  const url = getUrl(n)
  const res = get(url)
}