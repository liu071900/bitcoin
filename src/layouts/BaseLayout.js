import React, { Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';

import pathToRegexp from 'path-to-regexp';

import Media from 'react-media';

import PrivateRoute from '@/components/Authorized/PrivateRoute';
import Footer from './KcexFooter';

import Header from './KcexHeader';
import { Scrollbars } from 'react-custom-scrollbars';

import PageLoading from '@/components/PageLoading';
import styles from './BaseLayout.less';


// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BaseLayout extends React.Component {

  getRouteAuthority = (pathname, routeData) => {
    const routes = routeData.slice(); // clone
    const getAuthority = (routeDatas, path) => {
      let authorities;
      routeDatas.forEach(route => {
        // check partial route
        if (pathToRegexp(`${route.path}(.*)`).test(path)) {
          if (route.authority) {
            authorities = route.authority;
          }
          // is exact route?
          if (!pathToRegexp(route.path).test(path) && route.routes) {
            authorities = getAuthority(route.routes, path);
          }
        }
      });
      return authorities;
    };
    return getAuthority(routes, pathname);
  };


  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  render() {
    const {
      children,
      location: { pathname },
      isMobile,
      route: { routes },
    } = this.props;

    const routerConfig = this.getRouteAuthority(pathname, routes);
    const layout = (
        <Scrollbars
            style={{ width:window.innerWidth,  corsur: 'pointer',height:window.innerHeight }}
          >
        <div style={{width:window.innerWidth-7}}>
            <Header/>
            <div className={styles.warpper}>
                <div className={styles.container} style={{minHeight:window.innerHeight-160}}>
                    <PrivateRoute
                    authority={routerConfig}
                    loginState={true}
                    redirect='/user/login'
                    {...this.props}
                    >
                    {children}
                    </PrivateRoute>
                </div>
            </div>
                <Footer/>
        </div>
      </Scrollbars>
    );
    return (
      <React.Fragment>

          <ContainerQuery query={query}>
            {params => (
                <div className={classNames(params)}>{layout}</div>
            )}
          </ContainerQuery>

        <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BaseLayout {...props} isMobile={isMobile} />}
  </Media>
));
