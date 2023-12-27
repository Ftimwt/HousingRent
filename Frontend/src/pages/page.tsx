import React, {useEffect} from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
}

const Page = ({title, children}: Props) => {

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

    return children;
}

export default Page;