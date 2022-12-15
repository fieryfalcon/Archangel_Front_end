import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function SeasonLayout(properties) {

  const onDelete = () => {
    axios({
      method: "delete",
      url: `http://localhost:8000/user/api_view/recruitment_season/${properties.id}`,
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },

    }).then((response) => {
      console.log(response)
      window.location.reload(false);
    });
  }

  const seasonIndividualLink = `/recruitment_seasons/season/${properties.id}/`;

  return (
    <>

      <div style={{ backgroundColor: "yellow" }}>
        <Link to={seasonIndividualLink} >
          <h1>{properties.year}</h1>
          <h1>{properties.role}</h1>
          <h3>{properties.id}</h3>
        </Link>
        <button onClick={onDelete}>delete</button>
      </div>





    </>
  )
}

