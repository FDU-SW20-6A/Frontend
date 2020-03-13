import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/A61.png';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>
            </div>
            <div className={styles.desc}>{formatMessage({id: 'user-login.title.label'})}</div>
          </div>
          {children}
        </div>
        <DefaultFooter 
        copyright={formatMessage({id: 'layout.footer'})}
        links={[
          {
            key: 'github',
            title: <Icon type="github" />,
            href: 'https://github.com/FDU-SW20-6A/Covid-19',
            blankTarget: true,
          },
        ]}/>
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
