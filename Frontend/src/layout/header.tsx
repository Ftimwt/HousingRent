import {Button, Layout, Menu} from 'antd'
import LoginDialog from "@housing_rent/components/dialog/auth/login";
import {useState} from "react";
import useUser from "@housing_rent/redux/features/user/user";
import UserMenu from "@housing_rent/components/menus/user_menu";
import {MenuItemType} from "antd/lib/menu/hooks/useItems";
import {Link} from "react-router-dom";
import CreateAccount from "@housing_rent/components/dialog/auth/create_account";

const items: MenuItemType[] = [
    {
        key: 'home',
        label: <Link to="/">اجاره خانه</Link>,
    },
    {
        key: 'rent',
        label: <Link to="/rented">خانه های اجاره شده</Link>,
    },
    {
        key: '',
        label: <Link to={'/my/estates'}>املاک من</Link>,
    }
];

const Header = () => {
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [signUpOpen, setSignUpOpen] = useState<boolean>(false);
    const {user} = useUser();

    const handleClickLogin = () => {
        setLoginOpen(true);
    }

    const handleClickSignup = () => {
        setSignUpOpen(true);
    }

    const handleClose = () => {
        setLoginOpen(false);
        setSignUpOpen(false);
    }

    return <Layout.Header className="!bg-white flex justify-between">
        <LoginDialog open={loginOpen} onClose={handleClose}/>
        <CreateAccount open={signUpOpen} onClose={handleClose}/>
        <Menu
            className="w-full"
            items={items}
            mode="horizontal"
        />
        <div className="flex flex-row-reverse items-center w-full">
            {user ? <>
                <UserMenu/>
            </> : <Button.Group>
                <Button onClick={handleClickLogin}>ورود</Button>
                <Button onClick={handleClickSignup}>ثبت نام</Button>
            </Button.Group>
            }
        </div>
    </Layout.Header>;
}

export default Header;