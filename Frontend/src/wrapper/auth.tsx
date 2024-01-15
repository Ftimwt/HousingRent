"use client"

import React, {useEffect} from "react";
import {useWhoamiQuery} from "@housing_rent/redux/requests/auth";

interface Props {
    children: React.ReactNode;
}

const AuthWrapper = ({children}: Props) => {
    const {data, status, error} = useWhoamiQuery();

    // handle change UserModel
    useEffect(() => {
        if (!data) return;
    }, [data]);



    return children;
}
export default AuthWrapper;