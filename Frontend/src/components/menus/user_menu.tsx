import {App, Dropdown, MenuProps, Space} from "antd";
import {MenuItemType} from "antd/lib/menu/hooks/useItems";
import {ArrowDown2, Logout} from "iconsax-react";
import useUser from "@housing_rent/redux/features/user/user";
import {useMemo} from "react";

const items: MenuItemType[] = [{
    label: 'خروج',
    title: 'خروج',
    key: 'sign-out',
    icon: <Logout size="16"/>
}];

const UserMenu = () => {
    const {user, logout,} = useUser();
    const {modal} = App.useApp();

    const fullName = useMemo<string>(() => {
        if (!user) return "نامشخص";
        return `${user.first_name} ${user.last_name}`;
    }, [user]);

    const handleMenuClick: MenuProps['onClick'] = ({key}) => {
        if (key == "sign-out") {
            modal.confirm({
                title: 'خروج از سیستم',
                content: 'آیا از خروج از سیستم اطمینان دارید ؟',
                okText: 'بله',
                cancelText: 'لغو',
            }).then((x) => {
                if (x) {
                    logout();
                }
            }, () => {
            })
        }
    }

    return <Dropdown menu={{items, onClick: handleMenuClick}} className="w-fit">
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                {fullName}
                <ArrowDown2 size="32"/>
            </Space>
        </a>
    </Dropdown>
}

export default UserMenu;