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
import Slider from '@mui/material/Slider';
import QuestionLayout from '../components/QuestionsLayout';


export default function Questions() {



    const section_id = useParams().sectionid;
    console.log(section_id);
    const [open, setOpen] = React.useState(false);
    const [questions, setQuestions] = useState([]);


    const [difficulty, setDifficulty] = useState(1);



    window.onload = () => {

        axios({
            method: "get",
            url: "http://127.0.0.1:8000/user/api_view/Questions/?sectionID=" + section_id,
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },

        }).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                setQuestions(response.data)
                console.log(response.data[i].question_text)

            }

        });

    }





    const round_number = useParams().roundid;
    console.log(round_number);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onChange = (event) => {
        setDifficulty(event.target.value)
        console.log(difficulty)

    };



    const onSubmit = () => {

        const userInputQuestion = document.getElementById("question_text").value;
        const userInputAnswer = document.getElementById("answer_text").value;
        const userInputslider = document.getElementById("slider").value;
        const userInputMarks = document.getElementById("maximum_marks").value;


        console.log(userInputQuestion);
        console.log(userInputAnswer);
        console.log(difficulty);
        console.log(userInputMarks);



        setOpen(false);

        axios({
            method: "post",
            url: `http://127.0.0.1:8000/user/api_view/Questions/`,
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },
            data: {
                question_text: userInputQuestion,
                answer_text: userInputAnswer,
                difficulty: difficulty,
                maximum_marks: userInputMarks,
                sectionID: section_id,

            }
        }).then((response) => {
            console.log(response)



        });





    };

    return (
        <>
            <h1>Question</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a Questions
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a section</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="question_text"
                        label="Question Text"
                        type="text"
                        fullWidth
                        variant="standard"
                        className='userInputSection'
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="answer_text"
                        label="Suggested Answer"
                        type="text"
                        fullWidth
                        variant="standard"
                        className='userInputSection'
                    />

                    <Slider
                        aria-label="Difficulty"
                        defaultValue={1}
                        onChange={onChange}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        id="slider"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="maximum_marks"
                        label="Maximum marks"
                        type="integer"
                        fullWidth
                        variant="standard"

                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmit}>Subscribe</Button>
                </DialogActions>
            </Dialog>
            {(
                questions.map((question) => (
                    <QuestionLayout
                        question={question.question_text}
                        answer={question.answer_text}
                        marks={question.maximum_marks}
                        id={question.id}


                    />
                ))
            )}




        </>
    )



}

