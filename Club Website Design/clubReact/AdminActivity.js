import React from "react";

class AdminActivity extends React.Component{
    constructor(props) {
        super(props); // Must call
        // a member variable called "state" to hold the state as a JS object
        this.state = {
            activities: [], activity: "", timings: "", items:"", desc: ""};
    }
    
    componentDidMount() {
        let that = this;
        fetch("./activities")
          .then(function (response) {
            console.log("Request status code: ", response.statusText, response.status, response.type);
            if (response.ok) {
              return response.json(); // a promise
            } 
            else {
              let info = `Status code: ${response.status}, ${response.statusText}`;
              console.log(response);
              return Promise.reject(info); //rejected promise!
            }
          })
          .then(function (activities) {
            that.setState({ activities: activities });
            console.log(activities);
          })
          .catch(function (info) {
            console.log(info);
          });
      }

    timingsTextAreaChange(e){
        this.setState({timings: e.currentTarget.value});
    }   
    
    itemsTextAreaChange(e){
        this.setState({items: e.currentTarget.value});
    }
    
    descTextAreaChange(e){
        this.setState({desc: e.currentTarget.value});
    }
    
    activityInputChange(e){
        this.setState({activity: e.currentTarget.value});
    }

    addActivity() {
        let that = this;
        fetch('./activities', {
            method: "post",
            body: JSON.stringify({
                activity: that.state.activity, timings: that.state.timings, items: [that.state.items], desc: that.state.desc
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
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
    
    delActivity(i) {
        console.log(`Id to delete ${this.state.activities[i]._id}`);
        let that = this;
        fetch(`./activities/${this.state.activities[i]._id}`, {
          method: "delete",
        })
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

    render() {
        let that = this;
        let activityList = this.state.activities.map(function(comp, i) {
            return <tr key={comp.activity}>
            <td><button type="button" onClick={that.delActivity.bind(that, i)}>Delete</button></td>
            <th scope="row">{comp.activity}</th>
            <td>{comp.timings}</td>
            <td>{comp.items}</td>
            <td>{comp.desc}</td>
            </tr>;
        });
        
        return <main>
        <header>
            <h1>Activity Management</h1>
        </header>

        <section>
            <p>Add Activity</p>
            <form>
                <div className="FormDiv">
                    <label>Activity: </label>
                    <input type="text" minLength="2" maxLength="26" required="required" onChange={this.activityInputChange.bind(this)}/>
                    <label>Timings: </label>
                    <textarea rows="1" placeholder="" value={this.state.timings} onChange={this.timingsTextAreaChange.bind(this)}></textarea>
                    <label>Items: </label>
                    <textarea rows="1" placeholder="" value={this.state.items} onChange={this.itemsTextAreaChange.bind(this)}></textarea>
                    <label>Description: </label>
                    <textarea rows="2" placeholder="" value={this.state.desc} onChange={this.descTextAreaChange.bind(this)}></textarea>
                    <button type="button" onClick={this.addActivity.bind(this)}>Add</button>
                </div>
            </form>
        </section>

        <section className="tableSection">
            <h2>Activities</h2>
            <table>
                <caption>Knitting Activities Schedule</caption>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Activity</th>
                        <th scope="col">Timings</th>
                        <th scope="col">Items Required</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody id="activityTableBody">
                    {activityList}
                </tbody>
            </table>
        </section>
        </main>;
    }
}

export default AdminActivity;