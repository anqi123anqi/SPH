import { v4 as uuidv4 } from 'uuid'
//生成一个随机字符串，每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  //先从本地存储获取uuid（判断本地存储是否已存在）
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  //如果没有就新生成
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  return uuid_token
}

//清楚本地存储的token
export const removeToken = () =>{
	localStorage.removeItem('TOKEN');
}