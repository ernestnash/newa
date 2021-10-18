import React,{useState,useEffect} from 'react'
import Header from '../Header'
import "./styles.css"
import img from "../../assets/jedd.jpg"
import { auth, db } from "../firebase";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {  googleProvider,facebookProvider,GithubProvider, TwitterProvider } from '../firebase';
import { useSelector,useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import validator from 'validator'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { Formik } from "formik";


function Registerindividual({history}) {

    const [loading,setLoading] = useState(false)

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      trigger,
    } = useForm();
  
    const onSubmit = (data) => {
      setLoading(true)



      var email= data.email
      var password= data.password
 
      //logic

      db.collection('users').where("email", "==", email).get().then((resultSnapShot) => {

          // resultSnapShot is an array of docs where "email" === "user_mail"
    
          if (resultSnapShot.size == 0) {
              //Proceed
    
              auth
              .createUserWithEmailAndPassword(email, password)
              .then((auth) => {
                  if (auth.user) {
                      auth.user.updateProfile({
                          displayName: "",
                          photoURL: ""
                      }).then((s) => {
                          db.collection('users').doc(auth.user.uid).set({
                            uid: auth.user.uid,
                            username: "",
                            email: auth.user.email,
                            profilePhoto: "https://cdn.pngsumo.com/default-image-png-picture-710222-default-image-png-default-png-265_265.png",
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
                                setLoading(false)
                                  history.push("/")
                              })
                      })
                  }
              })
              .catch((e) => {
                setLoading(false)
                 toast.error(e.message)
              });
    
          } else {
              //Already registered
              setLoading(false)
              toast.error("The email you enterd already in use")
          }
    
      })
    
    };
  
    let {user} = useSelector((state)=> ({...state}));
    let dispatch = useDispatch();

    if(user !== null){
        history.push("/")
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
          username: "",
          email: auth?.currentUser?.email,
          profilePhoto: "https://cdn.pngsumo.com/default-image-png-picture-710222-default-image-png-default-png-265_265.png",
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
            uid: auth?.currentUser?.uid,
            username: "",
            email: auth?.currentUser?.email,
            profilePhoto: "https://cdn.pngsumo.com/default-image-png-picture-710222-default-image-png-default-png-265_265.png",
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
          username: "",
          email: auth?.currentUser?.email,
          profilePhoto: "https://cdn.pngsumo.com/default-image-png-picture-710222-default-image-png-default-png-265_265.png",
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
          username: "",
          email: auth?.currentUser?.email,
          profilePhoto: "https://cdn.pngsumo.com/default-image-png-picture-710222-default-image-png-default-png-265_265.png",
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

    return (
        <div>
        <Header />
    <ToastContainer/>
<div className="main_body">
<div class="parent">
  <div class="child"><div class="center2">
      <div style={{marginBottom:15}}><span style={{fontSize:20,fontWeight:"600"}}>Register with your email address</span></div>

            <div className="form-group">
              {/* <label className="col-form-label">E mail </label> */}
              <input
              placeholder="Enter E mail"
                type="text"
                className={`form-control ${errors.email && "invalid"}`}
                {...register("email", { required: "Email is Required" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }})}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>

            <div className="form-group">
              {/* <label className="col-form-label">Create Password</label> */}
              <input
              
                placeholder="Create Password"
                type="password"
                className={`form-control ${errors.password && "invalid"}`}
                {...register("password", { required: "Password is Required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                  message: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
                },
               })}
               onKeyUp={() => {
                trigger("password");
              }}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>

           
            <div><button onClick={handleSubmit(onSubmit)} style={{backgroundColor: "#45CBB2",width:250,height:40,color: "#fff",fontSize:20,border: "none"}}>
        {loading ? <CircularProgress style={{height:25,width:25,color:"#fff"}}/> : <span>CREATE FREE ACCOUNT</span>}
        </button></div> 

      <div style={{marginTop:15,fontWeight:"600"}}><div class="hr-theme-slash-2"><div class="hr-line"></div><div class="hr-icon"><div class="circle"><span style={{color: "#000"}}>OR</span></div></div><div class="hr-line"></div></div></div>
      <div style={{marginTop:10,fontWeight:"600",fontSize:25}}>Create free account with</div>
      <div className="socialDiv">
      <div onClick={googleLogin} className="socialDiv1"><img src="https://image.similarpng.com/thumbnail/2020/12/Flat-design-Google-logo-design-Vector-PNG.png" style={{height:40,objectFit: "contain"}}/></div>
      <div onClick={facebookLogin} className="socialDiv1"><img src="https://www.pngkit.com/png/detail/22-221036_follow-us-facebook-icon-flat-png.png" style={{height:40,objectFit: "contain"}}/></div>      
      <div onClick={()=> toast.error("Oops!\nThere may be a delay on working with this authentication due to twitter developers regulations")} className="socialDiv1"><img src="https://image.similarpng.com/thumbnail/2020/06/Popular-icon-Twitter-clipart-PNG.png" style={{height:40,objectFit: "contain"}}/></div>        
      </div>
      <div style={{marginTop:15,fontWeight:"500"}}>
          <span style={{fontSize:18,color: "#AEAEAE"}}>
          <p>By clicking ‘Create account’ or signing up, you agree to the <span style={{color:"#45CBB2"}}>Terms of Use</span> and <span style={{color:"#45CBB2"}}>Privacy Notice</span>.You also agree to receive information and offers relevant to our services via email. You can opt-out of these emails in your My Account page anytime.</p>

          </span>
      </div>

</div>
</div>
</div>

</div>
        </div>
    )
}

export default Registerindividual
