/**
 * input只输入数字
 * 2019-03-07 17:42
 * by liulifu 
 */

import React from 'react';
import numeral from 'numeral';
import { BigNumber } from 'bignumber.js';
import { Tooltip } from 'antd';
import styles from './InputNumber.less';

const pattern1 = new RegExp(/[^ 0-9\. ]|[\s+]/g); //去除非数字字符空格等非法 标识数字的字符
const patter2 = new RegExp(/^(\d+)(\.\d*)?/); //校验是否是数字
const SPEED = 50;

class _InputNumber extends React.PureComponent{

  constructor(props){

    super(props);
    this.state = {

    };

    this.upStep = this.upStep.bind(this);
    this.downStep = this.downStep.bind(this);

  }

  //鼠标按下
  handleNumberContronlMouseDown(side, e) {
    this.side = side;
    this.input.focus();
    this.timer = setInterval(() => {
      if (side === 'up') {
        this.upStep();
      } else {
        this.downStep();
      }
    }, SPEED);
    e.stopPropagation();
  }

  //鼠标松开
  handleNumberContronlMouseUp(side, e) {
    clearInterval(this.timer);
    if (side === 'up') {
      this.upStep();
    } else {
      this.downStep();
    }
    e.stopPropagation();
  }

  //微调，向上
  upStep() {
    let { step } = this.props;
    step = step ? step : 0.05;
    let value = this.input.value;
    if (value === '') {
      value = step;
    } else {
      value = new BigNumber(value).plus(step).toString();
    }
    value = this.checkLimt(value);
    this.setValue(value);
  }

  //微调，向下
  downStep() {
    let { step } = this.props;
    step = step ? step : 0.05;
    let value = this.input.value;
    if (value === '') {
      value = step;
    } else {
        value = new BigNumber(value).minus(step).toString();
    }
    value = this.checkLimt(value);
    this.setValue(value);
  }

  checkLimt(v){
    let {max,min,step} = this.props;
    step = step||0.05;
    max = max||999999;
    min = min||step;
    if(v<min){
        v=min
    }
    if(v>max){
        v=max
    }

    return v;
  }

 //上下键 按下事件
  onKeyDown(e) {
    let keyCode = e.keyCode;
    //return false
    if (keyCode === 38) {
      //key up
      this.upStep();
    } else if (keyCode === 40) {
      //key down
      this.downStep();
    }
    return false;
 }

 checkValue(value){
    let {step,max,min} = this.props;
    step = step||0.05;
    max = max||999999;
    min = min||step;
    step = step.toString();
    //1.替换非数字和.以外的字符
    value = value.replace(pattern1, '');
    //校验是否是数字和小数点构成的字符
    let ret = value.match(patter2);

    if (ret) {
        //取第一个匹配的结果
        value = ret[0];
    }

    let dot = value.split('.');
    //整数部分
    let intPart = dot[0];
    //小数部分
    let degPart = dot[1]||'';
    let limit = step.split('.')[1].length;

    if(degPart.length===limit){
        let last = degPart[limit-1];
        let standardLast = step[step.length-1];
        let result = last>=standardLast?standardLast:0;
        degPart = degPart.substr(0,limit-1)+result;
        value = intPart+'.'+ degPart;

        if(value<min){
            value = min.toString();
        }
    }

    if(degPart.length>limit){
        degPart = degPart.substr(0,limit);
        value = intPart+'.'+ degPart;
    }

    if(value[0]=='.' ){
        value = '0.'+degPart
    }

    if(value>max){
        value = max.toString();
    }
    return value
 }

  onChange(e){
    let value = this.input.value;
    value = this.checkValue(value);
    if(value[value.length-1]!=='.'){
        //用户输入完毕
        const {compeleted} = this.props;
        typeof compeleted ==='function' && compeleted()
    }
    this.value = value;
    this.input.value = value;
  }

  //api
  setValue(value){
    this.input.value = value;
  }

  //校验数字是否合法
  onBlur(){
    let value = this.input.value;
    let {max,min} = this.props;
    if(value>max){

    }else if(value<min){

    }else{

    }

  }

  getValue(){
    return this.input.value;
  }

  //对手价格按钮被点击
  onSuffixClick(){
    if(!this.input.disabled){
      this.input.disabled = true;
      this.value = this.input.value;
      this.input.value = '对手价';
    }
  }

  //input聚焦
  onInputClick(){
    this.input.disabled = false;
    this.input.value = this.value||'';
    this.input.focus()
  }

  render() {
    let {
      min,
      max,
      defaultValue,
      style,
      disabled,lable,
      hasSuffix,
      placeholder
    } = this.props;

    //disabled = true;
    return (<div style={{display:'flex',height:32,lineHeight:'32px',display:'flex',width:290,marginTop:10,position:'relative',border:'1px solid  #E6E6E6'}}>
      
      {/* label标签 */}
      <span className={styles.inputAddon} style={{lineHeight:'32px',width:60,}}>
        {lable}
      </span>

      {/* input 输入框 */}
      <Tooltip title="超过最大价格限制" visible={false}>
          <input 
          onClick = {this.onInputClick.bind(this)}
          onKeyDown = {this.onKeyDown.bind(this)}
          placeholder={placeholder}
          onChange={this.onChange.bind(this)} ref={(ref)=>this.input=ref} className='ant-input' 
          style={{width:230,height:32,border:0,color:'rgb(153, 153, 153)'}} disabled={disabled}/>
      </Tooltip>
      {
        disabled?null:<span style={{position:'absolute',top:4,right:0,height:24,display:'inline-flex',alignItems:'center'}}>
        <span style={{fontSize:12,color:'#999999',marginRight:8}}>USD</span>
        {/* 微调按钮 */}
        {
          hasSuffix?
          <Tooltip title="如果您开多/平空，则对手价为卖一价 如果您开空/平多，则对手价为买一价" >
            <span style={{fontSize:12}} onClick={this.onSuffixClick.bind(this)} className={styles.suffixBtn}>
              <a style={{borderBottom:'1px dashed'}}>对手价</a>
            </span>
          </Tooltip>:null
        }
        

      </span>
      }
      
    </div>
    );
  }
}
export default _InputNumber;