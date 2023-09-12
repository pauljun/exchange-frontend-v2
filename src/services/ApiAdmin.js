// axios
import axios from 'axios';
import config from '@/config';

export default () => {
  return axios.create({
    baseURL: `${config.domain}`,
    timeout: 50000, // 设置超时时间为50秒
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

/**
 * 新版接口
 */
export const ApiAdminNew = () => {
  return axios.create({
    baseURL: `${config.domainAdmin}`,
    timeout: 50000, // 设置超时时间为50秒
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
