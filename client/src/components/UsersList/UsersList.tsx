import React from "react";
import classes from "./UsersList.module.css";
import {User} from "../User/User";
import {UsersData} from "../../types/users";

interface UsersListProps {
    users?: UsersData["data"];
    children?: never;
}

const UsersList: React.FC<UsersListProps> = (props) => {
    const { users } = props;

    return users ? (
        <div className={classes["users-list"]}>
            {users.map((user) => (
                <React.Fragment key={user.id}>
                    <User {...user} />
                    <hr style={{width: "100%"}}/>
                </React.Fragment>
            ))}
        </div>
    ) : null;
};

export {UsersList};