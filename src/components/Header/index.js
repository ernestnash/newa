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

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}








const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));









export default function Header() {

  const [bio, setBio] = useState('');
  const [bioPresent, setBioPresent] = useState(false)
  const [username, setUsername] = useState('');
  const [usernamePresent, setUsernamePresent] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [firstNamePresent, setFirstNamePresent] = useState(false)
  const [lastName, setlastName] = useState('');
  const [lastNamePresent, setlastNamePresent] = useState(false)
  const [location, setLocation] = useState('');
  const [locationPresent, setlocationPresent] = useState(false)
  const [placeOfWork, setPlaceOfWork] = useState('');
  const [placeOfWorkPresent, setPlaceOfWorkPresent] = useState(false)
  const [school, setSchool] = useState('');
  const [schoolPresent, setSchoolPresent] = useState(false)
  const [birthday, setBirthday] = useState([]);
  const [birthdayPresent, setBirthdayPresent] = useState(false)
  const [open1, setOpen1] = useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [imageURL, setImageURL] = useState('');
  const [progress, setProgress] = useState(0);

// Table
const [open, setOpen] = React.useState(false);
const [dashboard, setDashboard] = React.useState(false);
const [updateProfile, setUpdateProfile] = React.useState(false);


const handleChange = (e) => {
  setImageURL(e.target.files[0]);
};

const uploadFileWithClick = () => {
  document.getElementsByClassName('inputImage')[0].click();
}



const handleClose1 = () => {
  setOpen1(false);
  setImageURL("");
};

const descriptionElementRef = React.useRef(null);
React.useEffect(() => {
  if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
          descriptionElement.focus();
      }
  }
}, [open]);

useEffect(() => {
  if (imageURL !== '') {
      setOpen1(true)
  }
}, [imageURL])

const handleClickOpen = () => {
  setOpen(true);
};

const handleClickDashboardOpen = () => {
  setDashboard(true);
};

const handleClickUpdateProfiledOpen = () => {
  setUpdateProfile(true);
};

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory()









const handleClose = () => {
  setOpen(false);
};
const handleCloseDashboard = () => {
  setDashboard(false);
};
const handleCloseUpdateProfile = () => {
  setUpdateProfile(false);
};

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  
  let dispatch = useDispatch()


  //Rendering selectively
  let {user} = useSelector((state)=> ({...state}));

// logout
  const logout = () =>{
    firebase.auth().signOut()

    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/signIn")
    window.localStorage.removeItem("getCurrentUserId");

  }


    const [profileUserData, setProfileUserData] = useState();
   var test = profileUserData?.username
   console.log("Uid: ",test)


   const currentUserId= `${auth?.currentUser?.uid}`
   console.log("CurrentUser Uid: ", `${currentUserId}`)

   var currentUser = firebase.auth().currentUser;


   const handleUpload = (event) => {

    document.getElementsByClassName('progress')[0].style.display = 'block';
    event.preventDefault();
    const uploadTask = storage.ref(`profileImages/${currentUserId}`).put(imageURL);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (error) => {
            console.log(error);
            toast.error(error.message)

        },
        () => {
            storage
                .ref("profileImages")
                .child(`${currentUserId}`)
                .getDownloadURL()
                .then(url => {
                    currentUser.updateProfile({
                        profilePhoto: url
                    }).then(function () {
                        db.collection('users').doc(`${currentUserId}`).update({
                            profilePhoto: url
                        }).then(function () {
                            handleClose1();
                            setProgress(0);

                            toast.success("Successfully Updated your profile image.")

                        })
                    })
                })
        }
    )
}
// username
   const addUsername = () => {
     $('.username')[0].style.display = 'none';
     $('.usernameFields')[0].style.display = 'flex';
 }
 
 const collapseUsername = () => {
     $('.username')[0].style.display = 'block';
     $('.usernameFields')[0].style.display = 'none';
 }
 
 const usernameUpdate = () => {
   if (101 - username.length < 0 || username.length === 0) {
       return;
   } else {
    db.collection('users').where("username", "==", username).get().then((resultSnapShot) => {

      if (resultSnapShot.size == 0) {
        //Proceed
        db.collection('users').doc(currentUserId).update({
          username: username
        }).then(
         toast.success("Username been successfully updated")
         )
      }else{
        toast.error(`Username ${username} already in use`)
      }
    })

   }
 }
 
 const usernameSet = (e) => {
     setUsername(e.target.value)
     if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
         $('.saveButton')[0].style.backgroundColor = '#3A3B3C';
         $('.saveButton')[0].style.opacity = 0.4;
     } else {
         $('.saveButton')[0].style.opacity = 1;
         $('.saveButton')[0].style.backgroundColor = '#2D88FF';
     }
 }
 
 useEffect(() => {
   if (usernamePresent === false) {
       console.log()
   } else {
       $('.username')[0].innerText = "Edit";
       $('.usernameText')[0].innerText = username;
   }
 }, [usernamePresent])


