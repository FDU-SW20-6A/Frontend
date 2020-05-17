import { message, Form, Input, Button, Icon } from 'antd';
import React, { Component } from 'react';
import { router } from 'umi';
import styles from './login/style.less';

@Form.create()
export default class Change extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:8001/user/change/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.status && data.status === 'ok') {
                            message.success('修改成功，请重新登录')
                            router.push('/user/login')
                        }
                        else {
                            message.error('修改失败')
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
                        {getFieldDecorator('oldpsw', {
                            rules: [{ required: true, message: '旧密码不可为空' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="旧密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('newpsw', {
                            rules: [{ required: true, message: '新密码不可为空' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="新密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '368px' }}>
                            修改密码
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}