import React from 'react'
import Header from '../Header'
import "./styles.css"
import { useSelector,useDispatch } from 'react-redux';



function Buyresearchaudience({history}) {
    let {user} = useSelector((state)=> ({...state}));

  
 

    return (
        <body>
            <Header />
            <div className="buyResearchAudience">
            <div style={{textAlign: "center",fontSize:30,fontWeight:"600",marginBottom:50}}><span>BUY TARGETED AUDIENCE</span></div>
            
              <div style={{display: "flex",flexWrap: "wrap"}}>
                  <div style={{marginLeft:50,display:"flex",alignItems:"center",objectFit:"contain"}}>
                      <div style={{marginRight:35}}><img style={{height:35,width:30}} src="https://www.pngall.com/wp-content/uploads/5/Google-Maps-Location-Mark.png" alt=""/></div>
                      <div><span style={{marginRight:20}}>LOCATION: </span><span><input type="text"/></span></div>
                  </div>
                  <div style={{marginLeft:50,display:"flex",alignItems:"center",objectFit:"contain"}}>
                      <div style={{marginRight:15}}><img style={{height:35,width:50}} src="https://w7.pngwing.com/pngs/271/883/png-transparent-male-and-female-signage-female-gender-symbol-mentoring-s-blue-text-logo.png" alt=""/></div>
                      <div><span style={{marginRight:15}}>GENDER: </span><span><input type="text"/></span></div>
                  </div>
              </div>
            
              <div style={{display: "flex",flexWrap: "wrap",marginTop:20}}>
                  <div style={{marginLeft:50,display:"flex",alignItems:"center",objectFit:"contain"}}>
                      <div style={{marginRight:35}}><img style={{height:35,width:30}} src="https://www.pngall.com/wp-content/uploads/5/Google-Maps-Location-Mark.png" alt=""/></div>
                      <div><span style={{marginRight:20}}>LOCATION: </span><span><input type="text"/></span></div>
                  </div>
                  <div style={{marginLeft:50,display:"flex",alignItems:"center",objectFit:"contain"}}>
                      <div style={{marginRight:15}}><img style={{height:35,width:50}} src="https://w7.pngwing.com/pngs/271/883/png-transparent-male-and-female-signage-female-gender-symbol-mentoring-s-blue-text-logo.png" alt=""/></div>
                      <div><span style={{marginRight:15}}>GENDER: </span><span><input type="text"/></span></div>
                  </div>
              </div>    


            </div>
        </body>
    )
}

export default Buyresearchaudience
