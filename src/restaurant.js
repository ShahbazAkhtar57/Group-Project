import React from "react";

function Restaurant() {
    return (<div className = "locinfo">
       
        <div className="left">
            <h1>Restaurant Information:</h1>
            <hr></hr>
            <br></br>
            <h2 style={{textAlign:"left"}}>Restaurant Name: </h2>
            <br></br>
            <h2 style={{textAlign:"left"}}>Restaurant Location: </h2>
            <br></br>
            <h2 style={{textAlign:"left"}}>Phone Number: </h2>
            <br></br>
            <h2 style={{textAlign:"left"}}>Rating:  </h2>
            <br></br>
            <h2 style={{textAlign:"left"}}>Price: </h2>


        </div>


        <div className="right">
            <h1>Review/s:</h1>
        </div>

    </div>);
}

export default Restaurant;
