import { Promise } from 'es6-promise';

//import DemoData from './demoData';

const DefaultConfiguration = {
  exchanges: [],
  supports_search: false,
  supports_group_request: false,
  supported_resolutions: [
    '1',
    '3',
    '5',
    '15',
    '30',
    '60',
    '120',
    '240',
    '360',
    '720',
    'D',
    '1W',
    '1M',
  ],
  supports_marks: false,
  supports_timescale_marks: false,
};

const getInterval = resolution => {
  let interval;
  switch (resolution) {
    case '1':
    case '3':
    case '5':
    case '15':
    case '30':
    case '60':
    case '120':
    case '240':
    case '360':
    case '720': {
      interval = resolution;
      break;
    }

    case 'D':
      {
        interval = 1 * 24 * 60 * 60;
      }
      break;
    case 'W': {
      interval = 6 * 24 * 60 * 60;
      break;
    }

    case 'M': {
      interval = 30 * 24 * 60 * 60;
      break;
    }
  }
  return interval;
};

function BuildSymbolInfo(symbol, pricescale, timezone = 'Asia/Shanghai') {
  var symbolInfo = {
    ticker: symbol,
    name: symbol,
    base_name: symbol,
    full_name: symbol,
    // listed_exchange: 'kcex', //
    // exchange: 'kcex', //
    description: symbol, //描述信息
    //
    has_intraday: false,

    has_no_volume: false,
    minmov: 2,
    pricescale: 0, //价格精度
    type: 'bitcoin',
    session: '24x7',
    timezone: timezone,
    force_session_rebuild: false,
    has_daily: true,
    //intraday_multipliers: ['1', '3', '5', '15', '30', '60'],
    has_weekly_and_monthly: true,
    has_empty_bars: true,
    volume_precision: 2,
    has_intraday: true,
  };
  return Promise.resolve(symbolInfo);
}

