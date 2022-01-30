import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';

import App from './App'
import { VenueItem, VenueList } from './DynamicRouting';
import About from './About';
import SuccessPage from './Success';

// const Routing = () => {
function Routing() {
    return (
        <Router>
            <Content />
        </Router>
    )
}

const Content = () => (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/venues/*" element={<Venue />} />
      <Route path="/about" element={<About />} />
      <Route path="/success" element={<SuccessPage/>} />
    </Routes>
  );

  const Venue = () => (
    <>
      <h1>
        Qualms Venue List and Item Page
      </h1>
  
      <Routes>
        <Route exact path="/" element={<VenueList />} />
        <Route path="/:id" element={<VenueItem />} />
      </Routes>
    </>
  );

export default Routing;