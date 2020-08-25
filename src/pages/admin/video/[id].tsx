import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactElement,
} from 'react';
import { useRouter } from 'next/router';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  message,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import useRequest from '@/common/useRequest';
import { updateVideo, createVideo } from '@/common/api';
const Option = Select.Option;

interface Props {
  value?: string;
}
function ViedoInput(props: Props): ReactElement {
  return (
    <div>
      {props.value && (
        <video
          style={{ display: 'block' }}
          width="360"
          height="200"
          controls
          src={process.env.NEXT_PUBLIC_IMAGE_HOST + props.value}
        ></video>
      )}
      <Input className="mt10" {...props} />
    </div>
  );
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 11, span: 5 },
};

const list = [
  {
    name: 'name',
    label: '名称',
    rules: [{ required: true }],
    children: <Input />,
  },
  {
    name: 'producer',
    label: '制作人',
    rules: [{ required: true }],
    children: <Input />,
  },
  {
    name: 'director',
    label: '导演',
    rules: [{ required: true }],
    children: <Input />,
  },
  {
    name: 'type',
    label: '分类',
    rules: [{ required: true }],
    children: <Input />,
  },
  {
    name: 'level',
    label: '难度等级',
    rules: [{ required: true }],
    children: <InputNumber min={1} max={20} />,
  },
  {
    name: 'stars',
    label: '收藏数',
    rules: [{ required: true }],
    children: <InputNumber min={1} />,
  },
  {
    name: 'views',
    label: '浏览量',
    rules: [{ required: true }],
    children: <InputNumber min={1} />,
  },
  {
    name: 'countdown',
    label: '倒计时',
    rules: [{ required: true }],
    children: <InputNumber min={1} />,
  },
  {
    name: 'subtitle',
    label: '字幕',
    rules: [{ required: true }],
    children: <Input />,
  },
  {
    name: 'distractor',
    label: '干扰信息',
    rules: [{ required: true }],
    children: <Input />,
  },
  {
    name: 'choices_answer',
    label: '正确回答',
    rules: [{ required: true }],
    children: <Input />,
  },
  {
    name: 'choices_distractor',
    label: '错误选择',
    rules: [{ required: true }],
    children: <Input />,
  },
  {
    name: 'language_code',
    label: '语言',
    rules: [{ required: true }],
    children: (
      <Select>
        <Option value="zh">中文</Option>
        <Option value="en">英语</Option>
      </Select>
    ),
  },
  {
    name: 'details',
    label: '详情',
    rules: [{ required: true }],
    children: <Input.TextArea />,
  },
  {
    name: 'sources',
    label: '视频地址',
    rules: [{ required: true }],
    children: <ViedoInput />,
  },
];

const validateMessages = {
  required: '请输入${label}!',
};

export default function Detail() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { data } = useRequest(
    {
      url: `/api/videos/${id}`,
    },
    id !== 'create' && id !== undefined
  );

  const onFinish = useCallback(
    (values) => {
      setLoading(true);
      if (id === 'create') {
        createVideo(values)
          .then(() => {
            router.push('/admin/video');
          })
          .catch((err) => {
            message.error(err.message);
          })
          .finally(() => setLoading(false));
      } else {
        updateVideo(id, values)
          .then(() => {
            router.push('/admin/video');
          })
          .catch((err) => {
            message.error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [id]
  );

  const formRef = useRef<FormInstance>();
  useEffect(() => {
    if (formRef && data) {
      formRef.current.setFieldsValue(data);
    }
  }, [data]);
  return (
    <Form
      {...layout}
      name="basic"
      ref={formRef}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Row>
        {list.map((item) => (
          <Col key={item.name} sm={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item label={item.label} name={item.name} rules={item.rules}>
              {item.children}
            </Form.Item>
          </Col>
        ))}
      </Row>

      <Form.Item {...tailLayout}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
