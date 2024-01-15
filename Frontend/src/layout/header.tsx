import {Button, Layout, Menu} from 'antd'
import LoginDialog from "@housing_rent/components/dialog/auth/login";
import {useState} from "react";
import useUser from "@housing_rent/redux/features/user/user";

const items = [
    {
        key: 'home',
        label: 'اجاره خانه'
    },
    {
        key: 'rent',
        label: 'خانه های اجاره شده'
    }
];

const Header = () => {
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const {user} = useUser();

    const handleClickLogin = () => {
        setLoginOpen(true);
    }

    const handleClose = () => {
        setLoginOpen(false);
    }

    return <Layout.Header className="!bg-white flex justify-between">
        <LoginDialog open={loginOpen} onClose={handleClose}/>
        <Menu
            className="w-full"
            items={items}
            mode="horizontal"
        />
        <div className="flex flex-row items-center">
            {!!user ?
                <Button.Group>
                    <Button onClick={handleClickLogin}>ورود</Button>
                    <Button>ثبت نام</Button>
                </Button.Group> : <>

                </>
            }
        </div>
    </Layout.Header>;
}

export default Header;