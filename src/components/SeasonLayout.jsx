import React from 'react';
import axios from 'axios';


export default function ParticipantsLayout(prop) {





  return (
    <>


      <div style={{ padding: 10 }}>

        <h5>{prop.name}</h5>
        <h5>{prop.mail}</h5>
        <h5>{prop.enrollmentNumber}</h5>
        <h5>{prop.mode_of_entry}</h5>


      </div>









    </>
  )
}

