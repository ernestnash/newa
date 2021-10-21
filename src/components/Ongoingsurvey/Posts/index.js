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
import { useHistory } from "react-router-dom"

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

function Posts({ postId,  ownerEmail, ownerId, ownerUsername, questions, timestamp, doc_desc, doc_name, read}) {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    var quest = [];
    var post_answer = [];
    var history = useHistory()
  
     var [answer,setAnswer] = useState([])
    let {user} = useSelector((state)=> ({...state}));


  const [numberOfSurvey, setNumberOfSurvey] = React.useState(0)
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false)
  const [questionOption, setQuestionOption] = useState("")


    useEffect(() => {
      db.collection('surveys').doc(postId).collection("responses").where("reply","==", true)
     .onSnapshot(snapshot => (
      setNumberOfSurvey(snapshot.docs.length)
     ))
  }, [numberOfSurvey]);





function select(que,option){
  // answer.map((ele)=>{
  //     ele.question==que ? ele.answer = option : console.log(" ")
  // })

 var k =answer.findIndex((ele)=>(ele.question == que))

 answer[k].answer=option
  setAnswer(answer)
  console.log(answer)
}

useEffect(()=>{
questions.map((q)=>{
  answer.push({
    "question": q.questionText,
    "answer" : " "
  })
  
})
questions.map((q,qindex)=>{
   quest.push(    {"header": q.questionText, "key": q.questionText })
})
console.log(answer)




},[])

 var  post_answer_data = {}

 

//  const onQuestionOptionChange = (e) => {
//    console.log("Text: ",e.target.value)
//    setQuestionOption(e.target.value)
//  }
function selectinput(que,option){
  console.log("Value1: ",questionOption)

  var k =answer.findIndex((ele)=>(ele.question == que))

  answer[k].answer=questionOption
   setAnswer(answer)
 }


 function selectcheck(e,que,option){
   var d =[]
var k =answer.findIndex((ele)=>(ele.question == que))
if(answer[k].answer){
  d=answer[k].answer.split(", ")

}

if(e == true){
  d.push(option)
}
else{
  var n=d.findIndex((el)=>(el.option == option))
  d.splice(n,1)

}

 answer[k].answer=d.join(", ")

  setAnswer(answer)
  console.log(answer)
 }


 const addData1 = () =>{


   console.log("Data: ",answer)
 }

const submit =() =>{


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
           questions1: answer,
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


// axios.post(`http://localhost:9000/student_response/${doc_name}`,{
//     "column": quest,
//     "answer_data" :[post_answer_data]
// })

// history.push(`/submitted`)
}
const handleClickOpen1 = () => {
  setOpen1(true);
};

const handleClose1 = () => {
  setOpen1(false);
};






var d = timestamp;
//var d =val.timestamp;

//NB: use + before variable name
var date = new Date(+d)

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
                    {doc_name}
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
  
          <span style={{color:"#45CBB2"}}>RESPOND FORM</span>
          </BootstrapDialogTitle>
          <DialogContent           style={{height: 800 }}
 dividers>
         
         <div className="submit">
        <div className="user_form">
            <div className="user_form_section1">
                <div className="user_title_section">
                    <Typography style={{fontSize:"26px"}} >{doc_name}</Typography>
                    <Typography style={{fontSize:"15px"}} >{doc_desc}</Typography>

                </div>
              
                {
                questions.map((question,qindex)=>(
                    <div className="user_form_questions">
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",fontSize:"14px"}} >{qindex+1}.  {question.questionText}</Typography>
                    {
                            question.options.map((ques,index)=>(
                              
                              <div key={index} style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex'}}>
                                  <div className="form-check">
                                    
                                      {

                                        question.questionType != "radio" ? (  
                                          question.questionType != 'text' ? (
                                        <label>
                                        <input
                                        
                                        type={question.questionType}
                                        name={qindex}
                                        value= {ques.optionText}
                                        className="form-check-input"
                                        required={question.required}
                                        style={{margnLeft:"5px",marginRight:"5px"}}
                                        onChange={(e)=>{selectcheck(e.target.checked,question.questionText,ques.optionText)}}
                                        /> {ques.optionText}
                                        </label>): (

                                        <label>



<div  className="InputText">
<TextField
              type={question.questionType}
                name={qindex}
                 required={question.required}
               style={{margnLeft:"5px",marginRight:"5px"}}
           onChange={(e)=>{selectinput(question.questionText,setQuestionOption(e.target.value))}}
          label="Your answer"
          placeholder="Type here..."
          multiline
          maxRows={3}
          variant="standard"
         
        sx={{width:400}}
        />
</div>
<div  className="InputText1">
<TextField
              type={question.questionType}
              name={qindex}
               required={question.required}
             style={{margnLeft:"5px",marginRight:"5px"}}
         onChange={(e)=>{selectinput(question.questionText,setQuestionOption(e.target.value))}}
        label="Your answer"
        placeholder="Type here..."
        multiline
        maxRows={3}
        variant="standard"
         
        />
</div>
                                        {/* <input

                                    type={question.questionType}
                                    name={qindex}
                                    className="form-check-input"                                     
                                    required={question.required}
                                    style={{margnLeft:"5px",marginRight:"5px"}}
                                 onChange={(e)=>{selectinput(question.questionText,setQuestionOption(e.target.value))}}
                                       />  */}
                                        {ques.optionText}


                                        </label>
                                        )
                                        
                                        )
                                        
                                        :(  <label>
                                          <input
                                            
                                            type={question.questionType}
                                            name={qindex}
                                            value= {ques.optionText}
                                            className="form-check-input"
                                            required={question.required}
                                            style={{margnLeft:"5px",marginRight:"5px"}}
                                            onChange={()=>{select(question.questionText,ques.optionText)}}
                                          />
                                      {ques.optionText}
                                        </label>)

                                      }
                                  
                                  </div>
                                  </div>
                                </div>
                            ))
                    }
                    </div>
                ))
                
                }         
                 
 
       

            </div>
            
        </div>
        </div>
   
  
          </DialogContent>
          <DialogActions style={{flexDirection: "column"}}>
          <Typography gutterBottom style={{marginTop:20}}>
            <i style={{fontWeight:"600",color:"#45CBB2"}}>" Survey and test a prospective action before undertaking it. Before you proceed, step back and look at the big picture, lest you act rashly on raw impulse."</i>
            </Typography>
            <Button style={{fontWeight:"600",marginTop:0,backgroundColor: "#45CBB2",border:"none",color: "#fff"}} autoFocus onClick={submit} >
              Respond
            </Button>
          </DialogActions>
        </BootstrapDialog>
            </>
    )
     }

}

export default Posts