function buildData() {
  return {
    bars: [
      { time: 1510185600000, close: 43.33, open: 44.71, high: 44.71, low: 43.11, volume: 7661245 },
      { time: 1510272000000, close: 43.01, open: 42.93, high: 44.46, low: 42.75, volume: 4441527 },
      { time: 1510531200000, close: 43.13, open: 42.7, high: 43.87, low: 42.55, volume: 3162683 },
      { time: 1510617600000, close: 41.87, open: 42.9, high: 42.9, low: 40.62, volume: 8095739 },
      { time: 1510704000000, close: 42.21, open: 41.27, high: 42.37, low: 40.73, volume: 4726434 },
      { time: 1510790400000, close: 42.3, open: 42.68, high: 43.08, low: 42.06, volume: 3328098 },
      { time: 1510876800000, close: 43.4, open: 42, high: 43.6, low: 42, volume: 3569042 },
      { time: 1511136000000, close: 42.21, open: 42.29, high: 42.55, low: 41.75, volume: 4844213 },
      { time: 1511222400000, close: 41.39, open: 42.73, high: 42.73, low: 40.22, volume: 6257368 },
      { time: 1511308800000, close: 42.64, open: 41.84, high: 42.68, low: 41.775, volume: 3252334 },
      { time: 1511481600000, close: 42.21, open: 42.8, high: 42.9, low: 42.09, volume: 1306136 },
      { time: 1511740800000, close: 42.04, open: 42.15, high: 42.42, low: 41.49, volume: 3091740 },
      { time: 1511827200000, close: 43.3, open: 41.81, high: 43.75, low: 41.2099, volume: 6890455 },
      { time: 1511913600000, close: 41.24, open: 42.19, high: 42.32, low: 40.8, volume: 4938497 },
      { time: 1512000000000, close: 41.51, open: 41.5, high: 42.16, low: 41.13, volume: 4371334 },
      { time: 1512086400000, close: 41.64, open: 41.82, high: 42.3, low: 40.521, volume: 3750919 },
      { time: 1512345600000, close: 41.79, open: 41.87, high: 42.6, low: 41.5, volume: 2709750 },
      { time: 1512432000000, close: 41.18, open: 41.37, high: 41.86, low: 40.95, volume: 2852505 },
      { time: 1512518400000, close: 41.31, open: 40.8, high: 41.49, low: 40.3, volume: 5437502 },
      { time: 1512604800000, close: 40.6, open: 41.13, high: 41.19, low: 40.27, volume: 3423427 },
      { time: 1512691200000, close: 41.4, open: 41, high: 41.77, low: 40.9, volume: 3696876 },
      { time: 1512950400000, close: 42.24, open: 41.54, high: 42.98, low: 41.54, volume: 4053037 },
      { time: 1513036800000, close: 42.4, open: 42.39, high: 42.88, low: 42.185, volume: 3421527 },
      { time: 1513123200000, close: 41.86, open: 42.45, high: 42.57, low: 41.715, volume: 4146231 },
      { time: 1513209600000, close: 42.35, open: 42.05, high: 42.375, low: 41.96, volume: 3683921 },
      { time: 1513296000000, close: 42.61, open: 42.85, high: 43.14, low: 42.28, volume: 4516172 },
      { time: 1513555200000, close: 44.57, open: 42.775, high: 44.69, low: 42.76, volume: 3149371 },
      { time: 1513641600000, close: 46.52, open: 44.77, high: 46.54, low: 44.66, volume: 5960166 },
      {
        time: 1513728000000,
        close: 49.26,
        open: 48.191,
        high: 49.67,
        low: 47.6287,
        volume: 7158759,
      },
      { time: 1513814400000, close: 48.99, open: 49.57, high: 49.68, low: 48.77, volume: 3046872 },
      { time: 1513900800000, close: 49.99, open: 49.15, high: 50.04, low: 48.81, volume: 2427508 },
      { time: 1514246400000, close: 50.38, open: 49.98, high: 50.5, low: 49.21, volume: 2750631 },
      { time: 1514332800000, close: 51.84, open: 50.55, high: 51.93, low: 50.2, volume: 2959469 },
      { time: 1514419200000, close: 54.14, open: 52.05, high: 54.2, low: 52.021, volume: 5696354 },
      { time: 1514505600000, close: 53.87, open: 54, high: 54.61, low: 53.52, volume: 5170353 },
      { time: 1514851200000, close: 55.17, open: 54.06, high: 55.22, low: 53.91, volume: 2928905 },
      { time: 1514937600000, close: 54.5, open: 54.92, high: 55.15, low: 52.96, volume: 4097542 },
      { time: 1515024000000, close: 54.7, open: 54.81, high: 55.43, low: 54.075, volume: 3555120 },
      { time: 1515110400000, close: 54.09, open: 54.65, high: 54.66, low: 53.41, volume: 3370371 },
      { time: 1515369600000, close: 55, open: 53.96, high: 56.15, low: 53.66, volume: 5028059 },
      { time: 1515456000000, close: 54.2, open: 55, high: 55.08, low: 54, volume: 3532952 },
      { time: 1515542400000, close: 56.17, open: 54.37, high: 56.26, low: 54.23, volume: 5004005 },
      { time: 1515628800000, close: 56.91, open: 56.6, high: 57.13, low: 55.87, volume: 2725478 },
      { time: 1515715200000, close: 56.76, open: 57.05, high: 57.5, low: 56.11, volume: 4191608 },
      { time: 1516060800000, close: 56.24, open: 56.09, high: 57.04, low: 55.46, volume: 3824593 },
      {
        time: 1516147200000,
        close: 56.99,
        open: 56.03,
        high: 57.0399,
        low: 55.58,
        volume: 7635962,
      },
      { time: 1516233600000, close: 53, open: 53.67, high: 53.87, low: 51.72, volume: 19419475 },
      { time: 1516320000000, close: 53.1, open: 52.86, high: 53.68, low: 52.55, volume: 5753662 },
      { time: 1516579200000, close: 52.94, open: 52.8, high: 53.9, low: 52.261, volume: 4174194 },
      { time: 1516665600000, close: 52.49, open: 52.34, high: 52.9, low: 51.73, volume: 4883081 },
      { time: 1516752000000, close: 53.3, open: 52.9, high: 53.8525, low: 52.39, volume: 2520675 },
      { time: 1516838400000, close: 53.11, open: 53.74, high: 53.89, low: 52.72, volume: 3744040 },
      { time: 1516924800000, close: 54, open: 53.55, high: 54.4, low: 53.28, volume: 2745616 },
      {
        time: 1517184000000,
        close: 54.49,
        open: 53.89,
        high: 54.6299,
        low: 53.52,
        volume: 4630861,
      },
      { time: 1517270400000, close: 52.52, open: 53.67, high: 53.97, low: 52.52, volume: 3612659 },
      { time: 1517356800000, close: 52.02, open: 52.75, high: 53.36, low: 51.25, volume: 4470149 },
      { time: 1517443200000, close: 52.42, open: 51.41, high: 52.5, low: 51.27, volume: 3175232 },
      { time: 1517529600000, close: 49.09, open: 52, high: 52, low: 49, volume: 6057643 },
      { time: 1517788800000, close: 48.46, open: 48.61, high: 50.75, low: 47.8, volume: 3861760 },
      { time: 1517875200000, close: 49.43, open: 47.44, high: 50.2, low: 47.28, volume: 3140711 },
      { time: 1517961600000, close: 47.7, open: 49.23, high: 49.42, low: 47.67, volume: 3175247 },
      { time: 1518048000000, close: 45.98, open: 47.81, high: 48.24, low: 45.53, volume: 3896943 },
      { time: 1518134400000, close: 45.92, open: 46.54, high: 47.06, low: 44.15, volume: 4569076 },
      { time: 1518393600000, close: 46.65, open: 46.05, high: 47.13, low: 45.77, volume: 3495865 },
      { time: 1518480000000, close: 47.3, open: 46.39, high: 47.98, low: 46.12, volume: 2805323 },
      { time: 1518566400000, close: 48.54, open: 46.71, high: 48.65, low: 46.52, volume: 2427324 },
      {
        time: 1518652800000,
        close: 47.57,
        open: 48.99,
        high: 48.99,
        low: 46.1901,
        volume: 5101632,
      },
      { time: 1518739200000, close: 47.36, open: 47.5, high: 50.18, low: 46.52, volume: 8372208 },
      {
        time: 1519084800000,
        close: 48.07,
        open: 46.84,
        high: 48.7399,
        low: 46.76,
        volume: 4581817,
      },
      { time: 1519171200000, close: 47.55, open: 48.21, high: 48.95, low: 47.23, volume: 3185582 },
      { time: 1519257600000, close: 48.01, open: 48.01, high: 48.4, low: 46.83, volume: 4217919 },
      { time: 1519344000000, close: 46.7, open: 48.06, high: 48.14, low: 46.5841, volume: 3083368 },
      { time: 1519603200000, close: 46.68, open: 47.42, high: 47.58, low: 46.14, volume: 3553755 },
      { time: 1519689600000, close: 46.22, open: 46.5, high: 47.17, low: 45.657, volume: 3223727 },
      { time: 1519776000000, close: 44.97, open: 46.25, high: 46.84, low: 44.94, volume: 2829506 },
      { time: 1519862400000, close: 45.07, open: 45.93, high: 46.44, low: 44.58, volume: 6501728 },
      { time: 1519948800000, close: 45.54, open: 44.72, high: 46.18, low: 44.14, volume: 3707749 },
      { time: 1520208000000, close: 45.65, open: 45.18, high: 46.46, low: 44.85, volume: 4587974 },
      { time: 1520294400000, close: 46.99, open: 46.19, high: 47.52, low: 46.03, volume: 4430024 },
      { time: 1520380800000, close: 47.88, open: 46.6, high: 48.26, low: 46.4006, volume: 3654749 },
      { time: 1520467200000, close: 47.47, open: 47.88, high: 48.73, low: 46.545, volume: 3105316 },
      { time: 1520553600000, close: 47.86, open: 48.05, high: 48.59, low: 47.23, volume: 2761992 },
      {
        time: 1520812800000,
        close: 48.36,
        open: 48.01,
        high: 48.6799,
        low: 47.91,
        volume: 1489039,
      },
      { time: 1520899200000, close: 48.59, open: 48.43, high: 49.85, low: 48.43, volume: 2738974 },
      { time: 1520985600000, close: 46.57, open: 49.09, high: 49.43, low: 46.21, volume: 3696049 },
      { time: 1521072000000, close: 46.93, open: 46.45, high: 47.13, low: 45.71, volume: 2998802 },
      { time: 1521158400000, close: 47.23, open: 46.8, high: 47.9186, low: 46.74, volume: 2815649 },
      { time: 1521417600000, close: 46.36, open: 47.03, high: 47.68, low: 45.76, volume: 2498132 },
      { time: 1521504000000, close: 46.47, open: 46.37, high: 47.06, low: 46.05, volume: 1506443 },
      {
        time: 1521590400000,
        close: 47.95,
        open: 46.42,
        high: 48.0615,
        low: 46.31,
        volume: 2104409,
      },
      { time: 1521676800000, close: 44.92, open: 47.4, high: 48.089, low: 44.86, volume: 4312329 },
      { time: 1521763200000, close: 44.71, open: 45.17, high: 46, low: 44.6, volume: 3221848 },
      {
        time: 1522022400000,
        close: 45.77,
        open: 45.26,
        high: 46.53,
        low: 44.2698,
        volume: 5152476,
      },
      { time: 1522108800000, close: 44.9, open: 46.25, high: 46.49, low: 44.635, volume: 2889304 },
    ],
    meta: { noData: true },
  };
}

