import {App, Button, Form, Input, Modal} from "antd";
import useUser from "@housing_rent/redux/features/user/user";
import {useState} from "react";
import {IsResponse, IsResponseError} from "@housing_rent/utils/types_check";
import {CloseCircle} from "iconsax-react";


interface LoginDialogProps {
    open?: boolean;
    onClose?: () => void;
}

const LoginDialog = (props: LoginDialogProps) => {
    const {login} = useUser();
    const [errors, setErrors] = useState<ErrorFieldResponse>();
    const {message} = App.useApp();

    const handleFinish = (data: LoginRequestI) => {
        login(data).then((response) => {
            if ('data' in response) {
                message.success(response.data.detail).then();
                props.onClose?.();
            } else {
                if (IsResponseError(response.error)) {
                    setErrors(response.error);
                } else if (IsResponse(response.error)) {
                    message.error(response.error.detail).then();
                } else {
                    message.error("خطایی در ورود رخ داده است.").then();
                }
            }
        })
    };
    return <Modal open={props.open} title="ورود به سایت" closeIcon={<CloseCircle size="32"/>} footer={<></>}
                  onCancel={props.onClose}
    >
        <Form<LoginRequestI> onFinish={handleFinish} layout="vertical">
            <Form.Item label="نام کاربری" name="username" required>
                <Input/>
            </Form.Item>
            <Form.Item label="رمزعبور" name="password" required>
                <Input.Password/>
            </Form.Item>

            <Button type="primary" htmlType="submit">ورود</Button>
        </Form>
    </Modal>
}

export default LoginDialog;