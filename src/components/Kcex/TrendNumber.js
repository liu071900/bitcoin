/**
 * 用颜色标识数字的变化组件
 * props:value string|| Number
 * 2019-03-05 16：53
 * by liulifu
 */

import React, { PureComponent } from 'react';

class TrendNumber extends React.PureComponent{
    
    constructor(props){
        super(props)
        this.state = {
            number:props.value.toString(),
            color:'#999999'
        }
    }
    componentWillReceiveProps(nprops){
        let {value} = nprops;
        let {number} = this.state;
        //'#25B36A'涨绿色  '#F25C48' 跌红色 
        let color= '#999999'; 
        if(number>value){
            color='#F25C48'
        }else if(number<value){
            color='#25B36A'
        }
        this.setState({
            number:value.toString(),
            color
        })
    }
    render(){
        let{number,color} = this.state;
        return(<span style={{color:color}}>{number}</span>)
    }
}

export default TrendNumber;