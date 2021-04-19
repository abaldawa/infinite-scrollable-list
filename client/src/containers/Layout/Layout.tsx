import React from "react";
import classes from "./Layout.module.css";

interface LayoutProps {
    children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = (props) => {
    return <div className={classes.layout}>{props.children}</div>;
};

export {Layout};