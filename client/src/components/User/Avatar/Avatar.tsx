import React from "react";
import classes from "./Avatar.module.css";

interface AvatarProps {
    src: string;
    children?: never;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    const {src} = props;

    return (
        <div className={classes["avatar-container"]}>
            <img className={classes["avatar-container__avatar"]} src={src} alt="user"/>
        </div>
    );
};

export {Avatar};