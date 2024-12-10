import React, { Children } from "react";
import Header from "../header/Header";

export default function Layout({children}){
    return(
        <React.Fragment>
            <Header/>
            {children}
        </React.Fragment>
    )

}