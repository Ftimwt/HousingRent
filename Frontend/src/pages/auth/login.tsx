import Page from "../page.tsx";
import {Card, Form, Input, Space} from "antd";

const Login = () => {
    return <Page title="Login">
        <Space>
            <Card bordered={false} style={{width: 300}}>
                <Form<LoginRequest>>
                    <Form.Item name="username">
                        <Input placeholder="نام کاربری" />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input.Password placeholder="رمزعبور"/>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    </Page>;
}

export default Login;