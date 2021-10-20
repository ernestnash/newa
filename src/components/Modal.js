import React from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const backdrop={
    visible: { opacity: 1},
    hidden: { opacity: 0}
}

const modal = {
    hidden:{
        y: "-100vh",
        opacity:0
    },
    visible:{
        y: "200px",
        opacity:1,
        transition:{
        }
    }
}

const Modal = () =>{
    return(
        <AnimatePresence exitBeforeEnter>
             <motion.div className="backdrop"
             variants={backdrop}
             initial="hidden"
             animate="visible"
             exit="hidden"
             >
            
            <motion.div className="modal"
            variants={modal}
             >
    {/* <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box> */}
    Hello
            </motion.div>
             </motion.div>
        </AnimatePresence>
    )
}
export default Modal;