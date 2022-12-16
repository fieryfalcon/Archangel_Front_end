import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Testtable from '../components/Testtable';

// import Testtable from "./TestTable"


export default function RecruitmentTest() {
    const round_number = 1
    const [loading, setLoading] = useState(true);
    const [seasons, setSeasons] = useState([]);
    const [value, setValue] = useState(0);
    const [test, setTest] = useState("Recruitment_test");


    let { id } = useParams();
    const season_id = useParams().id;
    console.log(season_id);


    // useEffect(() => {
    //     window.onload = async event => {
    //         let stored_data = new Array();
    //         stored_data = JSON.parse(localStorage.getItem("data" + season_id))
    //         console.log(stored_data);

    //         axios({
    //             method: "get",
    //             url: `http://localhost:8000/user/api_view/recruitment_test/?recruitment_season_code=` + season_id,
    //             headers: {
    //                 Authorization: "Token " + localStorage.getItem("token"),
    //             },


    //         }).then((response) => {
    //             console.log("get request")
    //             console.log(response)

    //             for (let i = 0; i < response.data.length; i++) {

    //                 console.log(response.data[i])
    //                 setSeasons(response.data)



    //             }

    //         });

    //     }
    // });

    const round1_url = "/recruitment_seasons/recruitment_test/" + season_id + "/questions/" + round_number
    const navigate = useNavigate();

    const navigatetoQuestions = () => {

        navigate(round1_url, { replace: false });
    };


    const handleChange = (event, newValue) => {

        setValue(newValue);
        if (value == 0) {
            axios({
                method: "get",
                url: `http://localhost:8000/user/api_view/winter_assingment/?recruitment_season_code=` + season_id,
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                },


            }).then((response) => {
                console.log("winter")
                console.log(response)

                for (let i = 0; i < response.data.length; i++) {

                    console.log(response.data[i])

                    setSeasons(response.data)

                }

            });
        }
        else if (value == 1) {

            axios({
                method: "get",
                url: `http://localhost:8000/user/api_view/recruitment_test/?recruitment_season_code=` + season_id,
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                },


            }).then((response) => {
                console.log("recruitment")
                console.log(response)

                for (let i = 0; i < response.data.length; i++) {

                    console.log(seasons)

                    setSeasons(response.data)

                }

            });
        }
    };

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Recruitment" />
                    <Tab label="Winter" />

                </Tabs>
            </Box>
            <Button variant="outlined" onClick={navigatetoQuestions}>Add Questions</Button>
            <Button variant="outlined">Evaluate</Button>
            {
                seasons.map((season) => (
                    <Testtable



                        enrollment_number={season.enrollment_number}
                        evaluation_result={season.evaluation_result}
                        evaluation_status={season.evaluation_status}
                        project_link={season.project_link}
                        recruitment_season_code={season.recruitment_season_code}

                        remarks={season.remarks}
                        total_marks={season.total_marks}


                    />
                ))
            }









        </>






    );
}