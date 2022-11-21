import { Button } from 'antd';
import { request } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  const sendMsg = () => {
    request('/kook/api/v3/guild/list', {
      method: 'get',
      headers: {
        Authorization: 'Bot 1/MTIzOTA=/sLKLe6y6NcLOC0pXRZA2eA==',
        'Content-Type': 'application/json',
        // withCredentials: true,
      },
    });
    // http://39.103.173.19:3000
    // request('/kook/api/v3/message/create', {
    //   // request('https://api.warframestat.us/pc/zh/dailyDeals', {
    //   method: 'post',
    //   data: {
    //     target_id: '7870199141625705',
    //     content: 'umi3跨域配置测试',
    //   },
    //   headers: {
    //     Authorization: 'Bot 1/MTIzOTA=/sLKLe6y6NcLOC0pXRZA2eA==',
    //     'Content-Type': 'application/json',
    //     // withCredentials: true,
    //   },
    // });
    // request('/warframe/pc/zh/dailyDeals', {
    request('/warframe/wf/detail/news', {
      method: 'get'
    })
  };
  return (
    <div className={styles.box}>
      <Button type="primary" onClick={sendMsg}>
        信息
      </Button>
    </div>
  );
}
