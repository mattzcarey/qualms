import React, { useEffect, useState, useRef, memo } from "react";
//styling imports
import "./App.css";

//them imports
import { Link } from "react-router-dom";
import Axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";

//images and files
import Logo from "./Images/qualmslogo.png";

//us imports
// import VenuesBox from "./components/VenuesBox"; //One day when it's made

// N/A
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "venuename",
    headerName: "Venue",
    width: 150,
    editable: false,
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.venue || ""} ${params.row.qualm || ""}`,
  },
  {
    field: "qualm",
    headerName: "Qualm",
    width: 150,
    editable: false,
  },
];

const rows = [
  { id: 1, venuename: "Snow", qualm: "Jon"},
  { id: 2, venuename: "Lannister", qualm: "Cersei"},
  { id: 3, venuename: "Lannister", qualm: "Jaime"},
  { id: 4, venuename: "Stark", qualm: "Arya"},
  { id: 5, venuename: "Targaryen", qualm: "Daenerys"},
  { id: 6, venuename: "Melisandre", qualm: null },
  { id: 7, venuename: "Clifford", qualm: "Ferrara"},
  { id: 8, venuename: "Frances", qualm: "Rossini"},
  { id: 9, venuename: "Roxie", qualm: "Harvey"},
];

const VenuesBox = memo(({ onChange, options, value }) => {
  const handleChange = (e, newValue) => {
    onChange(newValue);
  };
  return (
    <Autocomplete
      disablePortal
      placeholder="Select Venue"
      options={options}
      onChange={handleChange}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          InputLabelProps={{ shrink: true }}
          {...params}
          label="Venue"
        />
      )}
    />
  );
});

function Dashboard() {
  //PageLoad
  useEffect(() => {
    document.title = "Recent Qualms";
    let venueList = [];

    setDropdownOptions(venueList);
  }, []);

  //Get request for venues on page load
  useEffect(() => {
    Axios.get(`https://qualms.uk/api/getvenues`).then((response) => {
      console.log(response); //
      let venueList = [];
      for (let i = 0; i < response.data.length; i++) {
        venueList = [...venueList, response.data[i].venuename];
      }

      setDropdownOptions(venueList);
    });
  }, []);

  const [venueTitle, setVenueTitle] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState(["Loading.."]);

  return (
    <div className="Dashboard-container">
      <div className="Dashboard-header">
        {/* TITLE */}
        <h1>Recent Qualms</h1>
        <Link to="/">
          {/* LOGO */}
          <img src={Logo} alt={""} className="logo"></img>
        </Link>
      </div>
      <div className="sub-containerD">
        <div style={{ display: "flex" }}>
          <div className="sub-containerA">
            <div className="sub-header">
              {/* SUBTITLE */}
              <h2>Feedback from:</h2>
            </div>
            <h3
              style={
                ({ textAlign: "center" },
                { fontSize: "10px" },
                { padding: "20px" })
              }
            >
              {/* CONTENT */}
              <VenuesBox
                onChange={setVenueTitle}
                options={dropdownOptions}
                value={venueTitle}
              />
            </h3>
          </div>
        </div>
        <div className="sub-containerC">
          <div className="sub-header"></div>
            {/* GENERATE ELEMENTS HERE 2 */}
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            
            <h2></h2>
          </div>
        </div>
        <h2 className="footer">contact@qualms.uk</h2>
      </div>
    </div>
  );
}

export default Dashboard;
