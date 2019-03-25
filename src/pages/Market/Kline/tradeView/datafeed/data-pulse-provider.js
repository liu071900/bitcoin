import { getErrorMessage, logMessage } from './helpers';
import { socket } from '@/utils/socket';

export default class DataPulseProvider {
  constructor() {
    this.parseToUrl = this.parseToUrl.bind(this);
  }

  parseToUrl(symbol, resolution) {
    let val = Number(resolution);
    let interval = '';
    if (resolution.includes('D')) {
      interval =  resolution;
    } else {
      if (val % 60) {
        interval = (val % 60) + 'm';
      } else {
        interval = (val/60) + 'H';
      }
    }

    return {
      op: 'SubcribeKline',
      time: new Date().getTime(),
      data: {
        symbol: symbol,
        interval: interval,
      },
    };
  }

  subscribeBars(symbolInfo, resolution, newDataCallback, listenerGuid) {
    let symbol = symbolInfo.name;
    let sendData = this.parseToUrl(symbol, resolution);

    socket.send(sendData);
    socket.on('KLines', res => {
      let { data } = res;
      // console.log(data.t)
      newDataCallback({
        time: data.t,
        close: data.c,
        open: data.o,
        high: data.h,
        low: data.l,
        volume: data.v,
      });
    });
  }

  unsubscribeBars(listenerGuid) {
    console.log(listenerGuid)

  }
}

