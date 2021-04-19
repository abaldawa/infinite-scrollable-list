import React, {useEffect, useRef, useState} from "react";

type QueryParams = Record<string, string | number>;

interface UseInfiniteScrollArgs<T, Q extends QueryParams, R> {
    scrollRef: React.RefObject<Element | null>,
    URL: string,
    initialQueryParams: Q,
    getNextPageQueryParams: (params: Q) => Q,
    hasCompleted: (fetchedData: T) => boolean,
    getData: (prevData: R | undefined, fetchedData: T) => R
}

const getQueryParamsStr = (queryParams: QueryParams): string => {
      return Object.entries(queryParams)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
};

const useInfiniteScroll = <T, Q extends QueryParams, R>({
    scrollRef,
    URL,
    initialQueryParams,
    getNextPageQueryParams,
    hasCompleted,
    getData
}: UseInfiniteScrollArgs<T, Q, R>) => {
    const [scrollStatus, setScrollStatus] = useState({scrolledBottom: false});
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [data, setData] = useState<R>();
    const [queryParams, setQueryParams] = useState<Q>(initialQueryParams);

    const observer = useRef<IntersectionObserver>();

    const fetchData = async (url: string, prevData: R | undefined) => {
        setLoading(true);

        const response = await fetch(url);
        const responseData = await response.json() as T;

        setCompleted(hasCompleted(responseData));
        setData(getData(prevData, responseData));
        setLoading(false);

        if(scrollRef.current) {
            observer.current?.unobserve(scrollRef.current);
            observer.current?.observe(scrollRef.current)
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            observer.current = new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        setScrollStatus({scrolledBottom: true});
                    } else {
                        setScrollStatus({scrolledBottom: false});
                    }
                });
            });

            observer.current.observe(scrollRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };

    }, [scrollRef]);

    useEffect(() => {
        if(scrollStatus.scrolledBottom && !loading && !completed) {
            let queryParamStr: string;

            if(data) {
                const nextPageQueryParams = getNextPageQueryParams(queryParams);
                setQueryParams(nextPageQueryParams);
                queryParamStr = getQueryParamsStr(nextPageQueryParams);
            } else {
                queryParamStr = getQueryParamsStr(queryParams);
            }

            fetchData(`${URL}?${queryParamStr}`, data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollStatus]);

    return {
        scrollStatus,
        loading,
        completed,
        data
    };
};

export {useInfiniteScroll};

