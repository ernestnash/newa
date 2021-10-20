import React,{useState, useEffect} from 'react'
import Header from '../Header'
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





function Ongoingsurvey({history}) {
  let {user} = useSelector((state)=> ({...state}));
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [posts1, setPosts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);


  if(!user){
      history.push("/signIn")
    }

    useEffect(() => {
      db.collection('surveys').where("active","==", false).orderBy("timestamp", "desc").onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);




  useEffect(() => {
    db.collection('surveys').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts1 !== undefined) {
      const finalPosts = posts1.filter(res => {
        return res.formTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      })

      setFilteredPosts(finalPosts)
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
  }
    return (
        <body >
            <Header/>
            <div className="OngoingBody">
                <div style={{textAlign: "center",fontSize:30,fontWeight:"600"}}><span>RESEARCH FINDINGS</span></div>
                <div style={{marginBottom:5}} class="search-box">
    <button class="btn-search"><i class="fas fa-search"></i></button>
    <input type="text" onChange={(e) => setInput(e.target.value)} onChange={updateSearchResults} class="input-search" placeholder="Search survey..."/>
  </div>
                <div style={{marginTop:10}}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
      <Table aria-label="collapsible table"
      stickyHeader aria-label="sticky table">
      
        <TableHead 
        >
          <TableRow >
            <TableCell sx={{backgroundColor: "#45CBB2"}}/>
            <TableCell sx={{backgroundColor: "#45CBB2",fontWeight:"900"}}>SURVEY NAME</TableCell>
            <TableCell sx={{backgroundColor: "#45CBB2",fontWeight:"900"}} align="right">RESPONSES</TableCell>
            <TableCell sx={{backgroundColor: "#45CBB2"}}/>
            <TableCell sx={{backgroundColor: "#45CBB2"}}/>
            <TableCell sx={{backgroundColor: "#45CBB2"}}/>
          </TableRow>
        </TableHead>
        <TableBody>

        {input === ""  ?(
        
        posts.map(({ id, post }) => (
            < Posts 
            key={id} 
            postId={id} 
            ownerEmail={post.ownerEmail} 
            ownerId={post.ownerId} 
            ownerUsername={post.ownerUsername}
            questions={post.questions} 
            timestamp={post.timestamp}        
            formDescription={post.formDescription}
            formTitle={post.formTitle}
            read={post.read}
     
            />
    
        ))
    
):(
<>
<div style={{}} className="dropdown-content3">
          <ul id="list">
            {
              posts !== undefined ? (
                filteredPosts.map((posts2) => (
                  <li>
                      <h3 className="searchH3">{posts2.formTitle} </h3>
                  </li>
                ))
              ):
              (
                  <h3>No such results1</h3>
              )
            
            }
          </ul>
        </div>
</>
)}

        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
                </div>
              
 
            </div>
        </body>
    )
}

export default Ongoingsurvey
