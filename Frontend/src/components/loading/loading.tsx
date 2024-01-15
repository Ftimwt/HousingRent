import React from "react";
import {Spin} from "antd";

interface Props {
    loading: boolean;
    children: React.ReactNode;
    size?: "small" | "default" | "large"
}

const Loading = (props: Props) => {

    if (!props.loading) return props.children;

    return <Spin spinning className="flex items-center m-auto" size={props.size ?? 'large'}></Spin>
}

export default Loading;