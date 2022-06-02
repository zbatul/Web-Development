// index.js file
import React from "react";
import ReactDOM from "react-dom";
import events from "./eventData.json" // Importing JSON

let myName = "Batul Zamin"; 

// Create table rows with array map method
let tableRows = events["events"].map(function(event){
    return <tr key={event.activity}><td>{event.activity}</td><td>{event.timings}</td><td>{event.items}</td><td>{event.desc}</td></tr>;
})

// Create a table using rows from above
let myTable = <table>
                <caption>Knitting Activities Schedule</caption>
                <thead><tr><th scope="col">Activity</th><th scope="col">Timings</th><th scope="col">Items Required</th><th scope="col">Description</th></tr></thead>
                <tbody id="activityTableBody">{tableRows}</tbody>
                <tfoot><tr><td colSpan="4"><em>NOTE: Make sure you bring knitting needles with appropriate size for your yarn!</em></td></tr></tfoot>
            </table>;

// Create contents using table from above
let contents = <section>
    <h1>Hello from React</h1>
    <h2>{myName}</h2>
    <h3>The number of events is {events["events"].length}</h3>
    {myTable}
  </section>;

ReactDOM.render(contents, document.getElementById("root"));