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
import { toast, ToastContainer} from 'react-toastify';
import MaterialTable from 'material-table'
import XLSX from 'xlsx'
import PrintIcon from '@material-ui/icons/Print'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SubjectIcon from '@mui/icons-material/Subject';
import { CSVLink, CSVDownload } from "react-csv";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

function Posts({ postId,  ownerEmail, ownerId, ownerUsername, questions, timestamp, formDescription, formTitle, read, active,posts}) {
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
  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);

  for(let i = 0; i < questions.length; i++) {

    for(let j = 0; j < questions[i].length; j++) {
      
       console.log(questions[i][j]);
    }
 }
  const surveyData = [
    {
      id: 1,
      name: `${formTitle}`,
      numberOfParticipation: `${numberOfSurvey}`,
      description: `${formDescription}`,
      status: active === true ? "Open" : "Closed",
      dateModified: `${date.toDateString()}, ${date.toLocaleTimeString()}`,
    }
  ]

  const csvData = [
    ["Name", "Number Of Paricipants", "Description", "Status", "Date Modified"],
    [`${formTitle}`, `${numberOfSurvey}`, `${formDescription}`, `${active === true ? "Open" : "Closed"}`, `${date.toDateString()}, ${date.toLocaleTimeString()}`],
  ];



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
          alert("You have participated already!")
        }
        else {
            db.collection('surveys').doc(postId).collection("responses").add({
                //
              timestamp:  Date.now(),
              fromUsername: `${user.email.split('@')[0]}` || auth?.currentUser?.displayName,
              fromEmail: user?.email || auth?.currentUser?.email,
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
              alert("Thank you the response has been submitted successfully\nThe information provided shall be treated confidential")
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




     const closeSurvey = (e) => {
      e.preventDefault()

      db.collection("surveys").doc(postId).update({
      active:false
      }).then(function() {
        toast.success("Survey has been closed");
      });
      
     }

     const openSurvey = (e) => {
      e.preventDefault()

      db.collection("surveys").doc(postId).update({
      active:true
      }).then(function() {
        toast.success("Survey has been Opened");
      });
      
     }

     const deleteSurvey = (e) => {
      e.preventDefault()

      db.collection('surveys').doc(postId).delete()
      .then(()=>{toast.success("Successfully deleted survey!")})
      .catch((error)=>{ toast.error("Failed to delete survey!")})
     }
      
     const downloadExcel = () => {
      const newData = surveyData.map(row => {
        delete row.tableData
        return row
      })
      const workSheet = XLSX.utils.json_to_sheet(newData)
      const workBook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook, workSheet, "surveys")
      //Buffer
      XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
      //Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
      //Download
      XLSX.writeFile(workBook, `${formTitle}.xlsx`)
  
  
    }
     const columns = [
      { title: "Name", field: "name", },
      { title: "Number of participants", field: "numberOfParticipation", },
      { title: "Description", field: "description" },
      { title: "Status", field: "status"},
      { title: "Date Modified", field: "dateModified"},
      ]

      console.log("Posts: ", posts[0])
     const downloadPdf = () => {
      const doc = new jsPDF()
      doc.text("Survey Details", 20, 10)
      doc.autoTable({
        theme: "grid",
        columns: columns.map(col => ({ ...col, dataKey: col.field })),
        body:surveyData
      })
      doc.save(`Survey ${formTitle}`)
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

                  <TableCell align="right">
                  <Select
        sx={{border: "none"}}
        >
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem> */}
           <MenuItem> <CSVLink data={csvData}><DocumentScannerIcon style={{color: "#45CBB2"}}/> <span style={{color: "#000"}}>Export to Csv</span></CSVLink></MenuItem>;
          <MenuItem onClick={downloadExcel}><SubjectIcon style={{color: "#45CBB2"}} /> Export to Excel</MenuItem>
          
          <MenuItem onClick={downloadPdf}><PrintIcon style={{color: "#45CBB2"}} /> Export to Pdf</MenuItem>
        </Select>
                     </TableCell>
  
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
                              <TableCell style={{fontWeight:"600",color:"#45CBB2"}}>Responses</TableCell>
                              {active === true &&(
                              <TableCell style={{fontWeight:"600",color:"#45CBB2"}} align="right">Open</TableCell>
                              )}
                              {active === false &&(
                              <TableCell style={{fontWeight:"600",color:"#45CBB2"}} align="right">Closed</TableCell>
                              )}
                              <TableCell style={{fontWeight:"600",color:"#45CBB2"}} align="right">Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  {date.toDateString()}, {date.toLocaleTimeString()}
                                </TableCell>
                                <TableCell>
                                <button onClick={handleClickOpen1}  style={{width:80,backgroundColor:"#45CBB2",color:"#fff",border:"none"}}>View</button>
                                </TableCell>
                                <TableCell align="right">
                                  {active === true &&(
                                <button  onClick={closeSurvey} style={{width:80,backgroundColor:"#45CBB2",color:"#fff",border:"none"}}>close</button>
                                  )}
                                   {active === false &&(
                                <button onClick={openSurvey}  style={{width:80,backgroundColor:"#45CBB2",color:"#fff",border:"none"}}>open</button>
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                    <button onClick={deleteSurvey}  style={{width:80,backgroundColor:"#45CBB2",color:"#fff",border:"none"}}>Delete</button>
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
          

  
          </Typography>
    hello  
   
  
          </DialogContent>
          <DialogActions style={{flexDirection: "column"}}>
          <Typography gutterBottom style={{marginTop:20}}>
            <i style={{fontWeight:"600"}}>" Survey and test a prospective action before undertaking it. Before you proceed, step back and look at the big picture, lest you act rashly on raw impulse."</i>
            </Typography>
            <Button style={{fontWeight:"600",marginTop:0}} autoFocus onClick={handleClose1}>
              Cancel
            </Button>
          </DialogActions>
        </BootstrapDialog>
            </>
    )
     }

}

export default Posts
