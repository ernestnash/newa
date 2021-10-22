import React,{useState,useEffect} from 'react'
//import QuestionHeader from './QuestionHeader';
import {Grid} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Switch from '@material-ui/core/Switch';
import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ImageUplaodModel from './ImageUplaodModel';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import { toast, ToastContainer } from 'react-toastify'
import { db, auth } from "../firebase"
import { motion } from "framer-motion"
import { useDispatch,useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import BackupIcon from '@material-ui/icons/Backup';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AppsIcon from '@material-ui/icons/Apps';
import {BsTrash} from "react-icons/bs"
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import TextFieldsIcon from '@material-ui/icons/TextFields';
// ------------------------------------------
import "./styles.css"
import {BsFileText} from "react-icons/bs"
import {FcRightUp} from "react-icons/fc"


const containerVariants = {
    hidden:{
     opacity:0,
      x: '100vw',
    },
    visible:{
      opacity:1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300
      }
    }
  }

  const submitBtns = {
    hidden:{
      opacity:0,
       x: '-100vw',
     },
     visible:{
       opacity:1,
       x: 0,
       transition: {
         type: 'spring',
         delay: 2.0
       }
     },
     exit:{
       x: '-100vw',
       transition:{
         ease: 'easeOut'
       }
     }
  }


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
  

