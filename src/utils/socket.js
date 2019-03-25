/****************** websocket 封装 *********************
 * ===================public Api=================
 * send(msg),发送消息，不用等待服务器消息
 * on(op,key)，监听消息
 * subcribeState(cb)，监听状态。
 * asyncSend(msg,response,[timeout,]); 发送消息等待服务器响应，默认超时为3秒。eg:await asyncSend(msg,'tickers',[timeout,])
 * destroy(); //销毁
 */
import _ from 'lodash';
window.lodash = _;

var RECONNECT_STEP_TIME = 3000;
var MSG_MAX_CHCHE = 10;
import { WS_URL } from './constans';

//重新连接间隔时间
var RECONNECT_STEP_TIME = 3000;

function ClientSocket(url) {
  //私有变量
  var _wsScoket = null;
  var self = this;
  var timer = null;
  //共有变量
  this.url = url;
  this.readyState = 0;

  //消息标记。使websocket 发送的消息 支持 fetch 模式。await xx.asyncSend("xxx",3)
  this.msgMarks = {};

  this.sessionId = 0;

  //消息处理容器 {"op":func}
  this.handlers = {};

  this.stateListener = function(s) {
    console.log(s);
  };

  //消息队列，如果socket 没有建立连接，则缓存在发送队列里面。
  this.msgQue = [];

  //私有方法//////////////////////////////////
  /**
   * 尝试建立到url的链接，返回一个对象
   * url:服务器url
   * return 失败返回null，成功返回 Websocket 对象。
   */

  function _connect(url) {
    var _s = null;

    try {
      _s = new WebSocket(url);
    } catch (e) {
      console.log(e);
    }
    return _s;
  }

  //错误处理函数，3秒后重新连接服务器
  function onerror(e) {
    console.log(e);
    // setTimeout(function(){
    //     self._setup()
    // },RECONNECT_STEP_TIME)
  }

  function onopen() {
    console.log('websocket opened');

    self.readyState = 1;
    self.stateListener(1);

    for (var index in self.msgQue) {
      console.log(self.msgQue);
      _wsScoket.send(self.msgQue[index]);
    }
    self.msgQue = [];
  }

  function onclose(e) {}

  function onmessage(msg) {
    let data = msg.data;
    if (data == undefined) return;
    data = JSON.parse(data);

    var response = data.op;

    var key = response;
    // 返回的消息是被 await 的。

    if (self.msgMarks.hasOwnProperty(key)) {
      //promise resolve
      self.msgMarks[key].resolve(data);
      delete self.msgMarks[key];

      return;
    }

    if (typeof self.handlers[response] === 'function') {
      self.handlers[response](data);
      return;
    }
  }

  this._setup = function() {
    if (_wsScoket !== null) {
      // _wsScoket.onclose = null;
      _wsScoket.onerror = null;
      _wsScoket.onmessage = null;
      _wsScoket.onopen = null;
      _wsScoket.onclose = null;
      _wsScoket.close();
      self.readyState = 3;

      self.stateListener(3);

      _wsScoket = null;
    }

    _wsScoket = _connect(self.url);

    if (_wsScoket !== null) {
      _wsScoket.onerror = onerror;
      _wsScoket.onmessage = onmessage;
      _wsScoket.onopen = onopen;
      _wsScoket.onclose = onclose;
    }
    console.log(_wsScoket);
  };

  //收到消息回调函数，
  this.on = function(event, cb) {
    this.handlers[event] = cb;
  };

  this._init = function() {
    this._setup();
    timer = setInterval(function() {
      for (var key in self.msgMarks) {
        var now = new Date().getTime();
        var timeout = self.msgMarks[key].timeout;
        var time = self.msgMarks[key].time;
        //超时消息
        if (now - time > timeout * 1000) {
          self.msgMarks[key].resolve({ result: { code: 2, msg: 'request time out' } });
          delete self.msgMarks[key];
        }
      }
    }, 1000);

    return this;
  };

  this.destroy = function() {
    clearInterval(timer);
    _wsScoket && _wsScoket.close();
  };

  this._send = function(msg) {
    var sendMsg = msg;

    if (typeof sendMsg === 'object') {
      sendMsg = JSON.stringify(msg);
    }

    if (_wsScoket && _wsScoket.readyState == 1) {
      _wsScoket.send(sendMsg);
    } else {
      if (self.msgQue.length < MSG_MAX_CHCHE) {
        self.msgQue.push(sendMsg);
      } else {
        console.log('消息缓存队列已满');
      }
    }
  };

  //发送异步消息并等待响应,超时间不响应，返回一个Promise对象。
  this.asyncSend = function(msg, response, timeout) {
    msg = typeof msg === 'object' ? msg : JSON.parse(msg);

    timeout = timeout || 3;

    var key = response;

    var futrue = new Promise(function(resole, rejcet) {
      self.msgMarks[key] = {};

      self.msgMarks[key]['resolve'] = resole;
      self.msgMarks[key]['rejcet'] = rejcet;

      self.msgMarks[key]['time'] = new Date().getTime();

      self.msgMarks[key]['timeout'] = timeout;
    });

    self._send(msg);

    return futrue;
  };

  //发送消息 而不用等待响应。
  this.send = function(msg) {
    //var sessionId = self.sessionId ++;

    //msg.header.sessionId = sessionId;
    self._send(msg);
  };
  //
  this.subcribeState = function(cb) {
    self.stateListener = cb;
  };

  this.setup = function() {
    self._init();
  };
}

/*
* ===================public Api=================
* send(msg),发送消息，不用等待服务器消息
* on(op,key)，监听消息
* subcribeState(cb)，监听状态。
* asyncSend(msg,response,[timeout,]); 发送消息等待服务器响应，默认超时为3秒。eg:await asyncSend(msg,'tickers',[timeout,])
* destroy(); //销毁
*/

const socket = new ClientSocket(WS_URL);

export { socket };
