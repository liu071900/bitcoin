/**
 * tab切换标签 组件
 * 2019-03-07 15：28
 * by liulifu
 */

import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

import styles from './TabNav.less';


class TabNav extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            activeKey:props.defaultKey
        }
    }

    onClick(key){
        let {onTab} = this.props;
        this.setState({
            activeKey:key
        })

        typeof onTab==='function' && onTab(key);

    }

    render(){
        let {items,style} = this.props;
        let {activeKey} = this.state;

        return<ul style={{margin:0,padding:0,...style}}>
            {
                items.map((item)=>{
                    let {key,text} = item;
                    let cls = classNames({
                        [styles.tabItem]:true,
                        [styles.activeTabItem]:key===activeKey,
                    })
                    return <li key={key} className={cls} onClick={this.onClick.bind(this,key)}>{text}</li>
                })
            }
        </ul>
    }
}

export default TabNav;