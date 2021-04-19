import React from "react";
import classes from "./User.module.css";
import {Avatar} from "./Avatar/Avatar";
import {User as IUser} from "../../types/users";

interface UserProps extends Omit<IUser, "id" | "email"> {
    children?: never;
}

const User: React.FC<UserProps> = (props) => {
    const {avatar, first_name, last_name} = props;

    return (
        <div className={classes.user}>
            <Avatar src={avatar}/>
            <span className={classes["user__details"]}>{first_name} {last_name}</span>
        </div>
    );
};

export {User};
