import { Button, Typography } from '@material-ui/core'
import React ,{useState,useEffect} from 'react'
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
import { useSelector,useDispatch } from 'react-redux';
import { db,auth } from "../firebase"
import { useHistory,useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import "./styles.css"
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';



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

function Surveyreply() {
  const { postId } = useParams()
  const [questions1,setQuestions] = useState()
  var quest = [];
  var post_answer = [];
  var history = useHistory()
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false)
  const [questionOption, setQuestionOption] = useState("")  
   var [answer,setAnswer] = useState([])
   const [open, setOpen] = React.useState(false);
   const [open1, setOpen1] = React.useState(false);
   let {user} = useSelector((state)=> ({...state}));



//    var [{questions,doc_name,doc_desc},dispatch] = useStateValue("")

useEffect(() => {
    db.collection('surveys').doc(`${postId}`).onSnapshot((doc) => {
        setQuestions(doc.data());
    });
}, [])
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
    questions1?.questions.map((q)=>{
    answer?.push({
      "question": q.questionText,
      "answer" : " "
    })
    
  })
  questions1?.questions.map((q,qindex)=>{
     quest?.push(    {"header": q?.questionText, "key": q?.questionText })
  })
  console.log(answer)

  


 },[])

   var  post_answer_data = {}

   function selectinput(que,option){
    var k =answer?.findIndex((ele)=>(ele?.question == que))

    answer[k].answer=questionOption
     setAnswer(answer)
   }

   function selectcheck(e,que,option){
     var d =[]
  var k =answer?.findIndex((ele)=>(ele?.question == que))
  if(answer[k]?.answer){
    d=answer[k]?.answer.split(",")

  }

  if(e == true){
    d.push(option)
  }
  else{
    var n=d?.findIndex((el)=>(el?.option == option))
    d.splice(n,1)

  }

   answer[k].answer=d?.join(",")

    setAnswer(answer)
    console.log(answer)
   }


const submit = () =>{

    if(questions1?.active === true){
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
                        ownerFormId: questions1?.ownerId,
                        lat,
                        lng,
                   
                  }).then(ref =>{
                    setLoading(false)
                    history.push(`/surveys/replies/${postId}/thanks`)
                  })
              }
            }
          )
         
         }
    }else{
        setLoading(false)
        toast.error("Sorry this survey has been closed!")
    }

    
}

const handleClickOpen1 = () => {
    setOpen1(true);
  };
  
  const handleClose1 = () => {
    setOpen1(false);
  };



    return (  
        <>
        <>
      <div className="submit">
      <ToastContainer/>

        <div className="user_form">

            <div className="user_form_section">
                <div className="user_title_section">
                    
                        <>
                        <Typography style={{fontSize:"26px"}} >{questions1?.formTitle}</Typography>
                        <Typography style={{fontSize:"15px"}} >{questions1?.formTitle}</Typography>
                        </>


                </div>
              
              
                {
                questions1?.questions.map((question,qindex)=>(
                    <div className="user_form_questions">
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",fontSize:"14px"}} >{qindex+1}.  {question.questionText}</Typography>
                    {
                            question?.options?.map((ques,index)=>(
                              
                              <div key={index} style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex'}}>
                                  <div className="form-check">
                                    
                                      {

                                        question?.questionType != "radio" ? (  
                                          question?.questionType != 'text' ? (
                                        <label>
                                        <input
                                        
                                        type={question?.questionType}
                                        name={qindex}
                                        value= {ques?.optionText}
                                        className="form-check-input"
                                        required={question?.required}
                                        style={{margnLeft:"5px",marginRight:"5px"}}
                                        onChange={(e)=>{selectcheck(e.target.checked,question?.questionText,ques?.optionText)}}
                                        /> {ques?.optionText}
                                        </label>): (

                                        <label>
<div  className="InputText2">
<TextField
              type={question?.questionType}
                name={qindex}
                 required={question?.required}
               style={{margnLeft:"5px",marginRight:"5px"}}
           onChange={(e)=>{selectinput(question?.questionText,setQuestionOption(e.target.value))}}
          label="Your answer"
          placeholder="Type here..."
          multiline
          maxRows={3}
          variant="standard"
         
        sx={{width:400}}
        />
</div>
<div  className="InputText3">
<TextField
              type={question?.questionType}
              name={qindex}
               required={question?.required}
             style={{margnLeft:"5px",marginRight:"5px"}}
         onChange={(e)=>{selectinput(question?.questionText,setQuestionOption(e.target.value))}}
        label="Your answer"
        placeholder="Type here..."
        multiline
        maxRows={3}
        variant="standard"
        sx={{width:250}}

        />
</div>
                                        </label>
                                        )
                                        
                                        )
                                        
                                        :(  <label>
                                          <input
                                            
                                            type={question?.questionType}
                                            name={qindex}
                                            value= {ques?.optionText}
                                            className="form-check-input"
                                            required={question?.required}
                                            style={{margnLeft:"5px",marginRight:"5px"}}
                                            onChange={()=>{select(question?.questionText,ques?.optionText)}}
                                          />
                                      {ques?.optionText}
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
                 
            <div style={{alignSelf:"center"}} className="">
            <Button  variant="contained" color="primary" onClick={submit} style={{fontSize:"14px",backgroundColor: "#45CBB2",fontWeight:"600"}}>{loading?(<><CircularProgress style={{height:30,width:30,color:"#fff"}}/></>):(<>Submit</>)}</Button>

            </div>
       

            </div>
            
        </div>
        </div>
        </>

       
        </>
    )
}
// }

export default Surveyreply