// First Name
const addFirstName = () => {
  $('.firstName')[0].style.display = 'none';
  $('.firstNameFields')[0].style.display = 'flex';
}
const collapseFirstName = () => {
  $('.firstName')[0].style.display = 'block';
  $('.firstNameFields')[0].style.display = 'none';
}
const firstNameUpdate = () => {
if (101 - firstName.length < 0 || firstName.length === 0) {
    return;
} else {
    db.collection('users').doc(currentUserId).update({
      firstName: firstName
    }).then(
      toast.success("First name been successfully updated")
    )
}
}
const firstNameSet = (e) => {
  setFirstName(e.target.value)
  if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
      $('.saveButton')[1].style.backgroundColor = '#3A3B3C';
      $('.saveButton')[1].style.opacity = 0.4;
  } else {
      $('.saveButton')[1].style.opacity = 1;
      $('.saveButton')[1].style.backgroundColor = '#2D88FF';
  }
}
useEffect(() => {
if (firstNamePresent === false) {
    console.log()
} else {
    $('.firstName')[0].innerText = "Edit";
    $('.firstNameText')[0].innerText = firstName;
}
}, [firstNamePresent])

// Last Name
const addLastName = () => {
  $('.lastName')[0].style.display = 'none';
  $('.lastNameFields')[0].style.display = 'flex';
}

const collapseLastName = () => {
  $('.lastName')[0].style.display = 'block';
  $('.lastNameFields')[0].style.display = 'none';
}

const lastNameUpdate = () => {
if (101 - lastName.length < 0 || lastName.length === 0) {
    return;
} else {
    db.collection('users').doc(currentUserId).update({
      lastName: lastName
    }).then(
      toast.success("Last name been successfully updated")
    )
}
}

const lastNameSet = (e) => {
  setlastName(e.target.value)
  if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
      $('.saveButton')[2].style.backgroundColor = '#3A3B3C';
      $('.saveButton')[2].style.opacity = 0.4;
  } else {
      $('.saveButton')[2].style.opacity = 1;
      $('.saveButton')[2].style.backgroundColor = '#2D88FF';
  }
}

useEffect(() => {
if (lastNamePresent === false) {
    console.log()
} else {
    $('.lastName')[0].innerText = "Edit";
    $('.lastNameText')[0].innerText = lastName;
}
}, [lastNamePresent])


// Location
const addLocation = () => {
  $('.location')[0].style.display = 'none';
  $('.locationFields')[0].style.display = 'flex';
}

const collapseLocation = () => {
  $('.location')[0].style.display = 'block';
  $('.locationFields')[0].style.display = 'none';
}

const locationUpdate = () => {
if (101 - location.length < 0 || location.length === 0) {
    return;
} else {
    db.collection('users').doc(currentUserId).update({
      location: location
    }).then(
      toast.success("Location been successfully updated")
    )
}
}

const locationSet = (e) => {
  setLocation(e.target.value)
  if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
      $('.saveButton')[3].style.backgroundColor = '#3A3B3C';
      $('.saveButton')[3].style.opacity = 0.4;
  } else {
      $('.saveButton')[3].style.opacity = 1;
      $('.saveButton')[3].style.backgroundColor = '#2D88FF';
  }
}

useEffect(() => {
if (locationPresent === false) {
    console.log()
} else {
    $('.location')[0].innerText = "Edit";
    $('.locationText')[0].innerText = location;
}
}, [locationPresent])


// Place Of Work
const addPlaceOfWork = () => {
  $('.placeOfWork')[0].style.display = 'none';
  $('.placeOfWorkFields')[0].style.display = 'flex';
}

