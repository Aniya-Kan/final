import React from "react";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router";
import Characters from "./characters/Characters";
import Locations from "./locations/Locations";
import Episodes from "./episodes/Episodes";



export default function App(){
    return(
        <React.Fragment>
            <Layout>
                <Routes>
                    <Route path="/Characters" element={<Characters/>}/>
                    <Route path = "/Locations" element={<Locations/>}/>
                    <Route path = "/" element ={<Episodes/>}/>
                </Routes>
            </Layout>
        </React.Fragment>
    )
}