function QuestionsTab({setFormTitle, formDescription, formTitle, setFormDescription}) {

  const [questions, setQuestions]= React.useState([]);
  const [openUploadImagePop, setOpenUploadImagePop] = React.useState(false);
  const [imageContextData, setImageContextData] = React.useState({question: null, option: null});
  const [formData, setFormData] = React.useState({});
  const [loadingFormData, setLoadingFormData] = React.useState(true);
  let {user} = useSelector((state)=> ({...state}));
  const [loading, setLoading] = useState(false)
  const [open1, setOpen1] = React.useState(false);
  const [questionType,setType] =useState("radio");
  const [questionRequired,setRequired] =useState("true"); 
  const [open2, setOpen2] = React.useState(true);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleToggle = () => {
    setOpen2(true);
  };

  useEffect(()=>{
      var newQuestion = {questionText: "Question",answer:false,answerKey:"",questionType:"radio", options : [{optionText: "Option 1"}], open: true, required:false}

         setQuestions([...questions, newQuestion])
    
  },[])



  const [profileUserData, setProfileUserData] = useState();
  var test = profileUserData?.username
  console.log("Uid: ",test)


  const currentUserId= `${auth?.currentUser?.uid}`

  useEffect(() => {
    db.collection('users').doc(`${currentUserId}`).onSnapshot((doc) => {
        setProfileUserData(doc.data());
    });
}, [])
  const addData = async(e) =>{
    setLoading(true)

      if(!questions[0]){
        setLoading(false)
        toast.error("You cannot submit a survey without any question!")
      }else{
        await db.collection('surveys').add({
            //
           questions,
           timestamp:  Date.now(),
           formTitle,
           formDescription,
           ownerId:auth?.currentUser?.uid,
           ownerEmail:auth?.currentUser?.email,
           active:true,
           read:false,
     
        }).then(ref =>{
          setLoading(false)
          toast.success("Survey Form submitted successfully")})
        setQuestions([])
        setFormDescription("")
        setFormTitle("")
      }
  }


  

  function saveQuestions(){
    console.log("auto saving questions initiated");
    var data = {
      formId: formData._id,
      name: formData.name,
      description: formData.description,
      questions: questions
    }
    
  }

  function checkImageHereOrNotForQuestion(gg){
   // console.log(gg);
    if ((gg === undefined)||(gg==="")){
      return false;
    } else{
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg){
   // console.log(gg);
    if ((gg === undefined)||(gg==="")){
      return false;
    } else{
      return true;
    }
  }

function addMoreQuestionField(){
          expandCloseAll(); //I AM GOD
    
          setQuestions(questions=> [...questions, {questionText: "Question", questionType:"radio", options : [{optionText: "Option 1"}], open: true, required:false}]);
      }

      function addQuestionType(i,type){
        let qs = [...questions];  
        console.log(type)
        qs[i].questionType = type;
        
        setQuestions(qs);
        
      }
    

      function copyQuestion(i){
        expandCloseAll()
        let qs = [...questions]
        var newQuestion = qs[i]
  
        setQuestions([...questions, newQuestion])
  
      }
      
        function deleteQuestion(i){
          let qs = [...questions]; 
          if(questions.length > 1){
            qs.splice(i, 1);
          }
          setQuestions(qs)
        }
        
        function handleOptionValue(text,i, j){
          var optionsOfQuestion = [...questions];
          optionsOfQuestion[i].options[j].optionText = text;
          //newMembersEmail[i]= email;
          setQuestions(optionsOfQuestion);
        }
      
        function handleQuestionValue(text, i){
          var optionsOfQuestion = [...questions];
          optionsOfQuestion[i].questionText = text;
          setQuestions(optionsOfQuestion);
        }
      
        function onDragEnd(result) {
            if (!result.destination) {
              return;
            }
            var itemgg = [...questions];
            const itemF = reorder(
              itemgg,
              result.source.index,
              result.destination.index
            );
            setQuestions(itemF);
        }
      
        const reorder = (list, startIndex, endIndex) => {
          const result = Array.from(list);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return result;
        };

  function updateImageLink(link, context){
    
    var optionsOfQuestion = [...questions];
    var i = context.question

    if (context.option == null) {
      optionsOfQuestion[i].questionImage= link;
    } else {
      var j = context.option
      optionsOfQuestion[i].options[j].optionImage = link;
    }
    setQuestions(optionsOfQuestion);
  }

  function showAsQuestion(i){
    let qs = [...questions];  
     qs[i].open = false;
     setQuestions(qs);
  }

  function addOption(i){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length < 5){
      optionsOfQuestion[i].options.push({optionText: "Option " + (optionsOfQuestion[i].options.length + 1)})
    } else{
      console.log("Max  5 options ");  
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion)
  }

  function setOptionAnswer(ans,qno){
    var Questions = [...questions];

      Questions[qno].answer = ans;
    

    setQuestions(Questions)
    console.log(qno+" "+ans)
  }

  function setOptionPoints(points,qno){
    var Questions = [...questions];

      Questions[qno].points = points;
    

    setQuestions(Questions)
    console.log(qno+" "+points)
  }
  function addAnswer(i){
    var answerOfQuestion = [...questions];
    
      answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
    
    setQuestions(answerOfQuestion)
  }

  function doneAnswer(i){
    var answerOfQuestion = [...questions];
    
      answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
    
    setQuestions(answerOfQuestion)
  }

  function requiredQuestion(i){
    var requiredQuestion = [...questions];
  
      requiredQuestion[i].required =  ! requiredQuestion[i].required
    
    console.log( requiredQuestion[i].required+" "+i);
    setQuestions(requiredQuestion)
  }


  function removeOption(i, j){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length > 1){
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion)
      console.log(i + "__" + j);
    }   
  }

  function expandCloseAll(){
    let qs = [...questions]; 
     for (let j = 0; j < qs.length; j++) {  
      qs[j].open = false;
     }
     setQuestions(qs);
  }

  function handleExpand(i){
    let qs = [...questions]; 
    for (let j = 0; j < qs.length; j++) {
      if(i ===j ){
        qs[i].open = true;
 
      } else{
        qs[j].open = false;
       }
    }
     setQuestions(qs);
  }


  function questionsUI(){
    return  questions.map((ques, i)=> (
      <Draggable key={i} draggableId={i + 'id'} index={i}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
 <div>
          <div style={{marginBottom: "15px"}}>
            <div style={{width:'100%', marginBottom: '-7px' }}>
              <DragIndicatorIcon style={{transform: "rotate(-90deg)", color:'#DAE0E2'}} fontSize="small"/>
            </div>

<Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open}>
  <AccordionSummary            
    aria-controls="panel1a-content"
    id="panel1a-header"
    elevation={1} style={{width:'100%'}}
  >
    { !questions[i].open ? (

        
<div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '3px', paddingTop: '15px', paddingBottom: '15px'}}>    
    
    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >{i+1}.  {ques.questionText}</Typography>

    
    {ques.options.map((op, j)=>(
     
     <div key={j} >
       <div style={{display: 'flex',}}>
        <FormControlLabel style={{marginLeft:"5px",marginBottom:"5px"}} disabled control={<input type={ques.questionType} color="primary" style={{marginRight: '3px', }} required={ques.type}/>} label={
            <Typography style={{fontFamily:' Roboto,Arial,sans-serif',
                fontSize:' 13px',
                fontWeight: '400',
                letterSpacing: '.2px',
                lineHeight: '20px',
                color: '#202124'}}>
              {ques.options[j].optionText}
            </Typography>
          } />
       </div>

     
     </div>

         

    ))}  
  </div>            
  ): ""}   
  </AccordionSummary>
      <div className="question_boxes">
      {!ques.answer ? (<AccordionDetails className="add_question" >
         
        <div >
            <div style={{display: 'flex',alignItems: "center",flexWrap:"wrap"}} className="add_question_top">
              <div>
              {i+1}<input type="text" className="question" placeholder={`Question`}    value={ques.questionText} onChange={(e)=>{handleQuestionValue(e.target.value, i)}}></input>

                </div>
                <div>
                <Select className="select"  style={{color:"#5f6368",fontSize:"13px"}} >
 
 <MenuItem id="text" value="Text" onClick= {()=>{addQuestionType(i,"text")}}> <SubjectIcon style={{marginRight:"10px"}} />  Paragraph</MenuItem>
  <MenuItem id="checkbox"  value="Checkbox" onClick= {()=>{addQuestionType(i,"checkbox")}}><CheckBoxIcon style={{marginRight:"10px" ,color:"#70757a"}} checked /> Checkboxes</MenuItem>
 <MenuItem id="radio" value="Radio" onClick= {()=>{addQuestionType(i,"radio")}}> <Radio style={{marginRight:"10px",color:"#70757a"}} checked/> Multiple Choice</MenuItem>


</Select>
                </div>

                    
                        
            </div>
    
    

 


            {ques.options.map((op, j)=>(
                                <div className="add_question_body" key={j}>
                                    {/* <Checkbox  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} disabled/> */}
                                    {
                                        (ques.questionType!="text") ? 
                                        <input type={ques.questionType}  style={{marginRight:"10px"}}/> :
                                        <ShortTextIcon style={{marginRight:"10px"}} />

                                    }
                                    <div >
                                        <input type="text" className="text_input" placeholder="option"  value={ques.options[j].optionText}onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}></input>
                                    </div>


                                    <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                                            <CloseIcon />
                                    </IconButton>
                                </div>   
                            ))}  
        
    
    
                {ques.options.length < 5 ? (
                <div className="add_question_body">
                <FormControlLabel disabled control={ 
                
                (ques.questionType!="text") ? 
                <input type={ques.questionType}  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} style={{marginLeft:"10px",marginRight:"10px"}} disabled/> :
                <ShortTextIcon style={{marginRight:"10px"}} />

                } label={
                <div>
                    <input type="text" className="text_input" style={{fontSize:"13px",width:"60px"}} placeholder="Add other"></input>
                    <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}>Add Option</Button>
                </div>
                } /> 
                </div>

                ): ""}
               <div className="">
               <div className="add_question_bottom_left">
        
               <Button size="small"  onClick={()=>{addAnswer(i)}} style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}>       <FcRightUp style={{border:"2px solid #4285f4", padding:"2px",marginRight:"8px"}} /> Answer key</Button>
                 
              </div>

                <div className="add_question_bottom">
                <IconButton aria-label="View" onClick={()=>{showAsQuestion(i)}}>
                      <VisibilityIcon />
                    </IconButton>
                  
                    <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                        <FilterNoneIcon/>
                    </IconButton>
                    
                    <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                        <BsTrash />
                    </IconButton>
                        <span style={{color:"#5f6368",fontSize:"13px"}}>Required </span> <Switch name="checkedA" color="primary" checked={ques.required} onClick={()=>{requiredQuestion(i)}}/>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
              </div>
            </div>
            
    </AccordionDetails>):(

<AccordionDetails className="add_question" >
         <div className="top_header">
              Choose Correct Answer
         </div>
<div >
<div className="add_question_top">
<input type="text" className="question " placeholder="Question"    value={ques.questionText} onChange={(e)=>{handleQuestionValue(e.target.value, i)}} disabled/>
<input type="number" className="points" min="0" step="1" placeholder="0" onChange={(e)=>{setOptionPoints(e.target.value, i)}} />


</div>




{ques.options.map((op, j)=>(
<div className="add_question_body" key={j} style={{marginLeft:"8px",marginBottom:"10px",marginTop:"5px"}}>

<div key={j}>
                  <div style={{display: 'flex'}} className="">
                  <div className="form-check">
                    <label style={{fontSize:"13px"}} onClick={()=>{setOptionAnswer(ques.options[j].optionText, i)}}>

                    {(ques.questionType!="text") ? 
                         <input
                         type={ques.questionType}
                         name={ques.questionText}
                         
                         value="option3"
                         className="form-check-input"
                         required={ques.required}
                         style={{marginRight:"10px",marginBottom:"10px",marginTop:"5px"}}
                       />:
                        <ShortTextIcon style={{marginRight:"10px"}} />
}
                     
                  {ques.options[j].optionText}
                    </label>
                  </div>
                  </div>
                </div>

</div>   
))}  



<div className="add_question_body">


<Button size="small"  style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}> <BsFileText style={{fontSize:"20px",marginRight:"8px"}}/>Add Answer Feedback</Button>


