import md5 from './md5.min.js';

const appid = '20220419001181362';
const key = 'b2lY3nu_cTHCAoUTk5U8';

export default function translateFunc(
  q,
  {from = 'auto', to = 'auto'} = {from: 'auto', to: 'auto'},
) {
  let salt = Date.now(); // 创建随机数
  let sign = md5(`${appid}${q}${salt}${key}`); // md5 将内容加密

  return new Promise((resolve, reject) => {
    fetch(
      'https://fanyi-api.baidu.com/api/trans/vip/translate?' +
        `q=${q}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(res => {
        if (res.trans_result.length) {
          resolve(res.trans_result[0].dst);
        } else {
          reject('翻译有误');
        }
      });
  });
}
