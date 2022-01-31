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
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </h3>
          </div>
          <div className="sub-containerB">
            <div className="sub-header">
              <h2>Startup Value Proposition:</h2>
            </div>
            <h3 style={({ textAlign: "center" }, { fontSize: "10px" })}>
              Qualms is a service for businesses to collect meaningful feedback
              and insights on their customer experience from their most loyal
              patrons. It allows customers to submit anonymous feedback to the
              platform by way of a QR code which can be printed on a menu or
              displayed at the venue. The feedback is filtered by Qualms to
              remove spam and extract the key messages. The business pays a
              subscription to periodically receive a breakdown of the insights.
              Qualms gives the owner/manager the opportunity to change before a
              permanent negative comment is left in the public domain forever.
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
            style={{justifyContent: "right"}}
          >
            <Button variant="contained">Download</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
