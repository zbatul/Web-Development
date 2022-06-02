import React from "react";
import ReactDOM from "react-dom";
import Menu from "./menu"; // menu component in menu.js
import Home from "./home"; // home component in home.js
import Activities from "./activities"; // activities component in activities.js
import Login from "./login"; // login component in login.js
import Membership from "./membership"; // membership component in membership.js
import AdminActivity from "./AdminActivity"; // AdminActivity component in AdminActivity.js

class App extends React.Component {
    constructor(props) {
        super(props);
        // Application state variables:
        // *role* is for RBAC == "role based access control"
        // we have "guest", "member", and "admin"
        this.state = { role: "guest", show: "home", userInfo: null};
    }
    
    menuHandler(event){
        switch(event.target.id) {
            case "home":
                this.setState({show: "home"});
                break;
            case "login":
                this.setState({show: "login"});
                break;
            case "activities":
                this.setState({show: "activities"});
                break;
            case "membership":
                this.setState({show: "membership"});
                break;
            case "manage activities":
                this.setState({show: "manage activities"});
                break;
            case "logout":
                fetch('./logout')
                    .then(function(response) {
                        console.log('Request status code: ', response.statusText, response.status, response.type);
                        return response.json();
                    })
                this.setState({role: "guest", show: "home"});
                break;
            default:
                this.setState({show: "home"});
        }
    }
    
    onChange(newRole, userInfo) {   
        this.setState({role: newRole, userInfo: userInfo})
        if(newRole == "member"){
            this.setState({show: "activities"});
        }
        if(newRole == "admin"){
            this.setState({show: "manage activities"});
        }
    }

    render() {
        let contents = <Home />;
        let userInfo = <p className="userInfo"></p>;
        
        if (this.state.role !== "guest") {
            userInfo = (<p className="userInfo"> {this.state.userInfo.firstName} {this.state.userInfo.lastName}, Role: {this.state.role}</p>);
        }
        // statements/logic to set the content variable based on state
        switch (this.state.show) {
            case "home":
                contents = <Home role={this.state.role} />;
                break;
            case "login":
                contents = <Login onRoleChange={this.onChange.bind(this)}/>;
                break;
            case "activities":
                contents = <Activities role={this.state.role} />;
                break;
            case "membership":
                contents = <Membership role={this.state.role} />;
                break;
            case "manage activities":
                contents = <AdminActivity role={this.state.role} />;
                break;
            default:
                contents = <h2>Warning something went wrong!!!</h2>;
        }
        
        return (
            <>
                <Menu role={this.state.role} show={this.state.show} menuHandler={this.menuHandler.bind(this)}/>
                {userInfo}
                {contents}
            </>
        );
    }
}
// Now rendering the App component!
ReactDOM.render(<App />, document.getElementById("root"));