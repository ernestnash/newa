import React, { useState,useEffect } from 'react'
import "./styles.css"
import Header from '../Header'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router';
import { auth,db, googleProvider,facebookProvider,GithubProvider, TwitterProvider } from '../firebase';
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';


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

function Login() {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [email1, setEmail1] = useState("")
    const [loadind,setLoadind] = useState(false)
    const [rem,setRem] = useState("")
    let {user} = useSelector((state)=> ({...state}));
 
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpen1 = () => {
      setOpen1(true);
    };
    const handleClose1 = () => {
      setOpen1(false);
    };

    const [email, setEmail] = useState('');
    const history = useHistory('');
    const [password, setPassword] = useState('');
    let dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    if(user !== null){
      history.push("/")
    }

    const login = async(e)=> {
      e.preventDefault();
      setLoading(true)
        try{
          const result = await auth.signInWithEmailAndPassword(email, password)
          const {user} = result;
          const idTokenResult = await user.getIdTokenResult();
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: user.email,
              token: idTokenResult.token,
            }
    
          });
          history.push('/')
         }catch(error){
           toast.error(error.message)
           setLoading(false)
    
         }
   

    }


    const googleLogin = async () =>{
      auth
      .signInWithPopup(googleProvider)
      .then( async(result)=>{
       const {user} = result;
       const idTokenResult = await user.getIdTokenResult();
       dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },

      })
      }).then((s) => {
        db.collection('users').doc(auth?.currentUser?.uid).set({
          uid: auth?.currentUser?.uid,
          username: auth?.currentUser?.displayName,
          email: auth?.currentUser?.email,
          profilePhoto: auth?.currentUser?.photoURL,
          firstName: "",
          lastName: "",
          placeOfWork:"",
          school: "",
          dateOfBirth:"",
          read: true,
          location:"",
          bio:"",
          timestamp: Date.now()
        })
            .then((r) => {
                history.push("/")
            })
            window.localStorage.setItem('getCurrentUserId', auth?.currentUser?.uid)

    })
      .catch((err) => {
        toast.error(err.message)
      })
    }


    const twitterLogin = async () =>{
      auth
      .signInWithPopup(TwitterProvider)
      .then( async(result)=>{
       const {user} = result;
       const idTokenResult = await user.getIdTokenResult();
       dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },

      })
      }).then((s) => {
        db.collection('users').doc(auth?.currentUser?.uid).set({
            uid: auth?.currentUser?.uid,
            username: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
            profilePhoto: auth?.currentUser?.photoURL,
            firstName: "",
            lastName: "",
            placeOfWork:"",
            school: "",
            dateOfBirth:"",
            read: true,
            location:"",
            bio:"",
            timestamp: Date.now()
        })
            .then((r) => {
                history.push("/")
            })
    })
      .catch((err) => {
        toast.error(err.message)
      })
    }

    const facebookLogin = async () =>{
      auth
      .signInWithPopup(facebookProvider)
      .then( async(result)=>{
       const {user} = result;
       const idTokenResult = await user.getIdTokenResult();
       dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },

      })
      }).then((s) => {
        db.collection('users').doc(auth?.currentUser?.uid).set({
          uid: auth?.currentUser?.uid,
          username: auth?.currentUser?.displayName,
          email: auth?.currentUser?.email,
          profilePhoto: auth?.currentUser?.photoURL,
          firstName: "",
          lastName: "",
          placeOfWork:"",
          school: "",
          dateOfBirth:"",
          read: true,
          location:"",
          bio:"",
          timestamp: Date.now()
        })
            .then((r) => {
                history.push("/")
            })
    })
      .catch((err) => {
        toast.error(err.message)
      })
    }


    const githubLogin = async () =>{
      auth
      .signInWithPopup(GithubProvider)
      .then( async(result)=>{
       const {user} = result;
       const idTokenResult = await user.getIdTokenResult();
       dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },

      })
      }).then((s) => {
        db.collection('users').doc(auth?.currentUser?.uid).set({
          uid: auth?.currentUser?.uid,
          username: auth?.currentUser?.displayName,
          email: auth?.currentUser?.email,
          profilePhoto: auth?.currentUser?.photoURL,
          firstName: "",
          lastName: "",
          placeOfWork:"",
          school: "",
          dateOfBirth:"",
          read: true,
          location:"",
          bio:"",
          timestamp: Date.now()
        })
            .then((r) => {
                history.push("/")
            })
    })
      .catch((err) => {
        toast.error(err.message)
      })
    }

    const resetPasword = async(e) =>{
      e.preventDefault();
      setLoading(true)

      const config ={
        url: 'https://simple-academic-survey.web.app/signIn',
        handleCodeInApp: true
    };

      await auth
      .sendPasswordResetEmail(email1,config)
      .then(() => {
       setEmail1('')
       setLoading(false)
       toast.success("Check your email for password reset")
      })
      .catch((error)=>{
        setLoading(false)
       toast.error(error.message)
      })
    }
    return (
      <body>
        <>
    <Header/>
    <ToastContainer/>

<div className="loginbody">
<div  class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
				<div class="d-flex justify-content-end social_icon">
					<span onClick={facebookLogin}><i class="fab fa-facebook-square"></i></span>
					<span onClick={googleLogin}><i class="fab fa-google"></i></span>
					<span onClick={()=> toast.error("Oops!\nThere may be a delay on working with this authentication due to twitter developers regulations")}><i class="fab fa-twitter-square"></i></span>
                    {/* <span onClick={githubLogin}><i class="fab fa-github"></i></span> */}
				</div>
			</div>
			<div class="card-body">
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="text" class="form-control"
            onChange={(e) => {
              setEmail(e.target.value)
          }}
            placeholder="Enter email"/>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" class="form-control" 
            onChange={(e) => {
              setPassword(e.target.value)
          }}
            placeholder="password"/>
					</div>
					<div class="row align-items-center remember">
						<input type="checkbox" onChange={(e) => {
              setRem(e.target.value)
          }}/>Remember Me   
					</div>
					<div class="form-group">
						<button  onClick={login}  class="btn float-right login_btn">{loading ? <CircularProgress style={{height:25,width:25,color:"blue"}}/> : <span>Login</span>}</button>
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?
                    <a href="#" style={{color: "#7DF9FF"}} onClick={handleClickOpen}>Sign Up</a>
    				</div>
				<div class="d-flex justify-content-center">
					<a href="#" style={{color: "#7DF9FF"}} onClick={handleClickOpen1}>Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
<BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        
      >
        <BootstrapDialogTitle  id="customized-dialog-title" style={{backgroundColor: "#000",color:"#fff",borderBottom:"1px solid #fff"}} onClose={handleClose} >
          Pre-SignUp Modal
        </BootstrapDialogTitle>
        <DialogContent dividers class="anim">
          <Typography gutterBottom style={{backgroundColor: "#000"}}>

        <div className="btnsView" style={{display: "flex",flexWrap: "wrap"}}>
            <a style={{fontSize:18}} href="/registerInstitution">
        
                <span></span>
        
                <span></span>
        
                <span></span>
        
                <span></span>
        
                Register as institution
        
            </a>
            <a href="/registerstudent">
        
        <span></span>

        <span></span>

        <span></span>

        <span></span>

        Register as student

    </a>
    <a href="/registerindividual">
        
        <span></span>

        <span></span>

        <span></span>

        <span></span>

        Register as individual

    </a>
    <a href="#">
        
        <span></span>

        <span></span>

        <span></span>

        <span></span>
        Register as faculty

    </a>
    </div>
        
          </Typography>

        </DialogContent>

      </BootstrapDialog>




      <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
        PASSWORD RESET FORM
        </BootstrapDialogTitle>
        <DialogContent dividers>



          <Typography gutterBottom style={{marginTop:20}}>
        <TextField
          id="outlined-textarea"
          label="Kindly add the email address to reset a new password..."
          placeholder="Placeholder"
          value={email1}
          style={{width: "100%"}}
          onChange={(e) => {
            setEmail1(e.target.value)
        }}
          multiline
        />
          </Typography>
          <Typography gutterBottom style={{marginTop:20}}>
          <i style={{fontWeight:"600"}}>" Survey and test a prospective action before undertaking it. Before you proceed, step back and look at the big picture, lest you act rashly on raw impulse."</i>
          </Typography>
        </DialogContent>
        <DialogActions>
        <button onClick={resetPasword}  disabled={!email1} style={{backgroundColor: "#088FFA",color:"#fff",fontWeight:"600"}}  class="btn float-right login_btn">Submit </button>

        </DialogActions>
      </BootstrapDialog>
      </div>
</>

</body>
    )
}

export default Login
