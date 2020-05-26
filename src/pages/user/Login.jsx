import { message, Form, Input, Button, Icon } from 'antd';
import React, { Component } from 'react';
import { router } from 'umi';
import styles from './login/style.less';

@Form.create()
export default class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:8001/user/login/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...values, type: "account" })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.status && data.status === 'ok') {
                            message.success('登录成功')
                            router.push('/china')
                        }
                        else {
                            message.error('登录失败')
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
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '用户名不可为空' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码不可为空' }],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '368px' }}>
                            登录
                        </Button>
                    </Form.Item>
                    <a href="/user/register" style={{ display: 'inline', marginRight: '255px' }}>去注册</a>
                    <a href="/user/reset" style={{ display: 'inline' }}>忘记密码？</a>
                </Form>
            </div>
        );
    }
}