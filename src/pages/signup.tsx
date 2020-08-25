import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { register } from '../common/api';
import Header from '../components/Header';
import { useRouter } from 'next/router';

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const RegistrationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const router = useRouter();

  const onFinish = (values) => {
    //console.log('Received values of form: ', values);
    register(values)
      .then(() => {
        router.push('/signin');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <Header />
      <main className="container">
        <Row>
          <Col xs={{ span: 0 }} sm={{ span: 12 }}>
            <img width="100%" src="/static/login2.png" />
          </Col>
          <Col className="login-form" xs={{ span: 24 }} sm={{ span: 12 }}>
            <h2>欢迎回来，立即免费登录</h2>
            {error && (
              <Alert
                style={{ margin: '16px 0' }}
                showIcon
                message={error}
                type="error"
              />
            )}
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{}}
              scrollToFirstError
            >
              <Form.Item
                name="nickname"
                rules={[
                  {
                    required: true,
                    message: '请输入你的昵称!',
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="昵称"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: '输入无效的邮箱号!',
                  },
                  {
                    required: true,
                    message: '请输入你的邮箱!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="邮箱"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入您的密码!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="密码"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: '请确认您的密码!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('您输入的两个密码不匹配!');
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="确认密码"
                />
              </Form.Item>

              <Form.Item>
                <Button size="large" block type="primary" htmlType="submit">
                  注册
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </main>
      <footer className="footer">@copyright</footer>
    </div>
  );
};

export default RegistrationForm;