export function DataFeed(symbol, timezone = 'Asia/Shanghai', pricescale = 0) {
  var self = this;
  this.symbol = symbol;
  this.timezone = timezone;
  this.pricescale = pricescale;

  this.setSymbol = function(symbol, pricescale = 0) {
    this.symbol = symbol;
    this.pricescale = pricescale;
  };

  this.onReady = function(callback) {
    //不需要从服务器拉取配置信息
    //setTimeout(callback({DefaultConfiguration});
    setTimeout(() => {
      callback(DefaultConfiguration);
    });
  };

  this.getBars = function(symbolInfo, resolution, from, to, onResult, onError, firstTime) {
    //
    console.log('++++++++++++');
    console.log(from, to, firstTime);
    console.log(resolution);
    const [startTime, endTime] = [String(Math.min(from, to)), String(Math.max(from, to))];
    const interval = getInterval(resolution);

    var result = buildData();

    onResult(result.bars, result.meta);
  };

  this.resolveSymbol = function(symbolName, onResolve, onError) {
    BuildSymbolInfo(symbolName, self.pricescale, self.timezone).then(onResolve);
  };

  this.subscribeBars = function(
    symbolInfo,
    resolution,
    onTick,
    listenerGuid,
    onResetCacheNeededCallback
  ) {
    //this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
    console.log('subscribeBars');
    console.log(symbolInfo, resolution, listenerGuid);
  };

  this.unsubscribeBars = function(listenerGuid) {
    //this._dataPulseProvider.unsubscribeBars(listenerGuid);
  };
}

// DataFeed.prototype.onReady = function(callback) {
//   //不需要从服务器拉取配置信息
//   //setTimeout(callback({DefaultConfiguration});
//   setTimeout(() => {
//     callback(DefaultConfiguration);
//   });
// };

// DataFeed.prototype.getBars = function(
//   symbolInfo,
//   resolution,
//   from,
//   to,
//   onResult,
//   onError,
//   firstTime
// ) {
//   var result = buildData();

//   onResult(result.bars, result.meta);
// };

// DataFeed.prototype.resolveSymbol = function(symbolName, onResolve, onError) {

//   BuildSymbolInfo('btcusdt', 2).then(onResolve);
// };
// DataFeed.prototype.subscribeBars = function(
//   symbolInfo,
//   resolution,
//   onTick,
//   listenerGuid,
//   onResetCacheNeededCallback
// ) {
//   //this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
//   console.log('subscribeBars');
// };
// DataFeed.prototype.unsubscribeBars = function(listenerGuid) {
//   //this._dataPulseProvider.unsubscribeBars(listenerGuid);
// };
//console.log(DataFeed)
