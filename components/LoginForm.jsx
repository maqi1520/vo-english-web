import React from 'react'
import { Form, Input, Button } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { login } from '../common/api'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const LoginForm = () => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    //console.log('Received values of form: ', values);
    login(values)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
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
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="密码"
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button size="large" block type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
