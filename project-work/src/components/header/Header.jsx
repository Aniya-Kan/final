import React from "react";
import {Link} from "react-router-dom"

export default function Header(){
    return(
        <React.Fragment>
            <div className="header">
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to={"/Characters"}>Characters</Link>
                        </li>
                        <li>
                            <Link to={"/Locations"}>Locations</Link>
                        </li>
                        <li>
                            <Link to={"/"}>Episodes</Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </React.Fragment>
    )
}