import React,{useState, useEffect} from 'react'
import "./styles.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector,useDispatch } from 'react-redux';
import Posts from './Posts';
import {auth,db} from './../firebase'
import SearchBar from "material-ui-search-bar";
import Header from '../Header';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
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
import PostAddIcon from '@mui/icons-material/PostAdd';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';

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
          <CloseIcon style={{color:"#45CBB2"}}/>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Recommendedbooks({history}) {
  let {user} = useSelector((state)=> ({...state}));
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [academicField, setAcademicField] = useState("")
  const [academicFieldTopic, setAcademicFieldTopic] = useState("")
  const [academicBook, setAcademicBook] = useState("")
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(true);
  const [posts2, setPosts2] = useState([]);
  const [input1, setInput1] = useState("");
  const [posts1, setPosts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    db.collection('recommended').onSnapshot((snapshot) => {
      setPosts2(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts2 !== undefined) {
      const finalPosts = posts2.filter(res => {
        return res.formTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      })

      setFilteredPosts(finalPosts)
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
  }

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleToggle = () => {
    setOpen2(true);
  };


  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleClose1 = () => {
    setOpen1(false);
  };

  const add = (e) =>{
    e.preventDefault()
    setLoading(true)

    if(!academicField){
      setLoading(false)
      toast.error("Academic Field is required!")
    }else if(!academicFieldTopic){
      setLoading(false)
      toast.error("Academic Field Topic is required!")
    }else if(!academicBook){
      setLoading(false)
      toast.error("Academic Paper or Book is required!")
    }else{
      db.collection('recommeded').add({
        //
      timestamp:  Date.now(),

      academicField,
      academicFieldTopic,
      academicBook,     
    }).then(ref =>{
      setLoading(false)
      toast.success("successfully added source")
      setAcademicField("")
      setAcademicFieldTopic("")
      setAcademicBook("")
      setOpen(false)
    })
    }

  }

  if(!user){
      history.push("/signIn")
    }

    useEffect(() => {
      db.collection('recommeded').orderBy("timestamp", "desc").onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);
  const [open, setOpen] = React.useState(false);


  if(!user){
      history.push("/signIn")
    }

  const handleClickOpen = () => {
    setOpen(true);
  };



  const actions = [
    { icon: <PostAddIcon style={{color:"#45CBB2"}} onClick={handleClickOpen}/>, name: 'Recommend a paper/book' },
    { icon: <QueryBuilderIcon style={{color:"#45CBB2"}} onClick={()=> toast.error("Oops!, sorry we're still working on this\nBear with us kindly and thank you.")}/>, name: 'Querry/Help' },
    // { icon: <PrintIcon />, name: 'Print' },
    // { icon: <ShareIcon />, name: 'Share' },
  ];

    return (
      <body>
        <ToastContainer />

        <Header />
      <div>

          
      <div className="RecommendedBody">
<div style={{textAlign: "center",fontSize:30,fontWeight:"600"}}><span>RESEARCH PAPERS AND BOOKS</span></div>
<div style={{marginBottom:5}} class="search-box">
    <button class="btn-search"><i class="fas fa-search"></i></button>
    <input type="text"  onChange={updateSearchResults} class="input-search" placeholder="Search available sources..."/>
  </div>
<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
<Table aria-label="collapsible table"
stickyHeader aria-label="sticky table">
<TableHead 

>
<TableRow >
  <TableCell sx={{borderBottom: "2px solid #45CBB2"}}/>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #45CBB2",color:"#45CBB2"}}>ACADEMIC FIELD</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #45CBB2",color:"#45CBB2"}} align="right">TOPIC</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #45CBB2",color:"#45CBB2"}} align="right">PAPER/BOOK TITLE</TableCell>
  <TableCell sx={{backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #45CBB2",color:"#45CBB2"}} align="right">TIME ADDED</TableCell>
  <TableCell sx={{backgroundColor: "",borderBottom: "2px solid #45CBB2"}}/>
</TableRow>
</TableHead>
<TableBody>
{
    posts.map(({ id, post }) => (
        < Posts 
        key={id} 
        postId={id} 
        academicBook={post.academicBook} 
        academicField={post.academicField} 
        academicFieldTopic={post.academicFieldTopic}
        timestamp={post.timestamp}        

 
        />

    ))
}
</TableBody>
</Table>
</TableContainer>
</Paper>





<div >
<Box sx={{  flexGrow: 1 }}>
<SpeedDial
ariaLabel="SpeedDial basic example"
sx={{ position: 'absolute', bottom: 80, right: 16 }}
icon={
  <Fab style={{backgroundColor: "#45CBB2",color: "#fff"}} aria-label="add">
  <SpeedDialIcon />
</Fab>}
>
{actions.map((action) => (
<SpeedDialAction
   style={{backgroundColor: "#45CBB2"}}

  key={action.name}
  icon={action.icon}
  tooltipTitle={action.name}
/>
))}
</SpeedDial>
</Box>
</div>


</div>

{loading ?(
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open2}
        onClick={handleClose2}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        ):(
      <>
      <BootstrapDialog
onClose={handleClose}
aria-labelledby="customized-dialog-title"
open={open}

>
<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
<span style={{color:"#45CBB2"}}>RECOMMEND RESEARCH PAPERS/BOOKS</span> 
</BootstrapDialogTitle>
<DialogContent dividers>
<Typography gutterBottom>

<TextField
id="outlined-textarea"
label="ACADEMIC FIELD"
placeholder="Placeholder"
multiline
style={{width: "100%"}}
onChange={(e) => {setAcademicField(e.target.value)}}
/>
</Typography>
<Typography gutterBottom style={{marginTop:20}}>
<TextField
id="outlined-textarea"
label="TOPIC OF THE ACADEMIC FIELD"
placeholder="Placeholder"
style={{width: "100%"}}
onChange={(e) => {setAcademicFieldTopic(e.target.value)}}
multiline
/>
</Typography>
<Typography gutterBottom style={{marginTop:20}}>
<TextField
id="outlined-textarea"
label="TITLE OF THE PAPER/BOOK"
placeholder="Placeholder"
style={{width: "100%"}}
onChange={(e) => {setAcademicBook(e.target.value)}}
multiline
/>
</Typography>
<Typography gutterBottom style={{marginTop:20}}>
<i style={{fontWeight:"600",color:"#fff"}}>" Survey and test a prospective action before undertaking it. Before you proceed, step back and look at the big picture, lest you act rashly on raw impulse."</i>
</Typography>
</DialogContent>
<DialogActions>
<Button style={{fontWeight:"600",border: "2px solid #45CBB2",color: "#45CBB2"}} autoFocus onClick={add}>
  Add
</Button>
</DialogActions>
</BootstrapDialog>

      </>
        )}
  


  </div>


   
</body>
    )
  // }

   
}

export default Recommendedbooks
