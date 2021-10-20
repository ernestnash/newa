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


function Test() {
  let {user} = useSelector((state)=> ({...state}));
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('surveys').where("active","==", true).orderBy("timestamp", "desc").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);

  return (
    <div>
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
                    doc_desc={post.formDescription}
                    doc_name={post.formTitle}
                    read={post.read}
             
                    />
            
                ))
      }
    </div>
  )
}

export default Test
