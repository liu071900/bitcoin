import React, { Component } from 'react';
import { min, max } from 'lodash';
import { connect } from 'dva';
import { orderBy, ceil, floor } from 'lodash';
import Highcharts from 'highcharts/highstock';

const HEIHGT = 360;
const WIDTH = 640;
//格式化数据，如 1000 格式化为 1k，1000000 格式化为1M
function nFormatter(num, digits) {
  const si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "K" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
          break;
      }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}


function transformAsksToDeepth(asks) {
  let rawAsks = orderBy(asks, ['price'], ['asc']);
  // rawAsks = rawAsks.slice(0,10)
  let askData = [];
  let total = 0;
  for (let i = 0; i < rawAsks.length; i++) {
    let rawAsk = rawAsks[i];
    let price = rawAsk.price;
    let vol = rawAsk.vol;
    total += vol;
    askData.push([price,total]);
  }
  return askData;
}

function transformBidsToDeepth(bids) {
  let rawBids = bids.concat([]);
  //
  //rawBids = rawBids.slice(0,10)
  let bidData = [];
  let total = 0;

  for (let i = 0; i < rawBids.length; i++) {
    let rawBid = rawBids[i];
    let price = rawBid.price;
    let vol = rawBid.vol;
    total += vol;
    bidData.push([price,total]);
  }
  return bidData.reverse();
}


// @connect(({ market }) => ({
//   asks: market.rawAsks,
//   bids: market.rawBids,
//   pricePrecision:market.pricePrecision,
// }))
export default class DeepChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: [],
      asks: [],
      height: props.height || 360,
      width: props.width || 640,
    };
  }

  componentWillReceiveProps(nprops) {
    let { asks, bids } = nprops;
    asks = asks||[];
    bids = bids || [];
    if (asks.length > 1 && bids.length > 1) {
      this.setState({ asks: transformAsksToDeepth(asks), bids: transformBidsToDeepth(bids) });
    }
  }

 
  componentDidUpdate(){
    let { asks, bids } = this.state;
    if(!asks.length || !bids){
      return
    }else{

    }
    let {pricePrecision} = this.props;
    this.chart.update({
      series:[{
        name:'Bids',
        data:bids
      },{
        name:'Asks',
        data:asks
      },],
      xAxis:{
        labels:{
          formatter:function(){
            return this.value.toFixed(pricePrecision)
          },
        }
      }
    })
  }

  componentDidMount(){
    let { asks, bids } = this.state;
    this.chart = Highcharts.chart('highchart_deepChart', {
      chart: {
        type: 'area',
        zoomType: 'xy',
        height:375,
        width:640,
        marginRight:50,
        marginLeft:0,
        //animation:false
      },
      title: {
        text: ''
      },
      xAxis: {
        minPadding: 0.01,
        maxPadding: 0,
      },
      yAxis: [{
        lineWidth: 1,
        gridLineWidth: 1,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        visible:false,
        labels: {
          align: 'left',
          x: 8
        }
      }, {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'outline',
        labels: {
          align: 'left',
          x: 8,
          formatter(){
            return nFormatter(this.value,2);            
          }
        }
      }],
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillOpacity: 0.2,
          lineWidth: 1,
          step: 'center',
          marker:{
            enabled:false
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
        valueDecimals: 2
      },

      series: [{
        name: 'Bids',
        data:bids,
        color: 'rgb(37, 179, 106)'
      }, {
        name: 'Asks',
        data:asks,
        color: 'rgb(242, 92, 72)'
      }]
    });

  }


  render() {
  
    return (
    <div id='highchart_deepChart'>
        
    </div>);
  }
}
