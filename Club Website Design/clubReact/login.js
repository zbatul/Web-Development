import React from "react";
import { render } from "react-dom";

class Login extends React.Component{
    constructor(props) {
        super(props); // Must call
        // a member variable called "state" to hold the state as a JS object
        this.state = {email: "", password: ""};
    }

    emailInputChange(e){
        this.setState({email: e.currentTarget.value});
    }   
    
    passwordInputChange(e){
        this.setState({password: e.currentTarget.value});
    }
    
    postIt() {
        let that = this;
        fetch('./login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: that.state.email, 
                password: that.state.password
            })
        })
        .then(function(response) {
            console.log('Request status code: ', response.statusText, response.status, response.type);
            if (response.ok) {
                return response.json(); // a promise
            } 
            else {
                let info = `Status code: ${response.status}, ${response.statusText}`;
                console.log(response);
                return Promise.reject(info); //rejected promise!
            }
        })
        .then(function(data) {
            that.props.onRoleChange(data.role, data);
            console.log(data);
        })
        .catch(function (info) {
            console.log(info);
            that.props.onRoleChange("guest", null);
        });
    }

    render() {
        let that = this;
        return <main>
        <header>
            <h1>Login</h1>
        </header>
        <form>
            <div>
                <label>Email: </label>
                <input type="email" minLength="3" maxLength="64" required="required" onChange={this.emailInputChange.bind(this)} />
                <label>Password: </label>
                <input type="password" minLength="8" maxLength="26" required="required" onChange={this.passwordInputChange.bind(this)} />
                <button id="loginButton" type="button" onClick={that.postIt.bind(that)}>Login</button>
            </div>
        </form>
    </main>;
    }
}

export default Login;