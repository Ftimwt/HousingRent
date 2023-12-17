import React, {useEffect} from "react";

type Props = {
    children?: React.ReactNode;
    title: string;
}

const Page = ({children, title}: Props) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return <div>
        {children}
    </div>;
}

export default Page;