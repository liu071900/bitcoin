import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;


import {IconWarn,IconLock,IconEmail} from '@/components/Kcex/Icon';



@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {

    return (<div style={{display:'flex',padding:'178px 0 178px 0'}}>

        <div style={{color:'#DDDEEB', height:414,width:500,margin:'0 auto',padding:'30px 50px 30px 50px',border:'1px solid #DDDEEB',borderRadius:'4px'}}>
          
          <div style={{color:'#333333',fontSize:22}}>登陆</div>
          <div style={{height:18,lineHeight:'18px',marginTop:20}}>
              <IconWarn style={{fontSize:16,verticalAlign:'text-bottom'}}/>
              <span style={{paddingLeft:6,color:'#666666',fontSize:12}}>请确认登录的网址是否与以下的网址一致。</span>
          </div>
          <div style={{height:30,lineHeight:'30px',marginTop:10,backgroundColor:'#F5F5F5',borderRadius:15,paddingLeft:10}}>
              <IconLock style={{fontSize:16}}/>
              <span style={{paddingLeft:6}}>
                  <span style={{color:'#25843D'}}>https:</span>
                  <span style={{color:'#151515'}}>//www.kcex.com</span>
              </span>
          </div>
          <form>
              <div style={{border:'1px solid #DDDDDD',height:40}}>
                <span><IconEmail style={{fontSize:24}}/></span>

                <span>
                  <input/>
                </span>

              </div>

          </form>
        </div>

    </div>)
  }
}

export default LoginPage;
