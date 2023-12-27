import React from "react";
import {Layout as AntLayout, Menu, Space} from 'antd';
import Header from "./header";

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
            <AntLayout.Content className="relative h-[80vh] w-full p-12">
                {children}
            </AntLayout.Content>
        </Space>
        <AntLayout.Footer className="mt-5">
            Copyright 2023
        </AntLayout.Footer>
    </AntLayout>
}

export default Layout;