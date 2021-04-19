import React, {useRef} from "react";
import classes from "./Users.module.css";
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll";
import {UsersList} from "../../components/UsersList/UsersList";
import {UsersData} from "../../types/users";

const Users: React.FC = () => {
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const {data: users, completed, loading} = useInfiniteScroll<UsersData, {delay: number; page: number; per_page?: number}, UsersData["data"]>({
        URL: 'https://reqres.in/api/users',
        initialQueryParams: {
            delay: 2,
            page: 1,
            per_page: 6
        },
        scrollRef: loadingRef,
        getNextPageQueryParams(params) {
            return {...params, page: params.page + 1};
        },
        hasCompleted(data: UsersData) {
            return data.page === data.total_pages;
            // return !data.data.length;
        },
        getData(prevData: UsersData["data"] | undefined, fetchedData: UsersData){
            if(prevData) {
                return [...prevData, ...fetchedData.data]
            }
            return fetchedData.data;
        }
    });

    return (
        <div className={classes["users-container"]}>
            <UsersList users={users} />
            <div ref={loadingRef}>
                {loading && <span>Loading...</span>}
                {completed && <span>completed :)</span>}
            </div>
        </div>

    );
};

export {Users};