import React, {useState,useEffect} from 'react'
import "./styles.css"
import Ongoingsurvey from '..'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { db,auth } from "../../firebase"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Modal from "../../Modal"
import {Grid} from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { produce } from "immer"
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'



function Posts({ postId,  academicBook, ownerId, academicField, academicFieldTopic, timestamp, formDescription, formTitle, read}) {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [ans, setAns] = React.useState([])
    const [reply, setReply] = useState([]);
    let {user} = useSelector((state)=> ({...state}));
  const [value, setValue] = React.useState('female');
const [answers, setAnswer] = React.useState({})
  const [questions1, setQuestions]= React.useState([]);
  const [numberOfSurvey, setNumberOfSurvey] = React.useState(0)
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [surveyChecked, setSurveyChecked] = useState("");
  const [loading, setLoading] = useState(false)
  
  // const [valueChecked, setSurveyChecked] = useState(false);

 
  const addMoreQuestionField = (quiz,answer,type) =>{ 
    setSurveyChecked(answer)
    setQuestions(questions=> [...questions, {questionText: quiz,type, options : [{optionText: answer}], open: true}]);
  }

    useEffect(() => {
      db.collection('surveys').doc(postId).collection("responses").where("reply","==", true)
     .onSnapshot(snapshot => (
      setNumberOfSurvey(snapshot.docs.length)
     ))
  }, [numberOfSurvey]);



function onRadio(questionId) {
   return function(event) {
         var tmpAns = answers;
          tmpAns[questionId] = event.target.value;
           setAnswer(tmpAns)
    }
}



    



      var d = timestamp;
      //var d =val.timestamp;
      
      //NB: use + before variable name
      var date = new Date(+d);



     const add = (reply,quiz) =>{
     setReply(...[reply])
     }
      


      return (
        <>
        <ToastContainer />
              <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell>

                  </TableCell>
                  <TableCell component="th" scope="row">
                    {academicField}
                  </TableCell>
                  <TableCell align="right">{academicFieldTopic}</TableCell>
                  <TableCell align="right">{academicBook}</TableCell>
                  <TableCell align="right">{date.toDateString()}, {date.toLocaleTimeString()}</TableCell>

                </TableRow>

              </React.Fragment>

            </>
    )
     

}

export default Posts
