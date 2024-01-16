"use client"

import React, {useEffect} from "react";
import {useWhoamiQuery} from "@housing_rent/redux/requests/auth";
import useUser from "@housing_rent/redux/features/user/user";
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

interface Props {
    children: React.ReactNode;
    isAdmin: boolean;
}

const AuthWrapper = ({children, isAdmin}: Props) => {
    const {user} = useUser();

    if (!user || (isAdmin && !user.is_staff)) {
        return <Result
            status="403"
            title="403"
            subTitle="برای دسترسی به این صفحه با حساب کاربری خود وارد شوید."
            extra={<Button type="primary">
                <Link to="/">
                    برگشت به صفحه اصلی
                </Link>
            </Button>}
        />
    }

    return children;
}
export default AuthWrapper;