import React,{useState,useEffect} from 'react'
import Header from '../Header'
import "./styles.css"
import img from "../../assets/jedd.jpg"
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import { useDispatch,useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify'
import { db, auth } from "../firebase"
import Survey from "../Survey"
import { motion } from "framer-motion"
import Geocode from "react-geocode";
import { useParams } from "react-router-dom"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Home({history}) {

  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);



  const [open, setOpen] = React.useState(false);
  let {user} = useSelector((state)=> ({...state}));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [academicField, setAcademicField] = React.useState('');
  const [academicTopic, setAcademicTopic] = React.useState('');
  const [academicTopicOther, setAcademicTopicOther] = React.useState('');
  const [surveyName, setSurveyName] = React.useState('');
  const [questions, setQuestions] = React.useState('');
  const google = window.google;
  const { uid } = useParams()


 


  const handleChange = (event) => {
    setAcademicField(event.target.value);
  };


  const addSurvey = (e) =>{
    e.preventDefault();

    if(academicTopicOther === ''){

  

        db.collection('surveys').add({
            //
          timestamp:  Date.now(),
          surveyName,
          academicField,
          academicTopic,
          questions,
          ownerId:auth?.currentUser?.uid,
          ownerEmail: user?.email || auth?.currentUser?.email,
          ownerUsername: `${user.email.split('@')[0]}` || auth?.currentUser?.displayName,
          active:true,
          reade:false,
     
        }).then(ref => toast.success("Survey Form submitted successfully"))
        setAcademicField("");
        setAcademicTopic("");
        setSurveyName("");
        setQuestions("");

    
    }else{

      db.collection('surveys').add({
        //
      timestamp:  Date.now(),
      surveyName,
      academicField,
      academicTopic: academicTopicOther,
      questions,
      ownerId:auth?.currentUser?.uid,
      ownerEmail: user?.email || auth?.currentUser?.email,
      ownerUsername: `${user.email.split('@')[0]}` || auth?.currentUser?.displayName,
      active:true,
      reade:false,

 
    }).then(ref => toast.success("Survey Form submitted successfully"))
    setAcademicField("");
    setAcademicTopicOther("");
    setSurveyName("");
    setQuestions("");
    }
  }


//   // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey("AIzaSyAwV1-Ekdy98EBFcGu48k9kf1KaNi4jhUY");

// // set response language. Defaults to english.
// Geocode.setLanguage("en");

// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("es");

// // set location_type filter . Its optional.
// // google geocoder returns more that one address for given lat/lng.
// // In some case we need one address as response for which google itself provides a location_type filter.
// // So we can easily parse the result for fetching address components
// // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
// Geocode.setLocationType("ROOFTOP");

// // Enable or disable logs. Its optional.
// Geocode.enableDebug();

// // Get address from latitude & longitude.
// Geocode.fromLatLng("48.8583701", "2.2922926").then(
//   (response) => {
//     const address = response.results[0].formatted_address;
//     console.log(address);
//   },
//   (error) => {
//     console.error(error);
//   }
// );


// // Get formatted address, city, state, country from latitude & longitude when
// // Geocode.setLocationType("ROOFTOP") enabled
// // the below parser will work for most of the countries
// Geocode.fromLatLng("48.8583701", "2.2922926").then(
//   (response) => {
//     const address = response.results[0].formatted_address;
//     let city, state, country;
//     for (let i = 0; i < response.results[0].address_components.length; i++) {
//       for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
//         switch (response.results[0].address_components[i].types[j]) {
//           case "locality":
//             city = response.results[0].address_components[i].long_name;
//             break;
//           case "administrative_area_level_1":
//             state = response.results[0].address_components[i].long_name;
//             break;
//           case "country":
//             country = response.results[0].address_components[i].long_name;
//             break;
//         }
//       }
//     }
//     console.log(city, state, country);
//     console.log(address);
//   },
//   (error) => {
//     console.error(error);
//   }
// );

// // Get latitude & longitude from address.
// Geocode.fromAddress("Eiffel Tower").then(
//   (response) => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log(lat, lng);
//   },
//   (error) => {
//     console.error(error);
//   }
// );





 
    return (
        <body>
            <Header uid={uid}/>

<div className="login">
      <div className="loginForm">
      <div >
            <div class="center" >
              {!user &&(
                <>
                                <div>
                <img className="imgHome" src={img} alt="" style={{borderRadius:10,border:"2px solid #999999"}}/>
                </div>
                <div style={{marginLeft:30}}>
                    <span class="span1" style={{fontSize:18,color: "#525252",fontWeight:"600"}}>
                    <p>With Simple Surveys, conduct market research quickly.</p>
             <p>Expand your market research capabilities to keep track of your brand, test your ideas, or get a gut check with your target audience.</p>

                    </span>
                </div>
                </>
              )}



             {user &&(
                            <div>
                            {/* <div style={{border: "2px solid #0476D0",width:300,height:40,textAlign: "center",fontWeight:"700",fontSize: 20,cursor: "pointer"}}><span ><a style={{color: "#000"}} onClick={handleClickOpen}>START NEW SURVEY</a></span></div> */}
                            <motion.button animate={{ rotateZ: 360 }} onClick={handleClickOpen} style={{marginLeft: 10,marginTop:10,width:300}} class="custom-btn btn-3"><span style={{fontSize:13,fontWeight:"900"}}>START NEW SURVEY</span></motion.button>
 
                               {/* <div className="App">
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
    </div> */}
                               {/* <div style={{border: "2px solid #0476D0",width:300,height:40,textAlign: "center",fontWeight:"700",fontSize: 20,marginTop:10,cursor: "pointer"}}><span><a style={{color: "#000"}} href="/Ongoingsurveys">ONGOING SURVEYS</a></span></div>
                               <div style={{border: "2px solid #0476D0",width:300,height:40,textAlign: "center",fontWeight:"700",fontSize: 20,marginTop:10,cursor: "pointer"}}><span><a style={{color: "#000"}} href="/researchfindings">RESEARCH FINDINGS</a></span></div>
                               <div style={{border: "2px solid #0476D0",width:300,height:40,textAlign: "center",fontWeight:"700",fontSize: 20,marginTop:10,cursor: "pointer"}}><span><a style={{color: "#000"}} href="/recommendedbooks">RESEARCH PAPERS AND BOOKS</a></span></div>
                               <div style={{border: "2px solid #0476D0",width:300,height:40,textAlign: "center",fontWeight:"700",fontSize: 20,marginTop:10,cursor: "pointer"}}><span><a style={{color: "#000"}} href="/buyresearchaudience">BUY TARGETED AUDIENCE</a></span></div> */}
                               </div>
             )}

             </div>
             </div>

             <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{justifyContent: "center",margin:  "auto"}}
      >
        <AppBar sx={{ position: 'relative' }} style={{backgroundColor: "#45CBB2",marginTop:0}}>
        <Header/>

        </AppBar>
        {/* <List >
          <div style={{textAlign: "center"}}><span><h2 style={{fontWeight: "600"}}>START NEW SURVEY</h2></span></div>
       <div className="ListHomeModal">
       <Box sx={{ minWidth: 120 }} >
      <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">Which academic field are you interested in ?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={academicField}
          label="Which academic field are you interested in ?"
          onChange={(e) => {
            setAcademicField(e.target.value)
        }}
          className="ListHomeModal1"
        >
          <MenuItem  value="Architecture">Architecture</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Medicine">Medicine</MenuItem>
          <MenuItem value="Psychology">Psychology</MenuItem>
        </Select>
      </FormControl>
      
    </Box>

       </div>

       <div className="ListHomeModal">
       {academicField !== '' &&(
  <>
      <Box sx={{ minWidth: 120 }} style={{marginTop:50}}>
      <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">Which topic would you like to conduct your research on ?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={academicTopic}
          label="Which topic would you like to conduct your research on ?"
          onChange={(e) => {
            setAcademicTopic(e.target.value)
        }}
          className="ListHomeModal1"
        >
          <MenuItem  value="Community Feedback">Community Feedback</MenuItem>
          <MenuItem value="Customer Feedback">Customer Feedback</MenuItem>
          <MenuItem value="Academic Research">Academic Research</MenuItem>
          <MenuItem value="Course Evaluation">Course Evaluation</MenuItem>
          <MenuItem value="Student Feedback">Student Feedback</MenuItem>
          <MenuItem value="Student Performance">Student Performance</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      
    </Box>
  </>
)}
       </div>
       {academicTopic === 'Other'  &&(
        <div className="ListHomeModal">
  <>
      <Box sx={{ minWidth: 120 }} style={{marginTop:10}}>

      <div>
      <TextField
          id="filled-textarea"
          label="If other, kindly indicate which other topic you are interested in"
          placeholder="Placeholder"
          multiline
          value={academicTopicOther}
          variant="filled"
          onChange={(e) => {
            setAcademicTopicOther(e.target.value)
        }}
  style={{width: "100%"}}
        />
      </div>      
    </Box>
  </>
       </div>
)}

       { (academicTopic !== '' && academicTopic !== 'Other') || (academicTopicOther !== '') ?(
        <div className="ListHomeModal">
  <>
      <Box sx={{ minWidth: 120 }} style={{marginTop:50}}>

      <div>
      <TextField
          id="filled-textarea"
          label="Kindly give your question here..."
          placeholder="Placeholder"
          multiline
          variant="filled"
          onChange={(e) => {
            setQuestions(e.target.value)
        }}
  style={{width: "100%"}}
        />
      </div>      
    </Box>
    {questions !== '' ? (
          <Box sx={{ minWidth: 120 }} style={{marginTop:50}}>

          <div>
          <TextField
              id="filled-textarea"
              label="Kindly give a name to your survey"
              placeholder="Placeholder"
              multiline
              variant="filled"
              onChange={(e) => {
                setSurveyName(e.target.value)
            }}
      style={{width: "100%"}} />
          </div>      
        </Box>
    ):(
      <h1></h1> 
    )}
  </>
       </div>
): (academicTopic !== '' && academicTopic !== 'Other') ?(
  <div className="ListHomeModal">
  <>
      <Box sx={{ minWidth: 120 }} style={{marginTop:50}}>

      <div>
      <TextField
          id="filled-textarea"
          label="Kindly give a name to your survey"
          placeholder="Placeholder"
          multiline
          variant="filled"
          onChange={(e) => {
            setSurveyName(e.target.value)
        }}
  style={{width: "100%"}} />
      </div>      
    </Box>
  </>
       </div> 
):(
  <h1></h1>
)}

       {surveyName !== ''  &&(
   <div className="ListHomeModal">
   <>
       <Box sx={{ minWidth: 120 }} style={{marginTop:50}}>
  
       <div>
       <button onClick={addSurvey} className="surveySubmitBtn">Submit Survey</button>
       </div>      
     </Box>
   </>
        </div> 
       )}
        </List> */}




        <Survey handleClose1={handleClose}/>
      </Dialog>
      </div>



      
    </div>




    
        </body>
    )
}

export default Home

