import React from "react";
import {LoaderSizeProps} from "react-spinners/interfaces";
import BounceLoader from "react-spinners/BounceLoader";
import classes from "./Loader.module.css"

interface LoaderProps extends LoaderSizeProps{
    children?: never;
}

const Loader: React.FC<LoaderProps> = (props) => {
    return props.loading ? (
        <div className={classes.loader}>
            <BounceLoader {...props}/>
        </div>
    ): null
};

export {Loader};