//deprecated
import * as React from "react";
import Axios from "axios";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Expanding the empire...
const AddVenue = ({ openVen, setOpenVen }) => {
  const [newVenueTitle, addVenueTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!newVenueTitle) {
      alert("Empty venue");
      return;
    }
    // Axios post stuff to backend.
    Axios.post("http://localhost:3001/api/addvenue", {
      headers: {
        'Authorization': `token ${process.env.REACT_APP_API_KEY}`
      },
      venuename: newVenueTitle,
    }).then(() => {
      alert("added venue successfully");
    });
  };

  const handleToClose = () => {
    setOpenVen(false);
  };

  return (
    <div>
      <Dialog
        open={openVen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleToClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add Venue"}</DialogTitle>
        <DialogContent>
          <form className="add-form" onSubmit={(e) =>{onSubmit(e); handleToClose()}}>
            <div className="form-control">
              <input
                type="text"
                value={newVenueTitle}
                placeholder="Add venue here (only for exec staff)"
                onChange={(e) => {
                  addVenueTitle(e.target.value);
                }}
              />
            </div>
            <input type="submit" value="Save Venue" className="btn btn-block" />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddVenue;
