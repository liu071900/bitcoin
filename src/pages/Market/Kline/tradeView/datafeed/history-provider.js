import request from '@/utils/request';

export default class HistoryProvider {
  constructor() {
    this.parseToUrl = this.parseToUrl.bind(this);
  }

  parseToUrl(symbol, resolution, from, to, firstTime) {
    
    let val = Number(resolution);
    let interval = '';
    //alert(resolution)
    if (resolution.includes('D')) {
      interval =  resolution;
    } else {
      if (val % 60) {
        interval = (val % 60) + 'm';
      } else {
        interval = (val/60) + 'H';
      }
    }
    if (firstTime) {
      to = new Date().getTime() / 1000;
    }

    return `/api/coin/getkline?from=${parseInt(from)}&to=${parseInt(to)}&symbol=${symbol}&interval=${interval}`;
  }

  // /api/coin/getkline?from=99999&to=99999&symbol=btc/usdt&interval=1D
  getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, firstTime) {
    let symbol = symbolInfo.name;
   
    let url = this.parseToUrl(symbol, resolution, rangeStartDate, rangeEndDate, firstTime);


    return request(url, { method: 'GET' }).then(res => {
      let ret = {};
      try {
        let { code, data } = res;
        if (code === 200) {
          if (data.length) {
            ret.meta = { noData: false };
            let bars = [];
            for (let i in data) {
              var item = {};
              item.time = data[i].t*1000;
              item.close = Number(data[i].c);
              item.open = Number(data[i].o);
              item.high = Number(data[i].h);
              item.low = Number(data[i].l);
              item.volume = Number(data[i].v);
              bars.push(item);
            }
            ret.bars = bars;
            ret.meta = { noData: false };
          } else {
            ret = { meta: { noData: true }, bars: [] };
          }
        } else {
          ret = { meta: { noData: true }, bars: [] };
        }
      } catch (e) {
        console.log(e);
        ret = { meta: { noData: true }, bars: [] };
      }
      //return {"meta":{"noData":false},"bars":[{"time":1549900800000,"close":3.5,"open":2.62,"high":3.5,"low":2.6,"volume":136},{"time":1549987200000,"close":5.531,"open":5.5,"high":5.544,"low":5.5,"volume":52}]}
      return ret;
    });
  }
}

// var HistoryProvider = /** @class */ (function () {
//     function HistoryProvider(datafeedUrl, requester) {
//         this._datafeedUrl = datafeedUrl;
//         this._requester = requester;
//     }

//     HistoryProvider.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate) {
//         var _this = this;
//         var requestParams = {
//             symbol: symbolInfo.ticker || '',
//             resolution: resolution,
//             from: rangeStartDate,
//             to: rangeEndDate,
//         };
//         return new Promise(function (resolve, reject) {
//             _this._requester.sendRequest(_this._datafeedUrl, 'history', requestParams)
//                 .then(function (response) {
//                 if (response.s !== 'ok' && response.s !== 'no_data') {
//                     reject(response.errmsg);
//                     return;
//                 }
//                 var bars = [];
//                 var meta = {
//                     noData: false,
//                 };
//                 if (response.s === 'no_data') {
//                     meta.noData = true;
//                     meta.nextTime = response.nextTime;
//                 }
//                 else {
//                     var volumePresent = response.v !== undefined;
//                     var ohlPresent = response.o !== undefined;
//                     for (var i = 0; i < response.t.length; ++i) {
//                         var barValue = {
//                             time: response.t[i] * 1000,
//                             close: Number(response.c[i]),
//                             open: Number(response.c[i]),
//                             high: Number(response.c[i]),
//                             low: Number(response.c[i]),
//                         };
//                         if (ohlPresent) {
//                             barValue.open = Number(response.o[i]);
//                             barValue.high = Number(response.h[i]);
//                             barValue.low = Number(response.l[i]);
//                         }
//                         if (volumePresent) {
//                             barValue.volume = Number(response.v[i]);
//                         }
//                         bars.push(barValue);
//                     }
//                 }
//                 resolve({
//                     bars: bars,
//                     meta: meta,
//                 });
//             })
//                 .catch(function (reason) {
//                 var reasonString = getErrorMessage(reason);
//                 console.warn("HistoryProvider: getBars() failed, error=" + reasonString);
//                 reject(reasonString);
//             });
//         });
//     };
//     return HistoryProvider;
// }());
// export { HistoryProvider };
