import {api} from './config';
import storage from './storage';
import Toast from '../components/Toast';
import {redirectTo} from "./navigationService";

function timeout_fetch(fetch_promise, timeout = 60000) {
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
let hasExitFlag = false;
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */

const logout = () => {
  storage.remove({
    key: 'token'
  });
  storage.remove({
    key: 'userInfo'
  });
  storage.remove({
    key: 'permissionInfo'
  });
  Toast.showInfo('登录已过期或其他地方已登录！');
  hasExitFlag = true;
  redirectTo('Login');
};
// 不需要 token 的接口
const whiteList = ['/login'];

export default async function fetchRequest(url, method, frontKey = '', params = '') {
  let header = {
    'Content-Type': 'application/json',
    tokenType: 'tokenApp',
    authType: 'jwt',
    frontKey: frontKey,
    token: '', //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
  };
  if (!whiteList.includes(url)) {
    //获取存储Token
    await storage
        .load({
          key: 'token',
          autoSync: true,
          syncInBackground: true,
        })
        .then(ret => {
          if (ret.length) {
            header.token = ret;
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
            if(responseData.resultCode === 401){
              if(!hasExitFlag) {
                logout();
              }
              return
            }
            if(responseData.resultCode !== "000000" && responseData.resultCode !== 0){
              Toast.showInfo('服务器内部错误！');
            }
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
            if(responseData.resultCode === 401){
              if(!hasExitFlag) {
                logout();
              }
              return
            }
            if(responseData.resultCode !== "000000" && responseData.resultCode !== 0){
              Toast.showInfo('服务器内部错误！');
            }
            resolve(responseData);
          })
          .catch(err => {
            Toast.showInfo('网络错误！');
            reject(err);
          });
    });
  }
}
