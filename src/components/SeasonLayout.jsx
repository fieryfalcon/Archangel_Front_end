import React from 'react';
import axios from 'axios';


export default function ParticipantsLayout(prop) {





  return (
    <>


      <div style={{ padding: 10 }}>

        <h4>{prop.name}</h4>
        <h4>{prop.mail}</h4>
        <h4>{prop.enrollmentNumber}</h4>
        <h4>{prop.mode_of_entry}</h4>


      </div>









    </>
  )
}

