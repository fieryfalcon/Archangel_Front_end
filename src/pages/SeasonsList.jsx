import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import SeasonLayout from '../components/SeasonsListLayout.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React from 'react';



export default function Recruitment_seasons() {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const season_get_url = "http://127.0.0.1:8000/user/api_view/recruitment_season/";

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = () => {

        const userInputYear = document.getElementById("Year").value;
        const userInputRole = document.getElementById("Role").value;

        console.log(userInputYear);
        console.log(userInputRole);

        setOpen(false);

        axios({
            method: "post",
            url: `http://localhost:8000/user/api_view/recruitment_season/`,
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },
            data: {
                role: userInputRole,
                year: userInputYear,

            }
        }).then((response) => {
            console.log(response)
        });

        window.location.reload(false);



    };





    useEffect(() => {

        if (loading === true) {
            axios({
                method: "get",
                url: season_get_url,

                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                },
            }).then((response) => {
                if (response.status === 200) {
                    let length = response.data.length + 1;

                    for (let i = 0; i < length; i++) {

                        setSeasons(response.data);
                        setLoading(false);
                        console.log(response.data[i].id)
                    }
                    setLoading(false);
                    window.location.reload(false);
                }

            });

        }
    });


    return (
        <>
            <h1>Recruitment Seasons</h1>

            {(
                seasons.map((season) => (
                    <SeasonLayout

                        role={season.role}
                        year={season.year}
                        id={season.id}

                    />
                ))
            )}

            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add a season
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="Year"
                            label="Year"
                            type="text"
                            fullWidth
                            variant="standard"
                            className='userInputYear'
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Role"
                            label="Role"
                            type="integer"
                            fullWidth
                            variant="standard"
                            className='userInputRole'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={onSubmit}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )

};


