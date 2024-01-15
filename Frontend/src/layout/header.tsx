import {Layout, Menu} from 'antd'

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
    return <Layout.Header className="!bg-white">
        <Menu
            items={items}
            mode="horizontal"
        />
    </Layout.Header>;
}

export default Header;