</div>




<div className="add_question_bottom">

<Button variant="outlined" color="primary"  style={{textTransform: 'none',color:"#4285f4",fontSize:"12px",marginTop:"12px",fontWeight:"600"}} onClick={()=>{doneAnswer(i)}}>
        Done
      </Button>

</div>
</div>

</AccordionDetails>


       
    )}

    </div>
            
</Accordion>

</div>
</div>
        </div>
      )}
</Draggable>
      
     )
    )
  }


  const handleClose1 = () => {
    setOpen1(false);
  };



//   if(loading){
//     return(

//      <BootstrapDialog
//      onClose={handleClose1}
//      aria-labelledby="customized-dialog-title"
//      open={open1}
    
//    >

//      <DialogContent 
//       style={{backgroundColor: "trasparency"}}          
// dividers>
//      <Typography gutterBottom >
     
// <div style={{alignItems: "center",display: "flex"}}>
// <div><CircularProgress /></div>
// <div style={{marginLeft:10}}> Loading... </div>
// </div>

 
//      </Typography>


//      </DialogContent>

//    </BootstrapDialog>
     
//     )
//   }else{

    return (
      <>

                      <ToastContainer/>
                      {loading ?(
                        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open2}
        onClick={handleClose2}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
                      ):(
                        <div style={{marginTop:'15px', marginBottom: '7px', paddingBottom:"30px"}}>
           
                        {formDescription !== '' && formTitle !== '' &&(
                         <Grid
                         container
                         direction="column"
                         justify="center"
                         alignItems="center"
                         >
                           
                          <Grid item xs={12} sm={5} style={{width: '100%'}}>
                               <motion.div
                                                 variants={containerVariants}
                                                 initial="hidden"
                                                 animate="visible"
                               >
                               <Grid style={{borderTop: '10px solid teal', borderRadius: 10}}
             
                               >
                                   <div>
                                       <div>
                                         <Paper elevation={2} style={{width:'100%'}}>
                                           <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
                                             
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
                              </motion.div>
             
                               <Grid style={{paddingTop: '10px'}}>
                                 <motion.div
                                 variants={submitBtns}
                                 >
                                 <ImageUplaodModel handleImagePopOpen={openUploadImagePop} handleImagePopClose={()=>{setOpenUploadImagePop(false)}} updateImageLink={updateImageLink} contextData={imageContextData}/>
             
                                 <DragDropContext onDragEnd={onDragEnd}>
                                   <Droppable droppableId="droppable">
                                     {(provided, snapshot) => (
                                       <div
                                         {...provided.droppableProps}
                                         ref={provided.innerRef}
                                       >
                                         {questionsUI()}
             
                                         {provided.placeholder}
                                       </div>
                                     )}
                                   </Droppable>
                                 </DragDropContext>
                                 <div>                       
                                     <Button
                                       variant="contained"
                                       
                                       onClick={addMoreQuestionField}
                                       endIcon={<AddCircleIcon />}
                                       style={{margin: '5px'}}
                                     >Add Question </Button>
             
                                     <Button
                                       variant="contained"
                                       color="primary"
                                       onClick={addData}
                                       style={{margin: '5px'}}
                                       endIcon={<PublishIcon />}
                                     >Submit </Button>
                                   </div>
                                 </motion.div>
                               </Grid>        
                           </Grid>           
                        </Grid>
                        )}
                        
                    </div>
                      )}
                      

       </>
  );
  

 
}
export default QuestionsTab
