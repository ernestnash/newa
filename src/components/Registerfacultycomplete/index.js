import React, { useState,useEffect } from "react";
import validator from 'validator'
import Header from '../Header'
import "./styles.css"
import img from "../../assets/jedd.jpg"
import { auth, db } from "../firebase";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useSelector,useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Registerfacultycomplete({history}) {
//props.history

    
    const [password, setPassword] = useState('')
    let {user} = useSelector((state)=> ({...state}));
    let dispatch = useDispatch();
    const [loading,setLoading] = useState(false)

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      trigger,
    } = useForm();
  
if(user !== null){
    history.push("/")
  }
    const [email, setStudenEmail] = useState('')

    useEffect(()=>{
        setStudenEmail(window.localStorage.getItem("facultyEmailForRegistration"));
    }, [])

    const onSubmit = async(data)=>{
       setLoading(true)
       var password = data.password
            try{
                const result = await auth.signInWithEmailLink(
                    email, 
                    window.location.href
                    );
                
                if(result.user.emailVerified){
                    //remove user email from localstaorage
                    //get user id token
                    window.localStorage.removeItem("facultyEmailForRegistration");
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
                        type:"facultyEmail",
                        timestamp: Date.now()
                    })   
                    //redirect
                     setLoading(false)
                    history.push('/')
                }
                
                }catch(error){
                  setLoading(false)
                //
                toast.error(error.message)
            }
        





    }



    
   
    return (
        <div>
        <Header />
        <ToastContainer/>
<div className="main_body">
<div class="parent">
  <div class="child"><div class="center2">

      <div style={{marginBottom:15}}><span style={{fontSize:20,fontWeight:"600"}}>Complete registration as a faculty</span></div>
      <div></div> 
      <div className="form-group">
              {/* <label className="col-form-label">E mail </label> */}
              <input
              placeholder="Enter E mail"
                type="text"
                className={`form-control ${errors.email && "invalid"}`}
                value={email}              
              />

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
        {loading ? <CircularProgress style={{height:25,width:25,color:"#fff"}}/> : <span>COMPLETE REGISTRATION</span>}
        </button></div> 
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

export default Registerfacultycomplete
