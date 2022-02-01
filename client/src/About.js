import { React, useEffect, useMemo } from "react";
import "./App.css";
import Logo from "./Images/img_554141.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function About() {
  useEffect(() => {
    document.title = "About Page";
  }, []);

  
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <Link to="/">
          <img src={Logo} alt={""} className="logo"></img>
        </Link>
      </div>
      <div className="sub-containerD">
        <div style={{ display: "flex" }}>
          <div className="sub-containerA">
            <div className="sub-header">
              <h2>Executive Summary:</h2>
            </div>
            <h3 style={({ textAlign: "center" }, { fontSize: "10px" })}>
              Qualms is an idea thought up to solve a very real life problem.
              With the pandemic and the global move to online services, real
              customer feedback in hospitality businesses has all but been left
              behind in the influx of booking apps, public rants and
              disappearance of feedback cards and visitors books.
              <br />
              Qualms will enable customers to give constructive anonymous
              feedback, meaning businesses receive specific, actionable
              criticisms and observations. Thereby catching criticisms before
              they enter the public domain and avoiding reputation damage.
              <br />
              With the growing acceptance of QR codes, there is now a moment in
              time to gain a first movers advantage and create this simple
              feedback service, which venues can use to leverage their
              understanding of their customers.
              <br />
              Qualms is built as a web app. There is no application to download
              and no sign up for the user. Qualms does not store any personal or
              identifying information about its users. All you need is the QR
              code to take you to the site. This gives it the best perceived
              ease of use compared to any of its competitors.
              <br />
              For the business, Qualms provides filtering of the raw data to
              remove spam. It extracts the key messages and allows the business
              to understand what they want from the venue. Qualms will use
              advanced data science to plot long term trends in feedback and
              deliver these insights to the venue. In the future Qualms will use
              these insights and the data collected to launch a bespoke
              consultancy business for the hospitality industry.
              <br />
              Qualms aims to achieve top-of-mind awareness for anonymous
              hospitality feedback within its first 5 years of trading.
            </h3>
          </div>
        </div>
        <div className="sub-containerC">
          <div className="sub-header">
            <h2>Financial Forecast:</h2>
          </div>
          <Link
            to="/Qualms-forcast-summary.xlsx"
            target="_blank"
            download
            style={{ justifyContent: "right" }}
          >
            <Button variant="contained">Download</Button>
          </Link>
        </div>
        <h2 className="footer">contact@qualms.uk</h2>
      </div>
    </div>
  );
}

export default About;
