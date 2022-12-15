
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
var assignee;
const names2 = [];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 350,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}








export default function SectionLayout(properties) {
    const [open, setOpen] = React.useState(false);
    const season_id = useParams().id;
    console.log(season_id);
    const navigate = useNavigate();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const round_number = useParams().roundid;
    console.log(round_number);

    const handleClickOpen = () => {
        setOpen(true);

        axios({
            method: "get",
            url: `http://127.0.0.1:8000/user/api_view/img_member/?year=3`,
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },

        }).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                names2.push(response.data[i])
                console.log("this is from the component")



            }
            console.log(names2)

        });

        axios({
            method: "get",
            url: `http://127.0.0.1:8000/user/api_view/img_member/?year=4`,
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },

        }).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                names2.push(response.data[i])
                names2.map((name) => (


                    console.log(name.name)

                ))
            }



        });




    };

    const handleClose = () => {
        setOpen(false);
    };














    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
        assignee = event.target.value
        console.log("this is it")
        console.log(assignee)

    };

    const onSubmit = () => {

        const userInputSection = document.getElementById("section_name").value;
        const userInputTotalquestions = document.getElementById("TotalQuestions").value;
        const userInputTotalmarks = document.getElementById("Totalmarks").value;

        console.log(userInputSection);
        console.log(userInputTotalquestions);
        console.log(userInputTotalmarks);
        console.log(assignee);

        setOpen(false);

        axios({
            method: "put",
            url: `http://localhost:8000/user/api_view/section/${properties.id}/`,
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },
            data: {
                name_of_the_section: userInputSection,
                total_number_of_questions: userInputTotalquestions,
                total_marks: userInputTotalmarks,
                round_number: round_number,
                recruitment_season: season_id,


            }
        }).then((response) => {
            console.log(response)
            window.location.reload(false);
        });

    }
    const round1_url = "/recruitment_seasons/" + season_id + "/" + round_number + "/" + properties.id + "/"
    const onClickNavigate = () => {

        navigate(round1_url, { replace: false });
    };




    const onDelete = () => {
        axios({
            method: "delete",
            url: `http://localhost:8000/user/api_view/section/${properties.id}`,
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },

        }).then((response) => {
            console.log(response)
            window.location.reload(false);
        });
    }









    return (
        <>
            <div style={{ backgroundColor: "grey" }}>
                <h3>{properties.name}</h3>
                <h4>{properties.total_marks}</h4>
                <h5>{properties.total_number_of_questions}</h5>
                <h6>{properties.id}</h6>
                <button variant="outlined" onClick={onClickNavigate}>Add Questions</button>
                <button variant="outlined" onClick={onDelete}>Delete</button>
                <button variant="outlined" onClick={handleClickOpen}>Update</button>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a section</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="section_name"
                        label={properties.name}
                        type="text"
                        fullWidth
                        variant="standard"
                        className='userInputSection'
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="TotalQuestions"
                        label={properties.total_number_of_questions}
                        type="integer"
                        fullWidth
                        variant="standard"
                        className='userInputTotalquestions'
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Totalmarks"
                        label={properties.total_marks}
                        type="integer"
                        fullWidth
                        variant="standard"
                        className='userInputTotalmarks'
                    />
                    {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((key) => (
                                    <Chip key={key} label={key} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {names2.map((name2) => (
                            <MenuItem
                                key={name2}
                                value={name2}

                            >
                                {name2}
                            </MenuItem>
                        ))}
                    </Select> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmit}>Subscribe</Button>
                </DialogActions>
            </Dialog>


        </>
    )
}