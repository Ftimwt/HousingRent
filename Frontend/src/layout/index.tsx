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
            classNames={{item: 'w-full'}}
        >
            <AntLayout.Content className="relative h-[80vh] w-full md:p-12">
                {children}
            </AntLayout.Content>
        </Space>
        <AntLayout.Footer className="mt-5">
            کپی رایت {moment().locale('fa').format("y")}
        </AntLayout.Footer>
    </AntLayout>
}

export default Layout;