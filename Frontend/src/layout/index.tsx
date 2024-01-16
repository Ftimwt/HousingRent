import React from "react";
import {Layout as AntLayout, Space} from 'antd';
import Header from "./header";
import moment from "jalali-moment";

interface Props {
    children?: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return <AntLayout className="!flex-col">
        <Header/>
        <Space
            direction="horizontal"
            classNames={{item: 'w-full mt-10 h-full'}}
        >
            <AntLayout.Content className="relative w-full md:p-12 bg-white h-full">
                {children}
            </AntLayout.Content>
        </Space>
        <AntLayout.Footer className="mt-5 bg-white">
            کپی رایت {moment().locale('fa').format("y")}
        </AntLayout.Footer>
    </AntLayout>
}

export default Layout;