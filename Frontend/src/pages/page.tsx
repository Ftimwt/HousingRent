import React, {useEffect} from "react";
import AuthWrapper from "@housing_rent/wrapper/auth";

interface Props {
    children: React.ReactNode;
    title?: string;
    login?: boolean;
    isAdmin?: boolean;
}

const Page = ({title, children, login, isAdmin}: Props) => {

    useEffect(() => {
        let prefix = import.meta.env.VITE_APP_TITLE;
        if (!prefix || prefix === "") {
            prefix = "سامانه اجاره مسکن";
        }

        if (!title || title === "") {
            document.title = prefix;
            return;
        }

        document.title = `${prefix} ${title}`;
    }, [title]);

    if (login || isAdmin) {
        return <AuthWrapper isAdmin={!!isAdmin}>
            {children}
        </AuthWrapper>
    }

    return children;
}

export default Page;