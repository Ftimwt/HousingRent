import {App, Button, Form, Input, Modal} from "antd";
import {CloseCircle} from "iconsax-react";
import useUser from "@housing_rent/redux/features/user/user";
import {IsResponse, IsResponseError} from "@housing_rent/utils/types_check";

interface Props {
    open?: boolean;
    onClose?: () => void;
}

const CreateAccount = (props: Props) => {
    const {createAccount} = useUser();
    // const [errors, setErrors] = useState<ErrorFieldResponse>();
    const {message} = App.useApp();

    const handleFinish = (data: CreateAccountI) => {
        if (!data.address) {
            data.address = "";
        }
        createAccount(data).then((response) => {
            if ('data' in response) {
                message.success(response.data.detail).then();
                props.onClose?.();
            } else {
                if (IsResponseError(response.error)) {
                    // setErrors(response.error);
                } else if (IsResponse(response.error)) {
                    message.error(response.error.detail).then();
                } else {
                    message.error("خطایی در ثبت نام رخ داده است.").then();
                }
            }
        })
    }

    return <Modal
        open={props.open}
        title="ثبت نام در سایت"
        closeIcon={<CloseCircle size="32"/>}
        footer={<></>}
        onCancel={props.onClose}
    >
        <Form<CreateAccountI> onFinish={handleFinish} layout="vertical">
            <Form.Item label="نام کاربری" name="username" required>
                <Input/>
            </Form.Item>
            <Form.Item label="رمزعبور" name="password" required>
                <Input.Password/>
            </Form.Item>
            <Form.Item label="نام کوچک" name="first_name" required>
                <Input/>
            </Form.Item>
            <Form.Item label="نام خانوادگی" name="last_name" required>
                <Input/>
            </Form.Item>
            <Form.Item label="شماره تماس" name="phone_number" required>
                <Input/>
            </Form.Item>
            <Form.Item label="کدملی" name="national_code" required>
                <Input/>
            </Form.Item>

            <Form.Item label="آدرس" name="address">
                <Input/>
            </Form.Item>

            <Button type="primary" htmlType="submit">ثبت نام</Button>
        </Form>
    </Modal>
}

export default CreateAccount;