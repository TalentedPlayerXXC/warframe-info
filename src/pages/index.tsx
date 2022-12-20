import { useState } from 'react';
import { get } from 'lodash';
import { Button } from 'antd';
// import { request } from 'umi';
import request from '@/utils/request';
import styles from './index.less';
import { useRequest } from 'umi';

export default function IndexPage() {
  const [state, setState] = useState({
    user_id: '',
    create_at: 0,
    demo: 'hello',
  });
  const { data, run } = useRequest(
    () => {
      return request('/kook/api/v3/message/list', {
        method: 'get',
        params: {
          target_id: '7870199141625705',
          page_size: 1,
        },
      }).then((datas) => {
        const item = get(datas, 'data.items[0]');
        const { author = {}, id, content, create_at } = item;
        if (
          item &&
          !author.client_id &&
          id !== state.user_id &&
          create_at !== state.create_at &&
          content === '突击'
        ) {
          // console.log(author.client_id)
          setState((s) => ({
            ...s,
            user_id: item?.id,
            create_at: create_at,
          }));
          request('/warframe/pc/zh/sortie', {
            method: 'get',
          }).then((res) => {
            const obj: any = [];
            if (res) {
              res?.variants.forEach((item: any) => {
                obj.push({
                  type: 'section',
                  mode: 'right',
                  text: {
                    type: 'plain-text',
                    content: `${item?.missionType},${item?.modifier},${item?.node}`,
                  },
                });
              });
              const cardMessage = [
                {
                  type: 'card',
                  size: 'lg',
                  theme: 'primary',
                  modules: [
                    {
                      type: 'header',
                      text: {
                        type: 'plain-text',
                        content: `今日突击BOSS: ${res?.boss}。 faction: ${res?.faction}`,
                      },
                    },
                    {
                      type: 'divider',
                    },
                    ...obj,
                  ],
                },
              ];
              request('/kook/api/v3/message/create', {
                // request('https://api.warframestat.us/pc/zh/dailyDeals', {
                method: 'post',
                data: {
                  target_id: '7870199141625705',
                  content: JSON.stringify(cardMessage),
                  // content: 'extend header抽离测试',
                  type: 10,
                },
              }).then(() => {
                setState((s) => ({
                  ...s,
                  user_id: '',
                }));
              });
            }
          });
        }
      });
    },
    {
      // 轮询可用
      // pollingInterval: 10000,
      // 手动执行
      // manual: true,
    },
  );
  // console.log(state?.user_id, 'shuju');
  // 获取频道聊天数据
  // /api/v3/message/list
  // 机器人的id
  // client_id:  "ypaIjMwU5VCo-f_s"
  // 卡片消息格式
  const cardMsg = [
    {
      type: 'card',
      size: 'lg',
      theme: 'warning',
      modules: [
        {
          type: 'header',
          text: {
            type: 'plain-text',
            content: '卡片测试',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          mode: 'right',
          text: {
            type: 'kmarkdown',
            content: '**Warframe** \n<<网络连接无响应>>。',
          },
        },
      ],
    },
  ];
  const sendMsg = () => {
    // request('/kook/api/v3/guild/list', {
    //   method: 'get',
    //   headers: {
    //     Authorization: 'Bot 1/MTIzOTA=/sLKLe6y6NcLOC0pXRZA2eA==',
    //     'Content-Type': 'application/json',
    //     // withCredentials: true,
    //   },
    // });
    // http://39.103.173.19:3000
    // 创建一条会话
    // request('/kook/api/v3/message/create', {
    //   // request('https://api.warframestat.us/pc/zh/dailyDeals', {
    //   method: 'post',
    //   data: {
    //     target_id: '7870199141625705',
    //     // content: JSON.stringify(cardMsg),
    //     content: 'extend header抽离测试',
    //     // type: 10,
    //   },
    // });
    // 获取聊天频道地址
    // /api/v3/message/list
    // request('/kook/api/v3/message/list', {
    //   method: 'get',
    //   params: {
    //     target_id: '7870199141625705',
    //     page_size: 2,
    //   },
    // });
    //api.warframestat.us/{platform}/sortie // 每日突袭
    request('/warframe/pc/zh/sortie', {
      method: 'get',
    }).then((res) => {
      const obj: any = [];
      if (res) {
        res?.variants.forEach((item: any) => {
          obj.push({
            type: 'section',
            mode: 'right',
            text: {
              type: 'plain-text',
              content: `${item?.missionType},${item?.modifier},${item?.node}`,
            },
          });
        });
        const cardMessage = [
          {
            type: 'card',
            size: 'lg',
            theme: 'primary',
            modules: [
              {
                type: 'header',
                text: {
                  type: 'plain-text',
                  content: `今日突击BOSS: ${res?.boss}。 faction: ${res?.faction}`,
                },
              },
              {
                type: 'divider',
              },
              // {
              //   type: 'section',
              //   mode: 'right',
              //   text: {
              //     type: 'kmarkdown',
              //     content: '**Warframe** \n<<网络连接无响应>>。',
              //   },
              // },
              ...obj,
            ],
          },
        ];
        request('/kook/api/v3/message/create', {
          // request('https://api.warframestat.us/pc/zh/dailyDeals', {
          method: 'post',
          data: {
            target_id: '7870199141625705',
            // content: JSON.stringify(cardMessage),
            content: '测试消息',
            // type: 10,
          },
        });
      }
    });
  };
  return (
    <div className={styles.box}>
      <Button type="primary" onClick={sendMsg}>
        信息
      </Button>
    </div>
  );
}
