import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Login from "./components/Login"
import React,{useState,useEffect} from 'react'
import Slide from '@mui/material/Slide';
import Test from "./components/Test"
import Registerinstitution from './components/Registerinstitution';
import Registerstudent from './components/Registerstudent';
import Registerindividual from './components/Registerindividual';
import Ongoingsurvey from './components/Ongoingsurvey';
import Researchfindings from './components/Researchfindings';
import Recommendedbooks from './components/Recommendedbooks';
import Mydashboard1 from './components/Mydashboard';
import Registerstudentcomplete from './components/Registerstudentcomplete';
import RegisterInstitutioncomplete from './components/RegisterInstitutioncomplete';
import Box from '@mui/material/Box';
import { auth } from "./components/firebase"
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import HomeIcon from '@mui/icons-material/Home';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import Header from './components/Header';
import Surveyreply from './components/Surveyreply';
import Registerfaculty from './components/Registerfaculty';
import Registerfacultycomplete from "./components/RegisterInstitutioncomplete"
import Thanks from "./components/Thanks"


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function App() {
   const dispatch = useDispatch()
   const [value, setValue] = React.useState(0);
   const ref = React.useRef(null);
   const history = useHistory();

   const [open, setOpen] = React.useState(false);
   let {user} = useSelector((state)=> ({...state}));

   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        console.log("user", user)
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          }

        })
      }
    });
    //cleanup
    return () => unsubscribe();
   }, [])

   const home = (e) =>{
    e.preventDefault()
    history.push("/")
  }
  const ongoingsurveys = (e) =>{
    e.preventDefault()
    history.push("/ongoingsurveys")
  }
  const researchFindings = (e) =>{
    e.preventDefault()
    history.push("/researchfindings")
  }
  const recommendedBooks = (e) =>{
    e.preventDefault()
    history.push("/recommendedbooks")
  }
  const buyAudience = (e) =>{
    e.preventDefault()
    history.push("/mydashboard")
  }






  
  
  return (
    <div className="App">

      <h1></h1>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signIn" component={Login}/>
          <Route exact path="/test" component={Test}/>
          
          <Route exact path="/registerInstitution" component={Registerinstitution}/>
          <Route exact path="/registerInstitution/complete" component={RegisterInstitutioncomplete}/>

          <Route exact path="/registerstudent" component={Registerstudent}/>
          <Route exact path="/registerfaculty" component={Registerfaculty}/>
          <Route exact path="/registerindividual" component={Registerindividual}/>
          <Route exact path="/ongoingsurveys" component={Ongoingsurvey}/>
          <Route exact path="/researchfindings" component={Researchfindings}/>
          <Route exact path="/recommendedbooks" component={Recommendedbooks}/>
          <Route exact path="/mydashboard" component={Mydashboard1}/>
          <Route exact path="/registerstudent/complete" component={Registerstudentcomplete}/>
          <Route exact path="/registerfaculty/complete" component={Registerfacultycomplete}/>

          <Route exact path="/surveys/replies/:postId" component={Surveyreply}/>
          <Route exact path="/survey/response/thanks" component={Thanks}/>
          
        </Switch>

        {user &&(
  <Box sx={{ pb: 7 }}  ref={ref}>
      <CssBaseline />

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,zIndex: 999 }} elevation={3}>
        <BottomNavigation
        style={{height: 70}}
          showLabels

          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          
          <BottomNavigationAction  onClick={home} label="Home" icon={<HomeIcon/>} onClick={home}/>
          <BottomNavigationAction  onClick={ongoingsurveys} label="Ongoing Surveys"   icon={<SpeedIcon onClick={ongoingsurveys}/>}/>
          <BottomNavigationAction  onClick={researchFindings} label="Research Findings" icon={<CancelPresentationIcon />} onClick={researchFindings}/>
          <BottomNavigationAction   onClick={recommendedBooks} label="Papers and Books"  icon={<LocalLibraryIcon />} onClick={recommendedBooks}/>
          <BottomNavigationAction  onClick={buyAudience} label="Dashboard" icon={<ShoppingBasketIcon />} onClick={buyAudience}/>

        </BottomNavigation>
      </Paper>
    </Box>
)}
    </div>
  );
}

export default App;
