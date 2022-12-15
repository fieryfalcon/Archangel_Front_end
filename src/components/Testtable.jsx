import React from "react";
import axios from "axios";

export default function Testtable(properties) {

    return (
        <>
            <div style={{ padding: 10 }}>
                <h6>{properties.enrollment_number}</h6>
                <h6>{properties.evaluation_result}</h6>
                <h6>{properties.evaluation_status}</h6>
                <h6>{properties.project_link}</h6>
                <h6>{properties.recruitment_season_code}</h6>
                <h6>{properties.remarks}</h6>
                <h6>{properties.total_marks}</h6>














            </div>

        </>
    );
}
