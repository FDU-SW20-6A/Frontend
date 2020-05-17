import { message, Form, Input, Button, Icon } from 'antd';
import React, { Component } from 'react';
import { router } from 'umi';
import styles from './login/style.less';

@Form.create()
export default class Register extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:8001/user/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...values, authority: "user" })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.status && data.status === 'ok') {
                            message.success('请登入邮箱完成注册')
                            router.push('/user/login')
                        }
                        else {
                            message.error('注册失败')
                        }
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.main}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名不可为空' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '邮箱不可为空' },
                            { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确', }],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="邮箱"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password1', {
                            rules: [{ required: true, message: '密码不可为空' }],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password1"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password2', {
                            rules: [{ required: true, message: '密码不可为空' }],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password2"
                                placeholder="重输密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '368px' }}>
                            注册
                        </Button>
                    </Form.Item>
                    <a href="/user/login" style={{ marginLeft: '44%' }}>去登录</a>
                </Form>
            </div>
        );
    }
}