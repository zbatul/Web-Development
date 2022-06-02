import React from "react";

const items = {
    "guest": ["home", "activities", "login", "membership"],
    "member": ["home", "activities", "manage activities", "logout"],
    "admin": ["home", "activities", "manage activities", "logout"]
}

// Function 
function Menu(props){
    let contents = items[props.role].map(
        name => <li key={name} className={props.show === name ? "active": ""}> 
        <a id={name} onClick={props.menuHandler}>{name.charAt(0).toUpperCase() + name.slice(1)}</a>
    </li>)
    return <nav>
            <ul className="MenuClass">{contents}</ul>
        </nav>;
} 

export default Menu;