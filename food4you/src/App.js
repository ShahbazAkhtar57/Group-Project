import React, { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [headingText, setHeading] = useState("");

  function handleChange(event) {
    console.log(event.target.value);
    setLocation(event.target.value);
  }

  function handleClick(event) {
    setHeading(location);

    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>My Location</h1>
      <form onSubmit={handleClick}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Where's your location?"
          value={location}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <h2>{headingText}</h2>
    </div>
  );
}

export default App;
