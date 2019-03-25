import { getErrorMessage, logMessage } from './helpers';

export default class SymbolStorage {
  constructor() {}

  resolveSymbol(symbol, pricescale = 1, volPrecision=3,timezone = 'Asia/Shanghai',) {
    let symbolInfo = {
      ticker: symbol,
      name: symbol,
      base_name: symbol,
      full_name: symbol,
      // listed_exchange: 'kcex', //
      // exchange: 'kcex', //
      description: symbol, //描述信息
      has_intraday: false,
      has_no_volume: false,
      minmov: 1,
      pricescale: pricescale, //价格精度
      minmove2:0,
      type: 'stock',
      session: '24x7',
      timezone: timezone,
      force_session_rebuild: false,
      has_daily: true,
      has_weekly_and_monthly: true,
      has_empty_bars: false,
      volume_precision: volPrecision,//成交量精度
      has_intraday: true,
      data_status:'streaming',

    };
    return Promise.resolve(symbolInfo);
  }
}
