import { message, Form, Input, Button, Icon } from 'antd';
import React, { Component } from 'react';
import { router } from 'umi';
import styles from './login/style.less';

@Form.create()
export default class Reset extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:8001/user/reset/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.status && data.status === 'ok') {
                            message.success('重置成功，请登入你注册时填入的邮箱查看')
                            router.push('/user/login')
                        }
                        else {
                            message.error('重置失败，请检查是否注册或者用户名是否填写正确')
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
                        <Button type="primary" htmlType="submit" style={{ width: '368px' }}>
                            重置密码
                        </Button>
                    </Form.Item>
                    <a href="/user/register" style={{ display: 'inline', marginRight: '270px' }}>去注册</a>
                    <a href="/user/login" style={{ display: 'inline' }}>去登录</a>
                </Form>
            </div>
        );
    }
}