import COS from 'cos-nodejs-sdk-v5';

export const SecretId = 'AKIDQAesqXx71dy3rPfeMnxqSotiHbeRxCBs';
export const SecretKey = 'ScWAXdT2LOAhxwf7ICoAGSN0NTIq8AvQ';
export const Bucket = 'fecoder-1302080640';
export const Region = 'ap-nanjing';

// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
export const cos = new COS({
  SecretId,
  SecretKey,
});