const collapsePlaceOfWork = () => {
  $('.placeOfWork')[0].style.display = 'block';
  $('.placeOfWorkFields')[0].style.display = 'none';
}

const placeOfWorkUpdate = () => {
if (101 - placeOfWork.length < 0 || placeOfWork.length === 0) {
    return;
} else {
    db.collection('users').doc(currentUserId).update({
      placeOfWork: placeOfWork
    }).then(
      toast.success("Work place been successfully updated")
    )
}
}

const placeOfWorkSet = (e) => {
  setPlaceOfWork(e.target.value)
  if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
      $('.saveButton')[4].style.backgroundColor = '#3A3B3C';
      $('.saveButton')[4].style.opacity = 0.4;
  } else {
      $('.saveButton')[4].style.opacity = 1;
      $('.saveButton')[4].style.backgroundColor = '#2D88FF';
  }
}

useEffect(() => {
if (placeOfWorkPresent === false) {
    console.log()
} else {
    $('.placeOfWork')[0].innerText = "Edit";
    $('.placeOfWorkText')[0].innerText = placeOfWork;
}
}, [placeOfWorkPresent])



// School
const addSchool = () => {
  $('.school')[0].style.display = 'none';
  $('.schoolFields')[0].style.display = 'flex';
}

const collapseSchool = () => {
  $('.school')[0].style.display = 'block';
  $('.schoolFields')[0].style.display = 'none';
}

const schoolUpdate = () => {
if (101 - school.length < 0 || school.length === 0) {
    return;
} else {
    db.collection('users').doc(currentUserId).update({
      school: school
    }).then(
      toast.success("School been successfully updated")
    )
}
}

const schoolSet = (e) => {
  setSchool(e.target.value)
  if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
      $('.saveButton')[5].style.backgroundColor = '#3A3B3C';
      $('.saveButton')[5].style.opacity = 0.4;
  } else {
      $('.saveButton')[5].style.opacity = 1;
      $('.saveButton')[5].style.backgroundColor = '#2D88FF';
  }
}

useEffect(() => {
if (schoolPresent === false) {
    console.log()
} else {
    $('.school')[0].innerText = "Edit";
    $('.schoolText')[0].innerText = school;
}
}, [schoolPresent])



// Bio
const addbio = () => {
  $('.bio')[0].style.display = 'none';
  $('.bioFields')[0].style.display = 'flex';
}

const collapsebio = () => {
  $('.bio')[0].style.display = 'block';
  $('.bioFields')[0].style.display = 'none';
}

const bioUpdate = () => {
if (101 - bio.length < 0 || bio.length === 0) {
    return;
} else {
    db.collection('users').doc(currentUserId).update({
      bio: bio
    }).then(
      toast.success("Bio been successfully updated")
    )
}
}

const bioSet = (e) => {
  setBio(e.target.value)
  if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
      $('.saveButton')[6].style.backgroundColor = '#3A3B3C';
      $('.saveButton')[6].style.opacity = 0.4;
  } else {
      $('.saveButton')[6].style.opacity = 1;
      $('.saveButton')[6].style.backgroundColor = '#2D88FF';
  }
}

useEffect(() => {
if (bioPresent === false) {
    console.log()
} else {
    $('.bio')[0].innerText = "Edit";
    $('.bioText')[0].innerText = bio;
}
}, [bioPresent])




// Birthday
const addBirthday = () => {
  $('.birthday')[0].style.display = 'none';
  $('.birthdayFields')[0].style.display = 'flex';
}

const collapseBirthday = () => {
  $('.birthday')[0].style.display = 'block';
  $('.birthdayFields')[0].style.display = 'none';
}

const birthdayUpdate = () => {
if (101 - birthday.length < 0 || birthday.length === 0) {
    return;
} else {
    db.collection('users').doc(currentUserId).update({
      dateOfBirth: birthday
    }).then(
      toast.success("Birth date been successfully updated")
    )
}
}

const birthdaySet = (e) => {
  setBirthday([...birthday, e.target.value])
  if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
      $('.saveButton')[7].style.backgroundColor = '#3A3B3C';
      $('.saveButton')[7].style.opacity = 0.4;
  } else {
      $('.saveButton')[7].style.opacity = 1;
      $('.saveButton')[7].style.backgroundColor = '#2D88FF';
  }
}

