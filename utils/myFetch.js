import {api} from './config';
import storage from './storage';
import Toast from '../components/Toast';

function timeout_fetch(fetch_promise, timeout = 10000) {
  let timeout_fn = null;

  //这是一个可以被reject的promise
  let timeout_promise = new Promise(function (resolve, reject) {
    timeout_fn = function () {
      reject('timeout promise');
    };
  });

  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  let abort_promise = Promise.race([fetch_promise, timeout_promise]);

  setTimeout(function () {
    timeout_fn();
  }, timeout);

  return abort_promise;
}
let common_url = api; //服务器地址
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
export default async function fetchRequest(url, method = '', params = '') {
  let header = {
    'Content-Type': 'application/json',
    tokenType: 'tokenApp',
    authType: 'jwt',
    token: '', //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
  };
  if (url !== '/api/system/login') {
    //获取存储Token
    await storage
      .load({
        key: 'token',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        if (ret.length) {
          header.token = `${ret}`;
        }
      });
  }
  if (method === 'GET') {
    let getUrl = common_url + url;
    if (params !== '') {
      getUrl = getUrl + '?';
      for(const key in params) {
        if(params.hasOwnProperty(key)) {
          getUrl = getUrl + `${key}=${params[key]}&`;
        }
      }
      getUrl = getUrl.slice(0, getUrl.length - 1);
    }
    return new Promise(function (resolve, reject) {
      timeout_fetch(
        fetch(getUrl, {
          method: method,
          headers: header,
        }),
      )
        .then(response => response.json())
        .then(responseData => {
          resolve(responseData);
        })
        .catch(err => {
          Toast.showInfo('网络错误！');
          reject(err);
        });
    });
  } else {
    if(url === '/api/system/upload'){
      header["Content-Type"] = 'multipart/form-data';
      return new Promise(function (resolve, reject) {
        timeout_fetch(
          fetch(common_url + url, {
            method: method,
            headers: header,
            body: params, // 文件上传不能JSON传 body参数
          }),
        )
          .then(response => {
            console.log(response);
            response.json()
          })
          .then(responseData => {
            console.log("responseData: "+responseData);
            resolve(responseData);
          })
          .catch(err => {
            Toast.showInfo('网络错误！');
            reject(err);
          });
      });
    } else {
      return new Promise(function (resolve, reject) {
        timeout_fetch(
          fetch(common_url + url, {
            method: method,
            headers: header,
            body: JSON.stringify(params), //body参数，通常需要转换成字符串后服务器才能解析
          }),
        )
          .then(response => response.json())
          .then(responseData => {
            resolve(responseData);
          })
          .catch(err => {
            Toast.showInfo('网络错误！');
            reject(err);
          });
      });
    }
  }
}
