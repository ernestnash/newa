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


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Posts({ postId,  ownerEmail, ownerId, ownerUsername, questions, timestamp, formDescription, formTitle, read}) {
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



    
   const responseReturn = (event) => {

    console.log("quesons ",questions1)
    event.preventDefault();
    let errors = {};


    if(!lat && !lng){

      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');

      } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        }, () => {
          setStatus('Unable to retrieve your location');
        });
      }
    }else{

    
  if(questions1.length !== 0){
    setLoading(true)

    db.collection('surveys').doc(postId).collection("responses").where("fromId", "==", auth.currentUser.uid).where("formId", "==",postId ).get().then(
      snap => {
        if (snap.docs.length > 0) {
          setLoading(false)
          toast.error("You have participated already!")
        }
        else {
            db.collection('surveys').doc(postId).collection("responses").add({
                //
              timestamp:  Date.now(),
              fromEmail: auth?.currentUser?.email,
              fromId:auth?.currentUser?.uid,
              questions1: questions1,
                  read: false,
                  reply: true,
                  formId: postId,
                  ownerFormId: ownerId,
                  lat,
                  lng,
             
            }).then(ref =>{
              setLoading(false)
              toast.success("Thank you the response has been submitted successfully\nThe information provided shall be treated confidential")
            })
        }
      }
    )
  }
  }
    
}

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClickOpen1 = () => {
        setOpen1(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    
    
      const handleClose1 = () => {
        setOpen1(false);
      };
    
    
    



      var d = timestamp;
      //var d =val.timestamp;
      
      //NB: use + before variable name
      var date = new Date(+d);

      for(let i = 0; i < questions.length; i++) {
  
        for(let j = 0; j < questions[i].length; j++) {
          
           console.log(questions[i][j]);
        }
     }

     const add = (reply,quiz) =>{
     setReply(...[reply])
     }
      

     if(loading){
       return(

        <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
       
      >

        <DialogContent 
         style={{backgroundColor: "trasparency"}}          
dividers>
        <Typography gutterBottom >
        
<div style={{alignItems: "center",display: "flex"}}>
  <div><CircularProgress /></div>
  <div style={{marginLeft:10}}> Loading... </div>
</div>

    
        </Typography>
  

        </DialogContent>

      </BootstrapDialog>
        
       )
     }else{
      return (
        <>
        <ToastContainer />
              <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {formTitle}
                  </TableCell>
                  <TableCell align="right">{numberOfSurvey}</TableCell>
  
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0,border:"1px solid #45CBB2" }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell style={{fontWeight:"600",color:"#45CBB2"}}>Date Modified</TableCell>
                              <TableCell style={{fontWeight:"600",color:"#45CBB2"}}>Owner Email</TableCell>
                              <TableCell style={{fontWeight:"600",color:"#45CBB2"}} align="right">Status</TableCell>
                              <TableCell style={{fontWeight:"600",color:"#45CBB2"}} align="right">More</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  {date.toDateString()}, {date.toLocaleTimeString()}
                                </TableCell>
                                <TableCell>{ownerEmail}</TableCell>
                                <TableCell align="right">Open</TableCell>
                                <TableCell align="right">
                                    <button onClick={handleClickOpen1}  style={{width:80,backgroundColor:"#45CBB2",color:"#fff",border:"none"}}>Respond</button>
                                </TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
              <BootstrapDialog
          onClose={handleClose1}
          aria-labelledby="customized-dialog-title"
          open={open1}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
  
          MODAL FORM
          </BootstrapDialogTitle>
          <DialogContent           style={{height: 800 }}
 dividers>
          <Typography gutterBottom>
          
          <Grid style={{borderTop: '10px solid teal', borderRadius: 10,marginTop:0}}
  
  >
      <div>
          <div>
            <Paper elevation={2} style={{width:'100%'}}>
              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '10px', paddingTop: '10px', paddingBottom: '30px'}}>
                <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
                  {formTitle}
                </Typography>
                <Typography variant="subtitle1">
                    {formDescription}
                </Typography>
              </div>
            </Paper>
          </div> 
      </div>       
  </Grid>  
  
          </Typography>
    
    <hr/>
  
  
  {questions.map((item,i) =>
  <div key={i}>
      
      <Typography gutterBottom>
            <TextField
            id="outlined-textarea"
            defaultValue= {item.questionText}
            label={`Question ${i+1}`}
            InputProps={{
              readOnly: true,
            }}
            style={{width: "100%"}}
          />
  
            </Typography>
      {
      
      (typeof(item.options) == 'object') ?
      <ul>
          {
          item.options.map((subRowData,k) =>
          <div >
   
   <div   class="form-check">
     
    <input class="form-check-input"  type="radio" name="flexRadioDefault" id="flexRadioDefault1"
            onClick={(type) => addMoreQuestionField(item.questionText, subRowData.optionText,type= "optionRadio")}  
            checked={surveyChecked === subRowData.optionText ? true : false}
      //  onChange={(e) => setQuestions(e.target.value)}
  
             name="flexRadioDefault" 
            id="flexRadioDefault1"/>
  
    <label class="form-check-label" for="flexRadioDefault1">
      {subRowData.optionText}
    </label>
  </div>
  
  
  
          </div>
          )
     
          }
      </ul>   
      :
      null
      }
  
  </div>
  
  )}
  
   
  
          </DialogContent>
          <DialogActions style={{flexDirection: "column"}}>
          <Typography gutterBottom style={{marginTop:20}}>
            <i style={{fontWeight:"600"}}>" Survey and test a prospective action before undertaking it. Before you proceed, step back and look at the big picture, lest you act rashly on raw impulse."</i>
            </Typography>
            <Button style={{fontWeight:"600",marginTop:0}} autoFocus onClick={responseReturn}>
              Respond
            </Button>
          </DialogActions>
        </BootstrapDialog>
            </>
    )
     }

}

export default Posts
