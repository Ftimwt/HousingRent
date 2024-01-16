"use client"

import Page from "@housing_rent/pages/page";
import {Tabs} from "antd";
import ManageEstates from "@housing_rent/components/admin/manage_estates";


const AdminPage = () => {
    return <Page title="مدیریت سیستم" isAdmin>
        <Tabs items={[{
            key: 'manage_estates',
            label: 'مدیریت ملک های جدید کاربران',
            children: <ManageEstates/>
        }]}>
        </Tabs>
    </Page>
}

export default AdminPage;