useEffect(() => {
if (birthdayPresent === false) {
    console.log()
} else {
    $('.birthday')[0].innerText = "Edit";
    $('.birthdayText')[0].innerText = birthday;
}
}, [birthdayPresent])

   useEffect(() => {
    db.collection('users').doc(`${currentUserId}`).onSnapshot((doc) => {
        setProfileUserData(doc.data());
    });
}, [])


const deleteUser1 = (e) => {
  e.preventDefault()

  toast.success("Sorry!\nWe're Still working on this...")
}

 








  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>{user.email.split('@')[0]}</MenuItem> */}
      <div style={{flexDirection: "column"}}>
      <MenuItem onClick={handleClickOpen}><div>My Profile</div></MenuItem>
      <MenuItem onClick={logout}><div>Logout</div></MenuItem>
      </div>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <ImportContactsIcon />
          </Badge>
        </IconButton>
        <span>RESEARCH</span>
      </MenuItem>



      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <RequestQuoteIcon />
          </Badge>
        </IconButton>
        <span>REQUEST INFO</span>
      </MenuItem>
   {!user &&(
      <MenuItem>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={0} color="error">
          <VpnKeyIcon />
        </Badge>
      </IconButton>
      <a href="/signIn">
      <span style={{color: "#000"}}>SIGN IN</span>
      </a>
    </MenuItem>
   )}

      {user &&(
        <>
              {/* <MenuItem
           onClick={handleClickDashboardOpen}
              >
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={0} color="error">
                  <PriceChangeIcon />
                </Badge>
              </IconButton>
              <span>DASHBOARD</span>
            </MenuItem> */}
              <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
  <Avatar src={profileUserData?.profilePhoto} style={{ width: 56, height: 56 }} /> 

              </IconButton>

              {auth?.currentUser?.displayName ? (
  <span>{auth?.currentUser?.displayName}</span>
            ):(
  <span>{user.email.split('@')[0]}</span>
            )}
              
            </MenuItem>
            </>
      )}

    </Menu>
  );



  return (
    <>
    <Box sx={{ flexGrow: 1 }} >
      <AppBar style={{position: "fixed",zIndex:1,top:0,backgroundColor:"#000"}} position="static">
        <Toolbar>
            <a href={`/`}>
        <img src={img} style={{height:60,width:120,marginLeft:-15, objectFit:"cover"}}/>

        </a>

{user &&(
  <>
            {/* <Search style={{marginLeft:10}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
  </>
)}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <span style={{fontSize:20}}>RESEARCH</span>
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <span style={{fontSize:20}}>PLANS AND PRICING</span>
            </IconButton>


            {!user &&(
            <IconButton
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <a href="/signIn">
              <span style={{fontSize:20,color:"#fff"}}>SIGN IN</span>
              </a>
              
            </IconButton>
            )}
            {user &&(
              <>
 
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >

  <Avatar src={profileUserData?.profilePhoto} style={{ width: 56, height: 56 }} /> 


              
            </IconButton>
            </>
            )}

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <div style={{textAlign: "center"}}>
        <span>MY Profile</span>
        </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>

    <div class="row">
        <div class="col-md-4">
        <div class="img-container-block">
  <img src={profileUserData?.profilePhoto} alt="Profile image" className="profileAvatar "/>
</div>

            <ul title="Ratings" class="list-inline ratings text-center">
                <li><a href="#"><span class="glyphicon glyphicon-star">
                  {profileUserData?.bio === '' ? (
                    <div style={{color: "#979797"}}>Bio</div>
                  ):(
                    <div style={{color: "#979797"}}>
                    {profileUserData?.bio}
                    </div>
                  )}
                  </span></a></li>
                <li><a href="#"><span class="glyphicon glyphicon-star">
                {profileUserData?.location === '' ? (
                    <div style={{color: "#696969",marginTop: 10}}>Location</div>
                  ):(
                    <div style={{color: "#696969",marginTop: 10}}>
                    {profileUserData?.location}
                    </div>
                  )}
                  </span></a></li>
                <li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
                <li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
                <li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li>
            </ul>
        </div>
        <div class="col-md-6">
            <strong>Information</strong><br/>
            <div class="table-responsive">
            <table class="table table-user-information">
                <tbody>

                    <tr>    
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-user  text-primary"></span>    
                               First Name                                                
                            </strong>
                        </td>
                        <td  class="text-primary">
                            {/* Bootdey      */}
                            <span style={{color: "#525252"}}>{profileUserData?.firstName}</span>
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-cloud text-primary"></span>  
                                Last Name                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {/* Bootstrap   */}
                            <span style={{color: "#525252"}}>{profileUserData?.lastName}</span>
                        </td>
                    </tr>

                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-bookmark text-primary"></span> 
                                Username                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                        <span style={{color: "#525252"}}>{profileUserData?.username}</span> 
                        </td>
                    </tr>


                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-eye-open text-primary"></span> 
                                Place of Work                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {/* Admin */}
                            <span style={{color: "#525252"}}>{profileUserData?.placeOfWork}</span>
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-envelope text-primary"></span> 
                                Email                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                        
                        <span style={{color: "#525252"}}>{profileUserData?.email}</span>
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-calendar text-primary"></span>
                                School                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                            {/*  */}
                            <span style={{color: "#525252"}}>{profileUserData?.school}</span>
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span class="glyphicon glyphicon-calendar text-primary"></span>
                                Date Of Birth                                                
                            </strong>
                        </td>
                        <td class="text-primary">
                        <span style={{color: "#525252"}}>{profileUserData?.dateOfBirth?.slice(-3)}</span>
                        </td>
                    </tr>                                    
                </tbody>
            </table>
            </div>
        </div>
    </div>
{/* </div>
</div>   */}

          </Typography>


          <DialogActions style={{flexDirection: "column"}}>
        <Typography gutterBottom style={{marginTop:20}}>
          <i style={{fontWeight:"600"}}>" Survey and test a prospective action before undertaking it. Before you proceed, step back and look at the big picture, lest you act rashly on raw impulse."</i>
          </Typography>
          <Button onClick={handleClickUpdateProfiledOpen} style={{fontWeight:"600",marginTop:0,border: "1px solid #000"}} >
            Update Profile
          </Button>
        </DialogActions>
        </DialogContent>
 
      </BootstrapDialog>



      <BootstrapDialog
        onClose={handleCloseDashboard}
        aria-labelledby="customized-dialog-title"
        open={dashboard}
        sx={{width: "100%"}}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDashboard}>
          <div style={{textAlign: "center"}}>
        <span>MY SURVEYS</span>
        </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom style={{marginTop:-50}}>
 


       <Charts   />
       <Mysurveys uid={currentUserId}/>

          </Typography>


          <DialogActions style={{flexDirection: "column"}}>
        <Typography gutterBottom style={{marginTop:20}}>
          <i style={{fontWeight:"600"}}>" Survey and test a prospective action before undertaking it. Before you proceed, step back and look at the big picture, lest you act rashly on raw impulse."</i>
          </Typography>

        </DialogActions>
        </DialogContent>
 
      </BootstrapDialog>




      {/* Update Profile */}

          <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={updateProfile}
      >
            <ToastContainer/>

        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseUpdateProfile}>
          <div style={{textAlign: "center"}}>
        <span>MY Profile Update</span>
        </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>




<div class="wrapper bg-white mt-sm-5">
    <h4 class="pb-4 border-bottom">Account settings</h4>
    <div class="d-flex align-items-start py-3 border-bottom"> 
    <Dialog
                open={open1}
                onClose={handleClose1}
                scroll={scroll}
                className="dialog2"
            >
                <div class="makeStyles-paper-1">
                    <div class="profileHead2">
                        <p>Are you sure you want to change your profile picture ?</p>
                        <progress value={progress} max="100" style={{ display: 'none' }} className="progress" />
                        <div style={{alignSelf: "center"}} className="buttons">
                            <button onClick={handleUpload}>Yes</button>
                            <button onClick={handleClose1}>No</button>
                        </div>
                    </div>
                </div>
            </Dialog>
                    <img onClick={uploadFileWithClick} src={profileUserData?.profilePhoto} className="profileAvatar " />
                    <input style={{display: "none"}} onChange={handleChange} type="file" accept="image/*" className='inputImage' />

                    <div class="pl-sm-4 pl-2" id="img-section"> <b>Profile Photo</b>
            <p></p> <button onClick={uploadFileWithClick} class="btn button border"><b>Upload</b></button>
        </div>
    </div>
    <div class="py-2">
            <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3"> <label for="">Username</label> 
            <div style={{display: 'flex',alignItems: "center"}}>
            <div><input type="text"   class="bg-light form-control" onClick={addUsername} value={`${profileUserData?.username}`}/>
            </div>
            <div><EditIcon onClick={addUsername} className="username"/>
            </div>
            </div>
                <div className="usernameFields">
                    <textarea value={username} placeholder="Describe who you are" onChange={usernameSet} className="bioInput" />
                    <p>{`${101 - username.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapseUsername} >Cancel</button>
                        <button onClick={usernameUpdate} className="saveButton">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row py-2">
        <div class="col-md-6 pt-md-0 pt-3"> <label for="">First Name</label> 
            <div style={{display: 'flex',alignItems: "center"}}>
            <div><input type="text"  onClick={addFirstName} class="bg-light form-control" value={`${profileUserData?.firstName}`}/>
            </div>
            <div><EditIcon onClick={addFirstName} className="firstName"/>
            </div>
            </div>

                <div className="firstNameFields">
                    <textarea value={firstName} placeholder="Update your first name" onChange={firstNameSet} className="bioInput" />
                    <p>{`${101 - firstName.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapseFirstName} >Cancel</button>
                        <button onClick={firstNameUpdate} className="saveButton">Save</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 pt-md-0 pt-3"> <label for="">Last Name</label> 
            <div style={{display: 'flex',alignItems: "center"}}>
            <div><input type="text"  class="bg-light form-control" onClick={addLastName} value={`${profileUserData?.lastName}`}/>
            </div>
            <div><EditIcon onClick={addLastName} className="lastName"/>
            </div>
            </div>

                <div className="lastNameFields">
                    <textarea value={lastName} placeholder="Update your last name" onChange={lastNameSet} className="bioInput" />
                    <p>{`${101 - lastName.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapseLastName} >Cancel</button>
                        <button onClick={lastNameUpdate} className="saveButton">Save</button>
                    </div>
                </div>
            </div>        </div>
        <div class="row py-2">
        <div class="col-md-6 pt-md-0 pt-3"> <label for="">Location</label> 
            <div style={{display: 'flex',alignItems: "center"}}>
            <div><input type="text"  class="bg-light form-control" onClick={addLocation} value={`${profileUserData?.location}`}/>
            </div>
            <div><EditIcon onClick={addLocation} className="location"/>
            </div>
            </div>

                <div className="locationFields">
                    <textarea value={location} placeholder="Update your location" onChange={locationSet} className="bioInput" />
                    <p>{`${101 - location.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapseLocation} >Cancel</button>
                        <button onClick={locationUpdate} className="saveButton">Save</button>
                    </div>
                </div>
            </div>           
            
            <div class="col-md-6 pt-md-0 pt-3"> <label for="">Place Of Work</label> 
            <div style={{display: 'flex',alignItems: "center"}}>
            <div><input type="text"  class="bg-light form-control" onClick={addPlaceOfWork} value={`${profileUserData?.placeOfWork}`}/>
            </div>
            <div><EditIcon onClick={addPlaceOfWork} className="placeOfWork"/>
            </div>
            </div>

                <div className="placeOfWorkFields">
                    <textarea value={placeOfWork} placeholder="Update your place of work" onChange={placeOfWorkSet} className="bioInput" />
                    <p>{`${101 - placeOfWork.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapsePlaceOfWork} >Cancel</button>
                        <button onClick={placeOfWorkUpdate} className="saveButton">Save</button>
                    </div>
                </div>
            </div>      
            
              </div>
                <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3"> <label for="">School</label> 
            <div style={{display: 'flex',alignItems: "center"}}>
            <div><input type="text" onClick={addSchool} class="bg-light form-control" value={`${profileUserData?.school}`}/>
            </div>
            <div><EditIcon onClick={addSchool} className="school"/>
            </div>
            </div>

                <div className="schoolFields">
                    <textarea value={school} placeholder="Update your school" onChange={schoolSet} className="bioInput" />
                    <p>{`${101 - school.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapseSchool} >Cancel</button>
                        <button onClick={schoolUpdate} className="saveButton">Save</button>
                    </div>
                </div>
            </div>            <div class="col-md-6 pt-md-0 pt-3"> <label for="">Bio</label> 
            <div style={{display: 'flex',alignItems: "center"}}>
            <div><input type="text"  onClick={addbio}  class="bg-light form-control" value={`${profileUserData?.bio}`}/>
            </div>
            <div><EditIcon onClick={addbio} className="bio"/>
            </div>
            </div>

                <div className="bioFields">
                    <textarea value={bio} placeholder="Updtate your username" onChange={bioSet} className="bioInput" />
                    <p>{`${101 - bio.length} characters remaining`}</p>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapsebio} >Cancel</button>
                        <button onClick={bioUpdate} className="saveButton">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row py-2">
        <div class="col-md-6 pt-md-0 pt-3"> <label for="">Date Of Birth</label> 
            <div style={{display: 'flex',alignItems: "center"}}>
            <div><input type="text"  onClick={addBirthday}  class="bg-light form-control" value={`${profileUserData?.dateOfBirth?.slice(-3)}`}/>
            </div>
            <div><EditIcon onClick={addBirthday} className="birthday"/>
            </div>
            </div>

                <div className="birthdayFields">


                <div className="row">
                      <select className="register__date2" onChange={birthdaySet}>
                            <option value="">Day</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>

                        <select className="register__date3" onChange={birthdaySet}>
                            <option value="">Month</option>
                            <option value="Jan">Jan</option>
                            <option value="Feb">Feb</option>
                            <option value="Mar">Mar</option>
                            <option value="Apr">Apr</option>
                            <option value="May">May</option>
                            <option value="Jun">Jun</option>
                            <option value="Jul">Jul</option>
                            <option value="Aug">Aug</option>
                            <option value="Sep">Sep</option>
                            <option value="Oct">Oct</option>
                            <option value="Nov">Nov</option>
                            <option value="Dec">Dec</option>
                        </select>

                        <select className="register__date3" onChange={birthdaySet}>
                        <option value="">Year</option>
                            <option value="2018">2020</option>
                            <option value="2018">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            <option value="1939">1939</option>
                            <option value="1938">1938</option>
                            <option value="1937">1937</option>
                            <option value="1936">1936</option>
                            <option value="1935">1935</option>
                            <option value="1934">1934</option>
                            <option value="1933">1933</option>
                            <option value="1932">1932</option>
                            <option value="1931">1931</option>
                            <option value="1930">1930</option>
                            <option value="1929">1929</option>
                            <option value="1928">1928</option>
                            <option value="1927">1927</option>
                            <option value="1926">1926</option>
                            <option value="1925">1925</option>
                            <option value="1924">1924</option>
                            <option value="1923">1923</option>
                            <option value="1922">1922</option>
                            <option value="1921">1921</option>
                            <option value="1920">1920</option>
                            <option value="1919">1919</option>
                            <option value="1918">1918</option>
                            <option value="1917">1917</option>
                            <option value="1916">1916</option>
                            <option value="1915">1915</option>
                            <option value="1914">1914</option>
                            <option value="1913">1913</option>
                            <option value="1912">1912</option>
                            <option value="1911">1911</option>
                            <option value="1910">1910</option>
                            <option value="1909">1909</option>
                            <option value="1908">1908</option>
                            <option value="1907">1907</option>
                            <option value="1906">1906</option>
                            <option value="1905">1905</option>
                        </select>
                    </div>
                    <div className="cancelAndSaveButtons">
                        <button onClick={collapseBirthday} >Cancel</button>
                        <button onClick={birthdayUpdate} className="saveButton">Save</button>
                    </div>
                </div>
            </div>        
            </div>
        <div class="py-3 pb-4 border-bottom">  <button onClick={handleCloseUpdateProfile} class="btn border button">Cancel</button> </div>
        <div class="d-sm-flex align-items-center pt-3" id="deactivate">
            <div> <b>Deactivate your account</b>
                <p>Details about your company account and password</p>
            </div>
            <div class="ml-auto"> <button onClick={deleteUser1} class="btn danger">Deactivate</button> </div>
        </div>
    </div>
</div>
          </Typography>


          <DialogActions style={{flexDirection: "column"}}>
        <Typography gutterBottom style={{marginTop:20}}>
          <i style={{fontWeight:"600"}}>" Survey and test a prospective action before undertaking it. Before you proceed, step back and look at the big picture, lest you act rashly on raw impulse."</i>
          </Typography>

        </DialogActions>
        </DialogContent>
 
      </BootstrapDialog>
    </>
  );
}
