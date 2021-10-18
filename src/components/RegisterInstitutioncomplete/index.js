import React, { useState,useEffect } from "react";
import validator from 'validator'
import Header from '../Header'
import "./styles.css"
import img from "../../assets/jedd.jpg"
import { auth, db } from "../firebase";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useSelector,useDispatch } from 'react-redux';

function RegisterInstitutioncomplete({history}) {
//props.history

    
    const [email, setStudenEmail] = useState('')
    const [password, setPassword] = useState('')
    let {user} = useSelector((state)=> ({...state}));
    let dispatch = useDispatch();

    if(user !== null){
        history.push("/")
      }
    useEffect(()=>{
       setStudenEmail(window.localStorage.getItem("institutionEmailForRegistration"));
    }, [])

    const register = async(event)=>{
        event.preventDefault();
        let errors = {};

        //validation
        if(!email || !password){
            toast.error("Email and Password is required!")
        }else if(password.length < 6){
            toast.error("Password should have at least 6 characters.")
        }else{

            try{
                const result = await auth.signInWithEmailLink(
                    email, 
                    window.location.href
                    );
                
                if(result.user.emailVerified){
                    //remove user email from localstaorage
                    //get user id token
                    window.localStorage.removeItem("institutionEmailForRegistration");
                    let user = auth.currentUser
                    await user.updatePassword(password);
                    const idTokenResult = await user.getIdTokenResult();

                    db.collection('users').doc(user.uid).set({
                        uid: user.uid,
                        username: "",
                        email: user.email,
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
                    //redirect
                    history.push('/')
                }
                
                }catch(error){
                //
                toast.error(error.message)
            }
        }




 


    }
    return (
        <div>
        <Header />
        <ToastContainer/>
<div className="main_body">
<div class="parent">
  <div class="child"><div class="center2">

      <div style={{marginBottom:15}}><span style={{fontSize:20,fontWeight:"600"}}>Complete registration as an institution</span></div>
      <div></div> 
      <div style={{marginBottom:15}}><input  style={{width: 250,height:35,border:"2px solid #45CBB2",textAlign: "center"}} value={email} type="email"
            onChange={(e) => {
                setStudenEmail(e.target.value)
            }}
             placeholder="Institution E mail"/></div>
      <div style={{marginBottom:15}}><input  style={{width: 250,height:35,border:"2px solid #45CBB2",textAlign: "center"}}  type="password"
            onChange={(e) => {
                setPassword(e.target.value)
            }}
             placeholder="Create Password"/></div>
      <div><button onClick={register} style={{backgroundColor: "#45CBB2",width:250,height:40,color: "#fff",fontSize:20,border: "none"}}>COMPLETE REGISTRATION</button></div>
      <div style={{marginTop:15,fontWeight:"600"}}><div class="hr-theme-slash-2"><div class="hr-line"></div><div class="hr-icon"><div class="circle"><span style={{color: "#000"}}>OR</span></div></div><div class="hr-line"></div></div></div>

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

export default RegisterInstitutioncomplete
