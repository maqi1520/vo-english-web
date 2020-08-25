import React from 'react';
import Link from 'next/link';
import useRequest from '@/common/useRequest';
import usePage from '@/common/usePage';

import { Table, Divider } from 'antd';
const { Column } = Table;

function Home() {
  const pageProps = usePage();
  const { data: res, loading } = useRequest({
    url: '/api/videos',
    params: {
      pageSize: pageProps.pageSize,
      pageNum: pageProps.current,
    },
  });

  const { data, total } = res || { data: [], total: 0 };
  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={data}
      pagination={{
        ...pageProps,
        total,
      }}
    >
      <Column title="name" dataIndex="name" key="name" />
      <Column
        title="choices_answer"
        dataIndex="choices_answer"
        key="choices_answer"
      />
      <Column
        title="Action"
        key="action"
        render={(text, record: any) => (
          <span>
            <Link href="/admin/video/[id]" as={`/admin/video/${record.id}`}>
              <a>Edit</a>
            </Link>
            <Divider type="vertical" />
            <a href="#">Delete</a>
          </span>
        )}
      />
    </Table>
  );
}

// export async function getServerSideProps(context) {
//   await fetch(`${process.env.API_URL}/api/videos`);
//   const { data = [], total = 0 } = await getVideos();
//   return {
//     props: {
//       data,
//       total,
//     },
//   };
// }

export default Home;
