/**
 * 排序组件
 * 2019-03-06 15：57
 * by liulifu
 */

import React, { PureComponent } from 'react';
import { Icon } from 'antd';

class SortIcon extends React.PureComponent{
    
    constructor(props){
        super(props)
        this.state = {
            up:true
        }
    }
    onClick(){
        let {onToggle}=this.props;
        let {up} = this.state;
        this.setState({
            up:!up
        })
        typeof onToggle==='function' && onToggle(up?'up':'down');
    }
    render(){
        let {text,active} = this.props;
        let color = active?'#333333':'#999999'; 
        let {up} = this.state;

        return<span style={{cursor:'pointer'}} onClick={this.onClick.bind(this)}>
            <span>{text}</span>
            <span style={{marginLeft:2,color:color,verticalAlign:'middle'}}>
                {
                    up?<Icon type="caret-up" style={{fontSize:14}}/>:<Icon style={{fontSize:14}} type="caret-down" />
                }
                
            </span>
            
        </span>
    }
}

export default SortIcon;