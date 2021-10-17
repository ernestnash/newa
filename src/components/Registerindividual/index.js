import React,{useState,useEffect} from 'react'
import Header from '../Header'
import "./styles.css"
import img from "../../assets/jedd.jpg"
import { auth, db } from "../firebase";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {  googleProvider,facebookProvider,GithubProvider, TwitterProvider } from '../firebase';
import { useSelector,useDispatch } from 'react-redux';


function Registerindividual({history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let {user} = useSelector((state)=> ({...state}));
    let dispatch = useDispatch();

    if(user !== null){
        history.push("/")
      }

    const emailRegex = /\S+@\S+\.\S+/;

    const register = async(event)=>{
        event.preventDefault();
        let errors = {};


        if(!email || !password){
            toast.error("Email and Password is required!")
        }else if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email!');

        }else if(password.length < 6){
            toast.error("Password should have at least 6 characters.")
        }else{
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
                                  profilePhoto: "",
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
                        }
                    })
                    .catch((e) => {
                       toast.error(e.message)
                    });
          
                } else {
                    //Already registered
                    toast.error("The email you enterd already in use")
                }
          
            })
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
      <div style={{marginBottom:15}}><input  style={{width: 250,height:35,border:"2px solid #2E2EFF",textAlign: "center"}} 
      onChange={(e) => {
        setEmail(e.target.value)
    }}
      type="email" placeholder="E mail"/></div>
      <div style={{marginBottom:15}}><input  style={{width: 250,height:35,border:"2px solid #2E2EFF",textAlign: "center"}}
      onChange={(e) => {
        setPassword(e.target.value)
    }}
      type="password" placeholder="Create Password"/></div>
      <div><button onClick={register} style={{backgroundColor: "#2E2EFF",width:250,height:40,color: "#fff",fontSize:20,border: "none"}}>CREATE FREE ACCOUNT</button></div>
      <div style={{marginTop:15,fontWeight:"600"}}><div class="hr-theme-slash-2"><div class="hr-line"></div><div class="hr-icon"><div class="circle"><span style={{color: "#000"}}>OR</span></div></div><div class="hr-line"></div></div></div>
      <div style={{marginTop:10,fontWeight:"600",fontSize:25}}>Create free account with</div>
      <div className="socialDiv">
      <div onClick={googleLogin} className="socialDiv1"><img src="https://image.similarpng.com/thumbnail/2020/12/Flat-design-Google-logo-design-Vector-PNG.png" style={{height:40,objectFit: "contain"}}/></div>
      <div onClick={facebookLogin} className="socialDiv1"><img src="https://www.pngkit.com/png/detail/22-221036_follow-us-facebook-icon-flat-png.png" style={{height:40,objectFit: "contain"}}/></div>      
      {/* <div onClick={githubLogin} className="socialDiv1"><img src="https://iconape.com/wp-content/png_logo_vector/github-square.png" style={{height:40,objectFit: "contain"}}/></div>       */}
      <div onClick={()=> toast.error("Oops!\nThere may be a delay on working with this authentication due to twitter developers regulations")} className="socialDiv1"><img src="https://image.similarpng.com/thumbnail/2020/06/Popular-icon-Twitter-clipart-PNG.png" style={{height:40,objectFit: "contain"}}/></div>        
      </div>
      <div style={{marginTop:15,fontWeight:"500"}}>
          <span style={{fontSize:18,color: "#AEAEAE"}}>
          <p>By clicking ‘Create account’ or signing up, you agree to the <span style={{color:"#0476D0"}}>Terms of Use</span> and <span style={{color:"#0476D0"}}>Privacy Notice</span>.You also agree to receive information and offers relevant to our services via email. You can opt-out of these emails in your My Account page anytime.</p>

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
