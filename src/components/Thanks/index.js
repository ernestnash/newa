import React,{useEffect,useState} from 'react'
import { Button, Typography } from '@material-ui/core'

import { useParams } from "react-router";
import axios from "axios";
import Modal from "../Modal"
import "./styles.css"


function Test() {
    // var {id} = useParams();
    
    // async function data(){
    //    var request = await axios.get(`http://localhost:9000/data/${id}`)
    //    console.log(request.data)

    // }

    // data()

    return (
        <div className="submit">
             <div className="user_form">
            <div className="user_form_section">
                <div className="user_title_section">
                    <Typography style={{fontSize:"26px",fontFamily: "'Google Sans','Roboto','Arial','sans-serif'"}} >Thank you</Typography>
                    <br></br>
                    <Typography style={{fontSize:"13px",fontWeight:"400"}} >Your response has been recorded.</Typography>
                    <br></br>
<a href="#" style={{fontSize:"13px"}}></a>
                </div>
        </div>
        </div>
        </div>

    )
}

export default Test
