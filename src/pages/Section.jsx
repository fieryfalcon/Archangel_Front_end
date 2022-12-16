import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import SectionLayout from '../components/SectionLayout';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
const names = []
var assignee;
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




export default function Sections() {




    const [open, setOpen] = React.useState(false);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const season_id = useParams().id;

    console.log(season_id);


    useEffect(() => {
        window.onload = () => {

            axios({
                method: "get",
                url: `http://localhost:8000/user/api_view/section/?recruitment_season=$` + season_id,
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                },

            }).then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    setSections(response.data)

                }
            });

            axios({
                method: "get",
                url: `http://127.0.0.1:8000/user/api_view/img_member/?year=3`,
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                },

            }).then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    names.push(response.data[i])
                    localStorage.setItem("assignees3", JSON.stringify(response.data))
                }

            });

            axios({
                method: "get",
                url: `http://127.0.0.1:8000/user/api_view/img_member/?year=4`,
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                },

            }).then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    names.push(response.data[i])
                    console.log(names)
                    localStorage.setItem("assignees4", JSON.stringify(response.data))

                }



            });










        }
    })



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



    const round_number = useParams().roundid;
    console.log(round_number);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
            method: "post",
            url: `http://localhost:8000/user/api_view/section/`,
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },
            data: {
                name_of_the_section: userInputSection,
                total_number_of_questions: userInputTotalquestions,
                total_marks: userInputTotalmarks,
                round_number: round_number,
                recruitment_season: season_id,
                assignee_enrollment_number: assignee

            }
        }).then((response) => {
            console.log(response)
            window.location.reload(false);
            localStorage.setItem("names", JSON.stringify(names))

        });





    };

    return (
        <>
            <h1>Sections</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a section
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a section</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="section_name"
                        label="Name of the section"
                        type="text"
                        fullWidth
                        variant="standard"
                        className='userInputSection'
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="TotalQuestions"
                        label="Total questions"
                        type="integer"
                        fullWidth
                        variant="standard"
                        className='userInputTotalquestions'
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Totalmarks"
                        label="Total marks"
                        type="integer"
                        fullWidth
                        variant="standard"
                        className='userInputTotalmarks'
                    />
                    <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
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
                        {names.map((name) => (
                            <MenuItem
                                key={name.name}
                                value={name.enrollment_number}

                            >
                                {name.name}
                            </MenuItem>
                        ))}
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmit}>Subscribe</Button>
                </DialogActions>
            </Dialog>


            {(
                sections.map((section) => (
                    <SectionLayout
                        name={section.name_of_the_section}
                        total_marks={section.total_marks}
                        total_number_of_questions={section.total_number_of_questions}
                        id={section.id}
                    // names={names}

                    />
                ))
            )}


        </>
    )
}