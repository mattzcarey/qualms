import Axios from "axios";
import { useState } from "react";

//Expanding the empire...
const AddVenue = () => {
  const [newVenueTitle, addVenueTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!newVenueTitle) {
      alert("Empty venue");
      return;
    }

    // Axios post stuff to backend.
    Axios.post("http://localhost:3001/api/addvenue", {
      venuename: newVenueTitle,
    }).then(() => {
      alert("added venue successfully");
    });
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Add Venue</label>
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
  );
};

export default AddVenue;
