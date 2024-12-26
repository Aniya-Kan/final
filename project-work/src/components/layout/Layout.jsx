import React, { Children } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer"

export default function Layout({children}){
    return(
        <React.Fragment>
            <Header/>
            {children}
            <Footer/>
        </React.Fragment>
    )

}