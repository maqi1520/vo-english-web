import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { login } from '../common/api';
import Header from '../components/Header';
import { useRouter } from 'next/router';

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const LoginForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const router = useRouter();

  const onFinish = (values) => {
    //console.log('Received values of form: ', values);
    login(values)
      .then((res) => {
        console.log(res);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <div>
      <Header />
      <main className="container">
        <Row>
          <Col xs={{ span: 0 }} sm={{ span: 12 }}>
            <img width="100%" src="/static/login1.png" />
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
              name="login"
              onFinish={onFinish}
              initialValues={{}}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                size="large"
                rules={[
                  {
                    type: 'email',
                    message: '请输入正确的邮箱号!',
                  },
                  {
                    required: true,
                    message: '请输入你的邮箱!',
                  },
                ]}
              >
                <Input
                  onChange={() => setError('')}
                  size="large"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="邮箱"
                />
              </Form.Item>

              <Form.Item
                size="large"
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
                  onChange={() => setError('')}
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="密码"
                />
              </Form.Item>

              <Form.Item>
                <Button size="large" block type="primary" htmlType="submit">
                  登录
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

export default LoginForm;
