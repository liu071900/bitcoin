import { getErrorMessage, logMessage } from './helpers';
import HistoryProvider  from './history-provider';
import  DataPulseProvider  from './data-pulse-provider';
import QuotesPulseProvider  from './quotes-pulse-provider';
import  SymbolsStorage  from './symbols-storage';
function extractField(data, field, arrayIndex) {
  var value = data[field];
  return Array.isArray(value) ? value[arrayIndex] : value;
}

function buildData() {
  return {
    bars: [
      { time: 1508976000000, close: 49.15, open: 49.52, high: 49.73, low: 48.52, volume: 3463408 },
      { time: 1509062400000, close: 47.91, open: 47.835, high: 48.25, low: 47.01, volume: 3854884 },
      { time: 1509321600000, close: 47.42, open: 47.75, high: 48.38, low: 47.37, volume: 2068082 },
      { time: 1509408000000, close: 47.78, open: 47.15, high: 48.07, low: 46.38, volume: 2717532 },
      { time: 1509494400000, close: 47.7, open: 48.91, high: 49.27, low: 47.45, volume: 3174620 },
      {
        time: 1509580800000,
        close: 47.46,
        open: 47.68,
        high: 47.7671,
        low: 47.07,
        volume: 2057632,
      },
      { time: 1509667200000, close: 47.12, open: 47.25, high: 47.43, low: 46.71, volume: 1837775 },
      { time: 1509926400000, close: 47.29, open: 47.2, high: 47.68, low: 46.53, volume: 1725268 },
      {
        time: 1510012800000,
        close: 46.97,
        open: 47.11,
        high: 47.2042,
        low: 46.54,
        volume: 2163621,
      },
    ],
    meta: { noData: true },
  };
}

/**
 * This class implements interaction with UDF-compatible datafeed.
 * See UDF protocol reference at https://github.com/tradingview/charting_library/wiki/UDF
 */
