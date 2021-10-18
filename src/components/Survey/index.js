import React from 'react';
// import auth from '../services/authService';
import "./styles.css"
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import QuestionsTab from '../Forms/QuestionsTab';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
// import Forms from './Form/Forms';
import { useHistory } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import formService from '../services/formService';
// import { auth } from "../Components/firebase"
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';

import Box from '@material-ui/core/Box';
// import Question_form from './Question_form';
import  { motion } from "framer-motion"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { toast, ToastContainer} from 'react-toastify';





const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
      },
      tab:{
        fontSize:12,
        color:"#5f6368",
        textTransform:"capitalize",
        height:10,
        fontWeight:"600",
        fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
       
      },
      tabs:{
          height:10
          
      },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      
      
      
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          
            <div>{children}</div>
     
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Survey({ handleClose1 }) {
    let history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);


    const [formTitle, setFormTitle] = React.useState("");
    const [formDescription, setFormDescription] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [user, setUser] = React.useState({})
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



    const logout =()=>{
      var logoutConfirmation = window.confirm("Really want to logout?");


    }

    const cancelAddForm = ()=>{
      handleClose();
      setFormTitle("");
      setFormDescription("");
    }
    const AddForm = ()=>{
        handleClose();

      }

    const createForm = ()=>{
      var data = {
        name : formTitle,
        description: formDescription,
        createdBy: user.id
      }

    }
  
    
  
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
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleClickOpen}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
           
              <AddIcon />
          
          </IconButton>
          <span>Add Form </span>
        </MenuItem>

      </Menu>
    );
  

  return (
    <div className={classes.grow}>
    <AppBar position="static" style={{backgroundColor: '#45CBB2',marginTop:75}}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <CloseIcon onClick={handleClose1}/>
        </IconButton>
        

        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
             
          <IconButton aria-label="Create new form" color="inherit" onClick={handleClickOpen}> 
              <AddIcon />
          </IconButton>

        </div>

        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
    {renderMenu}
    <div>
            <motion.div animate={{ rotateZ: 360 }}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Creating  a new empty form, just add form name and description if you want.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Form Name"
                  type="text"
                  fullWidth={false}
                  value={formTitle} 
                  onChange={(e)=>{setFormTitle(e.target.value)}}
                /> 
                <br></br>
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Form description"
                  type="text"
                  fullWidth
                  value={formDescription} 
                  onChange={(e)=>{setFormDescription(e.target.value)}}
                /> 
                <br></br>
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelAddForm} color="primary">
                  Cancel
                </Button>
                <Button disabled={(!formTitle) || (!formDescription)} onClick={AddForm} color="primary">
                  Create
                </Button>
              </DialogActions>
            </Dialog>   
            </motion.div>
            <div style={{marginTop:"10px"}}>



                <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.tabs}
      >
                  {formTitle === ''  &&(
        <Tab onClick={handleClickOpen} label="Start New Survey" className={classes.tab} {...a11yProps(0)} />
        )}
                {formTitle !== '' &&(
        <Tab onClick={handleClickOpen} label="Cancel" className={classes.tab} {...a11yProps(0)} />
        )}

      </Tabs>
      <TabPanel value={value} index={0}>
        {/* <Question_form /> */}
   <QuestionsTab setFormDescription={setFormDescription} setFormTitle={setFormTitle} handleClose1={handleClose1} formTitle={formTitle} formDescription={formDescription} handleClickOpen1={handleClickOpen}/>        
         
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
      <div className="submit" style={{height:"76vh"}}>
        <div className="user_form" >
            <div className="user_form_section">
              
              
          
                    <div className="user_form_questions" style={{display:"flex",flexDirection:"column",marginBottom:"20px"}}>
                      <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",fontSize:"24px"}} >3 Responses</Typography>
                    <div  ><IconButton>
                    <MoreVertIcon className="form_header_icon" />
                </IconButton>
                </div>
                </div>
                <br></br>
                              <div  style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex',fontSize:"12px",justifyContent:"flex-end"}}>
                                        Accepting responses <Switch color="primary" size="small"/>   
                                  </div>
                                </div>
                     
                    </div>
            
      
       
            <div className="user_footer">
                Google Forms
            </div>
            </div>
            
        </div>
        </div>
      </TabPanel> */}
    </Paper>
            </div>
    </div>
  </div>
  );
}

export default Survey;
