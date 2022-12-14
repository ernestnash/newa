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
import {auth,db} from '../firebase'
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom"




function Mysurveys({uid}) {
  let {user} = useSelector((state)=> ({...state}));
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");



    useEffect(() => {
      db.collection('surveys').where("ownerId", "==", uid).orderBy("timestamp", "desc").onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);


    return (
        <body >
            <div className="OngoingBody1">
                <div style={{marginTop:0}}>
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




        {
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
        uid={uid}
        active={post.active}
        posts={posts}
        />

    ))
}





        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
                </div>
              
 
            </div>
        </body>
    )
}

export default Mysurveys