var UDFCompatibleDatafeedBase = /** @class */ (function() {
  function UDFCompatibleDatafeedBase(datafeedURL, quotesProvider, requester, updateFrequency) {
    if (updateFrequency === void 0) {
      updateFrequency = 10 * 1000;
    }
    var _this = this;
    this._configuration = defaultConfiguration();
    this._symbolsStorage = null;
    this._datafeedURL = datafeedURL;
    this._requester = requester;
    this._historyProvider = new HistoryProvider(datafeedURL, this._requester);
    this._quotesProvider = quotesProvider;
    this._dataPulseProvider = new DataPulseProvider(this._historyProvider, updateFrequency);
    this._quotesPulseProvider = new QuotesPulseProvider(this._quotesProvider);
    this._configurationReadyPromise = this._requestConfiguration().then(function(configuration) {
      if (configuration === null) {
        configuration = defaultConfiguration();
      }
      configuration = [];
      _this._setupWithConfiguration(configuration);
    });
  }

  UDFCompatibleDatafeedBase.prototype.onReady = function(callback) {
    var _this = this;
    setTimeout(() => {
      callback({});
    });
    // this._configurationReadyPromise.then(function () {
    //     //callback(_this._configuration);
    //     callback();
    // });
  };
  // UDFCompatibleDatafeedBase.prototype.getQuotes = function (symbols, onDataCallback, onErrorCallback) {
  //     this._quotesProvider.getQuotes(symbols).then(onDataCallback).catch(onErrorCallback);
  // };

  // UDFCompatibleDatafeedBase.prototype.subscribeQuotes = function (symbols, fastSymbols, onRealtimeCallback, listenerGuid) {
  //     this._quotesPulseProvider.subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid);
  // };

  // UDFCompatibleDatafeedBase.prototype.unsubscribeQuotes = function (listenerGuid) {
  //     this._quotesPulseProvider.unsubscribeQuotes(listenerGuid);
  // };

  UDFCompatibleDatafeedBase.prototype.calculateHistoryDepth = function(
    resolution,
    resolutionBack,
    intervalBack
  ) {
    return undefined;
  };

  // UDFCompatibleDatafeedBase.prototype.getMarks = function (symbolInfo, startDate, endDate, onDataCallback, resolution) {
  //     if (!this._configuration.supports_marks) {
  //         return;
  //     }
  //     var requestParams = {
  //         symbol: symbolInfo.ticker || '',
  //         from: startDate,
  //         to: endDate,
  //         resolution: resolution,
  //     };
  //     this._send('marks', requestParams)
  //         .then(function (response) {
  //         if (!Array.isArray(response)) {
  //             var result = [];
  //             for (var i = 0; i < response.id.length; ++i) {
  //                 result.push({
  //                     id: extractField(response, 'id', i),
  //                     time: extractField(response, 'time', i),
  //                     color: extractField(response, 'color', i),
  //                     text: extractField(response, 'text', i),
  //                     label: extractField(response, 'label', i),
  //                     labelFontColor: extractField(response, 'labelFontColor', i),
  //                     minSize: extractField(response, 'minSize', i),
  //                 });
  //             }
  //             response = result;
  //         }
  //         onDataCallback(response);
  //     })
  //         .catch(function (error) {
  //         logMessage("UdfCompatibleDatafeed: Request marks failed: " + getErrorMessage(error));
  //         onDataCallback([]);
  //     });
  // };

  UDFCompatibleDatafeedBase.prototype.getTimescaleMarks = function(
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) {
    if (!this._configuration.supports_timescale_marks) {
      return;
    }
    var requestParams = {
      symbol: symbolInfo.ticker || '',
      from: startDate,
      to: endDate,
      resolution: resolution,
    };
    this._send('timescale_marks', requestParams)
      .then(function(response) {
        if (!Array.isArray(response)) {
          var result = [];
          for (var i = 0; i < response.id.length; ++i) {
            result.push({
              id: extractField(response, 'id', i),
              time: extractField(response, 'time', i),
              color: extractField(response, 'color', i),
              label: extractField(response, 'label', i),
              tooltip: extractField(response, 'tooltip', i),
            });
          }
          response = result;
        }
        onDataCallback(response);
      })
      .catch(function(error) {
        logMessage(
          'UdfCompatibleDatafeed: Request timescale marks failed: ' + getErrorMessage(error)
        );
        onDataCallback([]);
      });
  };

  UDFCompatibleDatafeedBase.prototype.getServerTime = function(callback) {
    if (!this._configuration.supports_time) {
      return;
    }
    this._send('time')
      .then(function(response) {
        var time = parseInt(response);
        if (!isNaN(time)) {
          callback(time);
        }
      })
      .catch(function(error) {
        logMessage(
          'UdfCompatibleDatafeed: Fail to load server time, error=' + getErrorMessage(error)
        );
      });
  };

  // UDFCompatibleDatafeedBase.prototype.searchSymbols = function (userInput, exchange, symbolType, onResult) {
  //     if (this._configuration.supports_search) {
  //         var params = {
  //             limit: 30 /* SearchItemsLimit */,
  //             query: userInput.toUpperCase(),
  //             type: symbolType,
  //             exchange: exchange,
  //         };
  //         this._send('search', params)
  //             .then(function (response) {
  //             if (response.s !== undefined) {
  //                 logMessage("UdfCompatibleDatafeed: search symbols error=" + response.errmsg);
  //                 onResult([]);
  //                 return;
  //             }
  //             onResult(response);
  //         })
  //             .catch(function (reason) {
  //             logMessage("UdfCompatibleDatafeed: Search symbols for '" + userInput + "' failed. Error=" + getErrorMessage(reason));
  //             onResult([]);
  //         });
  //     }
  //     else {
  //         if (this._symbolsStorage === null) {
  //             throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
  //         }
  //         this._symbolsStorage.searchSymbols(userInput, exchange, symbolType, 30 /* SearchItemsLimit */)
  //             .then(onResult)
  //             .catch(onResult.bind(null, []));
  //     }
  // };

  UDFCompatibleDatafeedBase.prototype.resolveSymbol = function(symbolName, onResolve, onError) {
    logMessage('Resolve requested');
    var resolveRequestStartTime = Date.now();
    function onResultReady(symbolInfo) {
      logMessage('Symbol resolved: ' + (Date.now() - resolveRequestStartTime) + 'ms');
      onResolve(symbolInfo);
    }
    if (!this._configuration.supports_group_request) {
      var params = {
        symbol: symbolName,
      };
      this._send('symbols', params)
        .then(function(response) {
          if (response.s !== undefined) {
            onError('unknown_symbol');
          } else {
            onResultReady(response);
          }
        })
        .catch(function(reason) {
          logMessage('UdfCompatibleDatafeed: Error resolving symbol: ' + getErrorMessage(reason));
          onError('unknown_symbol');
        });
    } else {
      if (this._symbolsStorage === null) {
        throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
      }
      this._symbolsStorage
        .resolveSymbol(symbolName)
        .then(onResultReady)
        .catch(onError);
    }
  };

  UDFCompatibleDatafeedBase.prototype.getBars = function(
    symbolInfo,
    resolution,
    rangeStartDate,
    rangeEndDate,
    onResult,
    onError
  ) {
    console.log(symbolInfo, resolution);
    console.log(rangeStartDate, rangeEndDate);
    this._historyProvider
      .getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate)
      .then(function(result) {
        console.log(JSON.stringify(result));
        onResult(result.bars, result.meta);
      })
      .catch(onError);
    // let result = buildData();
    // onResult(result.bars, result.meta)
  };

  UDFCompatibleDatafeedBase.prototype.subscribeBars = function(
    symbolInfo,
    resolution,
    onTick,
    listenerGuid,
    onResetCacheNeededCallback
  ) {
    //console.log('subscribeBars',symbolInfo, resolution, onTick, listenerGuid)
    //this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
  };
  UDFCompatibleDatafeedBase.prototype.unsubscribeBars = function(listenerGuid) {
    console.log('unsubscribeBars');
    this._dataPulseProvider.unsubscribeBars(listenerGuid);
  };
  UDFCompatibleDatafeedBase.prototype._requestConfiguration = function() {
    return this._send('config').catch(function(reason) {
      logMessage(
        'UdfCompatibleDatafeed: Cannot get datafeed configuration - use default, error=' +
          getErrorMessage(reason)
      );
      return null;
    });
  };
  UDFCompatibleDatafeedBase.prototype._send = function(urlPath, params) {
    return this._requester.sendRequest(this._datafeedURL, urlPath, params);
  };
  UDFCompatibleDatafeedBase.prototype._setupWithConfiguration = function(configurationData) {
    this._configuration = configurationData;
    if (configurationData.exchanges === undefined) {
      configurationData.exchanges = [];
    }
    this._symbolsStorage = new SymbolsStorage(
      this._datafeedURL,
      configurationData.supported_resolutions || [],
      this._requester
    );
    // if (!configurationData.supports_search && !configurationData.supports_group_request) {
    //     throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
    // }
    // if (configurationData.supports_group_request || !configurationData.supports_search) {
    //     this._symbolsStorage = new SymbolsStorage(this._datafeedURL, configurationData.supported_resolutions || [], this._requester);
    // }
    // logMessage("UdfCompatibleDatafeed: Initialized with " + JSON.stringify(configurationData));
  };
  return UDFCompatibleDatafeedBase;
})();
export { UDFCompatibleDatafeedBase };
function defaultConfiguration() {
  return {
    supports_search: false,
    supports_group_request: true,
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    supports_marks: false,
    supports_timescale_marks: false,
  };
}
