import React, {useEffect} from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const Page = ({title, children, className}: Props) => {

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

    if (className) {
        return <div className={className}>
            {children}
        </div>
    }

    return children;
}

export default Page;