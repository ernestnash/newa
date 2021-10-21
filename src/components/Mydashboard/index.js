import React,{useContext,useState,useEffect} from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import img from "../../assets/jedd.jpg"
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import "./styles.css"
import firebase from 'firebase'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PostAddIcon from '@mui/icons-material/PostAdd';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { auth,db,storage } from "../firebase"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Charts from '../Charts';
import $ from 'jquery';
import EditIcon from '@mui/icons-material/Edit';
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { getAuth, deleteUser } from "firebase/auth";
import Mysurveys from '../Mysurveys';
import Header from '../Header';


function Mydashboard({history}) {
    let {user} = useSelector((state)=> ({...state}));
    const [surveys, setSurveys] = useState("Survey")
    const [dash, setDash] = useState("")
    const [showSurveys1, setSurveys1] = useState(false)
    const [showDashboard1, setDashboard1] = useState(false)

    if(!user){
        history.push("/signIn")
    }
 const showSurveys = () =>{
    setSurveys1(true)
    setDashboard1(false)
 }
 const showDashboard = () =>{
    setSurveys1(false)
    setDashboard1(true)
 }

    return (
        <body>
            <Header />
            <ToastContainer />
            <div className="buyResearchAudience">
            <div style={{textAlign: "center",fontSize:30,fontWeight:"600",marginBottom:0}}><span>MY SURVEYS</span></div>
               <div style={{alignItems: "center",display: "flex",alignSelf: "center",justifyContent:"center"}}>
               <Button onClick={showSurveys} variant="contained" style={{backgroundColor: "#45CBB2",fontWeight:"900"}} color="success">
        Surveys
      </Button>
      <Button onClick={showDashboard} style={{backgroundColor: "#fff",color: "#45CBB2",fontWeight:"900"}} variant="contained" color="success">
        Chart Summury
      </Button>
               </div>

{showSurveys1 ?(
    <Mysurveys style={{marginTop:15}} uid={`${auth?.currentUser?.uid}`}/>
): showDashboard1 ?(
<Charts />
):(
    <Mysurveys style={{marginTop:15}} uid={`${auth?.currentUser?.uid}`}/>

)}
               

            </div>
        </body>
    )
}

export default Mydashboard
