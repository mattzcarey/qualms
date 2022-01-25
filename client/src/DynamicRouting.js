import React from "react";
//import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

const VENUES = {
  "wg-grace": {
    title: "Wetherspoon: WG Grace ",
    url: "https://www.jdwetherspoon.com/pubs/all-pubs/england/bristol/the-w-g-grace-bristol",
  },
  berkley: {
    title: "Wetherspoon: The Berkley",
    url: "https://www.jdwetherspoon.com/pubs/all-pubs/england/bristol/the-berkeley-bristol",
  },
  racks: {
    title: "Racks",
    url: "https://www.racks-bristol.co.uk/",
  },
  channings: {
    title: "Channings Hotel",
    url: "https://www.greenekinginns.co.uk/hotels/the-channings-hotel/",
  },
};

const VenueList = () => (
  <>
    <h2>All Courses</h2>
    <ul>
      {Object.keys(VENUES).map((key) => (
        <li key={key}>
          Go to individual pub/bar route:&nbsp;
          <Link to={`/venues/${key}`}>{VENUES[key].title}</Link>
        </li>
      ))}
    </ul>
  </>
);

const VenueItem = () => {
  const { id } = useParams();

  return (
    <>
      <h2>{VENUES[id].title}</h2>
      <p>
        Go to <a href={VENUES[id].url}>Venue Website</a>
      </p>
      <div className="container">
        <br></br>
        <form autoComplete="off" className="form-control">
          <label>Tell us your qualms..</label>
          <input type="text" className="form-control" />
          <br></br>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
        <div className="view-data">
          {<>No previous qualms</>}
          {
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Previous qualms</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          }
        </div>
      </div>
      <p>
        Back to <Link to="/venues">Venues</Link>
      </p>
    </>
  );
};

export { VenueItem, VenueList };
