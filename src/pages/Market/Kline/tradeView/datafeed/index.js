import { Promise } from 'es6-promise';
import SymbolStorage from './symbols-storage';
import HistoryProvider from './history-provider';
import DataPulseProvider from './data-pulse-provider';
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

export default class DataFeed {
  constructor(symbol, pricescale = 1000,volPrecision=3, timezone = 'Asia/Shanghai',) {
    this.symbol = symbol;
    this.timezone = timezone;
    this.pricescale = pricescale;//价格精度
    this.volPrecision = volPrecision;
    this._SymbolStorage = new SymbolStorage();
    this._HistoryProvider = new HistoryProvider();
    this._DataPulseProvider = new DataPulseProvider();
    
    this.onReady = this.onReady.bind(this);
    this.getBars = this.getBars.bind(this);
    this.resolveSymbol = this.resolveSymbol.bind(this);
    this.subscribeBars = this.subscribeBars.bind(this);
    this.unsubscribeBars = this.unsubscribeBars.bind(this);
    this.calculateHistoryDepth = this.calculateHistoryDepth.bind(this);
  }

  setSymbol(symbol, pricescale,volPrecision) {
    this.symbol = symbol;
    this.volPrecision = volPrecision
    this.pricescale = pricescale;
  }

  onReady(callback) {
    setTimeout(() => {
      callback(DefaultConfiguration);
    });
  }

  getBars(symbolInfo, resolution, from, to, onResult, onError, firstTime) {
    //const [startTime, endTime] = [String(Math.min(from, to)), String(Math.max(from, to))];
    this._HistoryProvider.getBars(symbolInfo, resolution, from, to, firstTime).then(result => {
      onResult(result.bars, result.meta);
    }).catch((error)=>{console.log(error)});
  }

  resolveSymbol(symbolName, onResolve, onError) {
    this._SymbolStorage.resolveSymbol(symbolName, this.pricescale, this.volPrecision,this.timezone,).then(onResolve);
  }

  //订阅k线
  subscribeBars(symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
    this._DataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
  }

  //取消订阅
  unsubscribeBars(listenerGuid) {
    this._DataPulseProvider.unsubscribeBars(listenerGuid);
  }

  calculateHistoryDepth(resolution, resolutionBack, intervalBack) {
    //return undefined
    //周期为 天
    if (resolution.includes('D')) {
      return {
        resolutionBack: 'D',
        intervalBack: 200,
      };
    //周期为 周
    } else if (resolution.includes('W')) {
      return {
        resolutionBack: 'M',
        intervalBack: 12,
      };
    //周期为月
    } else if (resolution.includes('M')) {
      return {
        resolutionBack: 'M',
        intervalBack: 36,
      };
    //周期为小时或者分钟
    } else {
      console.log('hakjdhkahsdkjabdkjasshdkjashdkjashdass')
      console.log((Number(intervalBack) * 200) /1440)
      return {
        resolutionBack: 'D',
        intervalBack: (Number(intervalBack) * 200) /1440,
      };
    }
  }

}
