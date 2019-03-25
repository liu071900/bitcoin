export const WS_URL = 'ws://192.168.1.102:9001';
//export const WS_URL = 'ws://192.168.96.158:9001';
export const FILE_UPLOAD_URL = 'http://192.168.1.102/api/account/saveusercertificatesenior';

//export const FILE_UPLOAD_URL = "http://127.0.0.1/api/account/saveusercertificatesenior"
//涨跌的颜色
export const RAISE_COLOR = '#25B36A'; //涨
export const FAILED_COLOR = '#F25C48'; //跌
export const NO_CHANGE_COLOR = 'rgb(51,51,51)'; //无变化

//网络状态
export const NETWORK_PENDING = 0; //正在建立连接
export const NETWORK_RESOLVE = 1; //正常，ping 正常
export const NETWORK_REJECT = 2; //延迟高，ping延迟高
