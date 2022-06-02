import React from "react";
import ventures_and_knitting from "./images/k3.jpeg";

let k3 = <img src={ventures_and_knitting} alt="Knitting Ventures" width="400" height="250" />;

class Activities extends React.Component{
    constructor(props) {
        super(props); // Must call
        // a member variable called "state" to hold the state as a JS object
        this.state = {activities: []};
    }
    
    componentDidMount() {
        let that = this;
        fetch('./activities')
            .then(function(response){
                console.log("Request Status Code: ", response.statusText, response.status, response.type);
                if(response.ok){
                    return response.json(); // a promise
                }
                else{
                    let info = `Status code: ${response.status}, ${response.statusText}`;
                    console.log(response);
                    return Promise.reject(info);
                }
            })
            .then(function (activities) {
                that.setState({ activities: activities });
                console.log(activities);
              })
            .catch(function(msg){
                console.log("Something bad happened: " + msg);
            })
    }
    
    render(){
        let activityList = this.state.activities.map(function(comp, i){
        return <tr key={comp.activity}>
            <th scope="row">{comp.activity}</th>
            <td>{comp.timings}</td>
            <td>{comp.items}</td>
            <td>{comp.desc}</td>
        </tr>;
    });
    return <main>
        <header>
            <h1>FKC Activities</h1>
        </header>
        <figure className="figStyle3">
                {k3}
                <figcaption>Figure 1. Knitting Ventures.</figcaption>
        </figure>
        <section>
            <h2>Knitting Activities:</h2>
            <ul>
                <li>Advanced knitting sessions with Continental and English knitting</li>
                <li>Intermediate knitting sessions - Continental and English styles</li>
                <li>Beginner knitting sessions - English style</li>
            </ul>
        </section>
        <section className="tableSection">
            <h2>Activity Schedule:</h2>
            <table>
                <caption>Knitting Activities Schedule</caption>
                <thead>
                    <tr>
                        <th scope="col">Activity</th>
                        <th scope="col">Timings</th>
                        <th scope="col">Items Required</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody id="activityTableBody">
                    {activityList}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4"><em>NOTE: Make sure you bring knitting needles with appropriate size for your yarn!</em></td>
                    </tr>
                </tfoot>
            </table>
        </section>
        </main>;
    }
    
}

export default Activities;