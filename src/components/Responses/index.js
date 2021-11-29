import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom"
// import "./styles.css"
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Backdrop from '@mui/material/Backdrop';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";
import { MailIcon } from 'react-mail-icon'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));





function Addpost({postId, formId, fromEmail, fromId, questions, timestamp, formDescription, formTitle}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const [loading, setLoading] = useState(false)
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => {
      setOpen2(false);
    };
    const handleToggle = () => {
      setOpen2(true);
    };

    var d = timestamp;
    //var d =val.timestamp;
    
    //NB: use + before variable name
    var date = new Date(+d);
    return (
        <div style={{display:"flex",flexWrap: "wrap"}}>

{/* <Card sx={{ maxWidth: 345,margin:1, borderTop: "2px solid #808080" }}>
      <CardHeader

        action={
          <IconButton aria-label="settings">
            <DeleteForeverIcon onClick={handleToggle}/>
          </IconButton>
        }
        title="Title"
        subheader="September 14, 2016"
      />
      <CardMedia
      style={{padding:5}}
        component="img"
        image="https://media.istockphoto.com/photos/nairobi-cityscape-capital-city-of-kenya-picture-id637912692?k=20&m=637912692&s=612x612&w=0&h=uHa90J-jGXws6mo7yeOKLI-ta_RYGErtbsqhtPVxBHk="
        alt="Title"
      />

          <CardActions disableSpacing>
          <b>4000</b>
        <IconButton style={{marginLeft:-8}} aria-label="add to favorites">
           <FavoriteIcon />
        </IconButton>
        <b>102</b>
        <IconButton style={{marginLeft:-5}} aria-label="share">
          <InsertCommentIcon />
        </IconButton> 

          <IconButton style={{marginLeft: 90}} aria-label="settings">
          <ShareIcon onClick={handleToggle}/>
        </IconButton> 
            </CardActions>
      
    </Card> */}



    <Card sx={{ maxWidth: 400,margin:1,width:400, borderTop: "2px solid #808080" }}>
      <CardHeader

        action={
          <IconButton aria-label="settings">
            <DeleteForeverIcon />
          </IconButton>
        }
        title={`Title: ${formTitle}`}
        subheader={`${date.toDateString()}, ${date.toLocaleTimeString()}`}
      />


      
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
<ListItem alignItems="flex-start">

        <ListItemText
          secondary={
            <React.Fragment>

              {
                questions?.map((question,qindex)=>(
                    <div className="user_form_questions">
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",fontSize:"14px"}} >{qindex+1}.  {question.question}</Typography>
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",fontSize:"14px"}} >Answers:  {question.answer}</Typography>
                    {/* {
                            question?.options?.map((ques,index)=>(
                              
                              <div key={index} style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex'}}>
                                  <div className="form-check">
                                    

                                  
                                  </div>
                                  </div>
                                </div>
                            ))
                    } */}
                    </div>
                ))
                
                }         
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
</List>


     
      
    </Card>
    


        </div>

        
    )
}

export default Addpost
