
/**
 * 页面底部 布局
 * 2019-03-19 11:50
 * by liulifu 
 */


import React, { Fragment } from 'react';
import styles from './Footer.less';

class KcexFooter extends React.Component{

    constructor(props){
        super(props)
    }


    render(){

        return(<div className={styles.footer}>
                <div className={styles.content}>
                        {/* logo区域 */}
                        <ul>
                                <li></li>
                                <li><a href='javacript::void(0)'>请留意因加密货币价值变动可能造成的损失,不要过度投资市场有风险 投资需谨慎</a></li>
                                <li><a href='javacript::void(0)'>© 2017 - 2018 kcex.com. All rights reserved</a></li>
                                <li>
                                    <span>2018-09-10 15:42:02</span>
                                </li>
                        </ul>

                        <ul>
                            <li>公司信息</li>
                            <li><a>公司简介</a></li>
                            <li><a>关于我们</a></li>
                            <li><a>合作咨询</a></li>
                        </ul>

                        <ul>
                            <li>服务</li>
                            <li><a>合约指南</a></li>
                            <li><a>交易指南</a></li>
                            <li><a>常见问题</a></li>
                            <li><a>公告</a></li>
                        </ul>

                        <ul>
                            <li>联系我们</li>
                            <li><a>邮件咨询 : contact2@kcex.com</a></li>
                            <li><a>问题反馈</a></li>
                        </ul>

                        <ul>
                            <li>条款说明</li>
                            <li><a>用户协议</a></li>
                            <li><a>隐私条款</a></li>
                            <li><a>法律声明</a></li>
                            <li><a>费率标准</a></li>
                        </ul>

                        <ul>
                            <li>选择语言</li>
                            <li><a>用户协议</a></li>
                        </ul>
                </div>
        </div>)

    }
}


export default KcexFooter;
