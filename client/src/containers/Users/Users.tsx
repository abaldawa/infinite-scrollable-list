import React, {useRef} from "react";
import classes from "./Users.module.css";
import {USERS_LIST_URL} from "../../constants/userEndpoints";
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll";
import {UsersList} from "../../components/UsersList/UsersList";
import {Loader} from "../../components/UI/Loader/Loader";
import {UsersData} from "../../types/users";

const Users: React.FC = () => {
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const {data: users, completed, loading} = useInfiniteScroll<UsersData, {delay: number; page: number; per_page?: number}, UsersData["data"]>({
        URL: USERS_LIST_URL,
        initialQueryParams: {
            delay: 3,
            page: 1,
            per_page: 6
        },
        scrollRef: loadingRef,
        getNextPageQueryParams(params) {
            return {...params, page: params.page + 1};
        },
        hasCompleted(data: UsersData) {
            return data.page === data.total_pages;
        },
        getData(prevData: UsersData["data"] | undefined, fetchedData: UsersData){
            if(prevData) {
                return [...prevData, ...fetchedData.data]
            }
            return fetchedData.data;
        }
    });

    return (
        <div className={classes["users-container"]} >
            <UsersList users={users} />
            <div ref={loadingRef}>
                <Loader loading={loading} color={"#8CB637"}/>
                {completed && <span>completed :)</span>}
            </div>
        </div>

    );
};

export {Users};