import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';

import { connect } from 'dva';
import router from 'umi/router';
import styles from './Header.less';
import Link from 'umi/link';
import { Menu, Dropdown, Icon } from 'antd';
import TabNav from '@/components/Kcex/TabNav';
import logo from '../assets/logo.svg';


class KcexHeader extends Component {
  state = {
    visible: true,
    activeKey:''
  };
  switchNav(key){
    this.setState({
      activeKey:key
    })
  }
  render() {

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          简体中文
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            English
          </a>
        </Menu.Item>
      </Menu>
    );

    let items = [{
      key:'bibi',
      text:'币币交易'
    },{
        key:'heyue',
        text:'合约交易'
    },{
      key:'info',
      text:'合约信息'
    },{
      key:'kefu',
      text:'客服咨询'
  }
]
    let {activeKey} = this.state;
    return (<div className={styles.header}>
        {/* 顶部信息 */}
        <div className={styles.top}>

          <div className={styles.content}>
            {/* 左边部分 */}
            <ul className='kcex-ul-vlist'>
                <li>
                  <a className={styles.textA}>问题反馈</a>
                </li>

                <li>
                  <a className={styles.textA}>API接入</a>
                </li>

                <li>
                  <a className={styles.textA}>使用指南</a>
                </li>
                <li>
                  <a className={styles.textA}>合约指南</a>
                </li>
                <li>
                  <a className={styles.textA}>项目中心</a>
                </li>
                <li>
                  <a className={styles.textA}>投票上币</a>
                </li>
            </ul>
            
            {/* 右边部分 */}
            <ul className='kcex-ul-vlist' >
                <li>
                  <a className={styles.textA}>公告中心</a>
                </li>

                <li>
                  <a className={styles.textA}>关于我们</a>
                </li>

                <li>
                  <a className={styles.textA}>App下载</a>
                </li>

                <li>
                  <Dropdown overlay={menu}>
                    <a className={styles.textA} href="#">
                      简体中文 <Icon type="down" />
                    </a>
                  </Dropdown>
                </li>
            </ul>

          </div>
        
        </div>
        {/* 下部导航栏 */}
        <div className={styles.bottom}>

          <div className={styles.content}>

              <div style={{display:'flex'}}>

                  <div style={{marginRight:60}}>
                    <Link to="/index">
                      <img src={logo} alt="logo" height='24'/>
                    </Link>
                  </div>

                  <ul className={styles.tabContainer} style={{width:300}}>
                      <li className={`${styles.tabItem} ${activeKey==='bibi'?styles.activeTabItem:'' }`} 
                      onClick = {this.switchNav.bind(this,'bibi')}
                      >币币交易</li>
                      <li className={`${styles.tabItem} ${activeKey==='heyue'?styles.activeTabItem:'' }`}
                      onClick = {this.switchNav.bind(this,'heyue')}
                      >合约交易</li>
                      <li className={`${styles.tabItem} ${activeKey==='xinxi'?styles.activeTabItem:'' }`}
                      onClick = {this.switchNav.bind(this,'xinxi')}
                      >合约信息</li>
                      <li className={`${styles.tabItem} ${activeKey==='kefu'?styles.activeTabItem:'' }`}
                      onClick = {this.switchNav.bind(this,'kefu')}
                      >客服咨询</li>
                  </ul>
              </div>
              <div>
              </div>
          </div>

        </div>

    </div>)
  }
}

export default KcexHeader;
