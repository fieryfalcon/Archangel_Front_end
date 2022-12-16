import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Papa from "papaparse";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ParticipantsLayout from '../components/SeasonLayout'
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import RecruitmentTest from './Test';





export default function Season() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();
    let { id } = useParams();

    var season_id = useParams().id;
    console.log(season_id)




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    let code = 0
    const handleChange = (event) => {
        code = event.target.value
        console.log(event.target.value)
    }
    const dialogclose = () => {
        setLoading(false);
        window.location.reload(false);

    }

    const Alldata = JSON.parse(localStorage.getItem("Alldata"));

    const onFileClick = (event) => {
        const files = event.target.files

        if (files) {
            console.log(files[0]);
            Papa.parse(files[0], {
                complete: function (results) {
                    console.log("Finished:", results.data);


                    for (let i = 1; i < results.data.length; i++) {
                        let name = results.data[i][1];
                        let enrollmentNumber = results.data[i][2];
                        let department = results.data[i][3];
                        let phone_number = results.data[i][4];
                        let mail = results.data[i][5];
                        let project_link = results.data[i][6];

                        let newarray = new Array();




                        console.log(Alldata.length)
                        console.log("completed setting the data")
                        for (var j = 0; j < Alldata.length; j++) {
                            newarray = Alldata[j].recruitment_season_code.map(String);
                            newarray.push(season_id)
                            console.log(newarray)

                            let data = {
                                name: name,
                                enrollment_number: enrollmentNumber,
                                department: department,
                                phone_number: phone_number,
                                email: mail,
                                mode_of_entry: code,
                                recruitment_season_code: newarray,
                                Project_link: project_link


                            }

                            if (enrollmentNumber == Alldata[j].enrollment_number) {


                                axios({
                                    method: "delete",
                                    url: `http://localhost:8000/user/api_view/Participants_detail/` + Alldata[j].enrollment_number,
                                    headers: {
                                        Authorization: "Token " + localStorage.getItem("token"),
                                    },

                                }).then((response) => {

                                    console.log("here")






                                    axios({
                                        method: "post",
                                        url: `http://localhost:8000/user/api_view/Participants_detail/`,
                                        headers: {
                                            Authorization: "Token " + localStorage.getItem("token"),
                                        },
                                        data: data
                                    }).then((response) => {

                                        for (var j = 0; j < Alldata.length; j++) {
                                            newarray = Alldata[j].recruitment_season_code.map(String);
                                            newarray.push(season_id)
                                            console.log(newarray)


                                            if (code === 1) {
                                                axios({
                                                    method: "post",
                                                    url: `http://localhost:8000/user/api_view/recruitment_test/`,
                                                    headers: {
                                                        Authorization: "Token " + localStorage.getItem("token"),
                                                    },
                                                    data: {
                                                        enrollment_number: enrollmentNumber,
                                                        recruitment_season_code: season_id,
                                                    }
                                                }).then((response) => {

                                                    console.log("created recruitment test object")

                                                });
                                            }

                                            else if (code === 2) {
                                                axios({
                                                    method: "post",
                                                    url: `http://localhost:8000/user/api_view/winter_assingment/`,
                                                    headers: {
                                                        Authorization: "Token " + localStorage.getItem("token"),
                                                    },
                                                    data: {
                                                        enrollment_number: enrollmentNumber,
                                                        recruitment_season_code: season_id,
                                                        project_link: project_link
                                                    }

                                                }).then((response) => {
                                                    console.log(response)

                                                });
                                            }
                                        }

                                    });




                                });

                                console.log("end")
                            }
                            else {


                                axios({
                                    method: "post",
                                    url: `http://localhost:8000/user/api_view/Participants_detail/`,
                                    headers: {
                                        Authorization: "Token " + localStorage.getItem("token"),
                                    },
                                    data: data
                                }).then((response) => {

                                    for (var j = 0; j < Alldata.length; j++) {
                                        newarray = Alldata[j].recruitment_season_code.map(String);
                                        newarray.push(season_id)
                                        console.log(newarray)


                                        if (code === 1) {
                                            axios({
                                                method: "post",
                                                url: `http://localhost:8000/user/api_view/recruitment_test/`,
                                                headers: {
                                                    Authorization: "Token " + localStorage.getItem("token"),
                                                },
                                                data: {
                                                    enrollment_number: enrollmentNumber,
                                                    recruitment_season_code: season_id,
                                                }
                                            }).then((response) => {

                                                console.log("created recruitment test object")

                                            });
                                        }

                                        else if (code === 2) {
                                            axios({
                                                method: "post",
                                                url: `http://localhost:8000/user/api_view/winter_assingment/`,
                                                headers: {
                                                    Authorization: "Token " + localStorage.getItem("token"),
                                                },
                                                data: {
                                                    enrollment_number: enrollmentNumber,
                                                    recruitment_season_code: season_id,
                                                    project_link: project_link
                                                }

                                            }).then((response) => {
                                                console.log(response)

                                            });
                                        }
                                    }

                                }
                                );
                            }
                        }






                    }

                }
            }
            )
        }
    };


    useEffect(() => {

        if (loading === true) {
            axios({
                method: "get",
                url: `http://localhost:8000/user/api_view/Participants_detail/`,
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                },

            }).then((response) => {
                console.log(response)
                localStorage.setItem("Alldata", JSON.stringify(response.data))




                if (response.status === 200) {
                    console.log("if")
                    let myarr = new Array()
                    for (let i = 0; i < response.data.length; i++) {


                        console.log(response.data[i].recruitment_season_code.length);



                        for (let j = 0; j < response.data[i].recruitment_season_code.length; j++) {
                            console.log("working")



                            if (response.data[i].recruitment_season_code[j] == season_id) {

                                myarr[i] = response.data[i]
                                localStorage.setItem("data" + season_id, JSON.stringify(myarr))




                                setSeasons(myarr)








                            }




                        }
                        console.log("h")
                        console.log(myarr.length)

                        setLoading(false);
                    }
                }
            });

        }
    });
    const round1_url = "/recruitment_seasons/recruitment_test/" + season_id
    const navigateToRound1 = () => {

        navigate(round1_url, { replace: false });
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add students
            </Button>
            <h2 id="season_id">{id}</h2>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add students</DialogTitle>
                <DialogContent>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={code}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>RecruitmentTest</MenuItem>
                        <MenuItem value={2}>Winter Assingment</MenuItem>

                    </Select>
                    <br />
                    <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={onFileClick}
                    />





                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={dialogclose}>submit</Button>
                </DialogActions>

            </Dialog>

            <h1>Participants</h1>
            {
                seasons.map((season) => (
                    <ParticipantsLayout



                        name={season.Project_link}
                        mail={season.email}
                        enrollmentNumber={season.enrollment_number}
                        mode_of_entry={season.mode_of_entry}


                    />
                ))
            }

            <Button variant="outlined" onClick={navigateToRound1}>
                Establish connection
            </Button>
        </div>
    );

}
