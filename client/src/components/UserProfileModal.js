import React, {useState} from 'react'
import { useMutation } from 'react-query'
import UserProfileEdit from './UserProfileEdit'

import {
  makeStyles,
  Typography,
  CardActions,
  Button,
  Modal,
  Backdrop,
  Fade,
  Avatar,
  Divider
} from "@material-ui/core";

import styles from "../../src/FetchImages.module.css"

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: "scroll",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPost:{
    fontSize: "16px",
  },
  modalHeader:{
    fontSize: "16px",
  },
  wrapAvatar:{
    verticalAlign: 'middle',
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  paper: {
    maxHeight: "800px",
    width: "500px",
    backgroundColor: "#f5f3f0",
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 3),
  },
  media: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const UserProfileModal = ({modalData, handleClose, open, post}) => {

  const classes = useStyles();
  const [openEdit, setOpenEdit] = useState(false);
  const [postID, setPostID] = useState()
  const [form, setForm] = useState("")

//*===============OPEN MODAL==============
const handleEditOpen = (e) => {
  setOpenEdit(true);
  setForm(e);
  setPostID(modalData._id)
  console.log("this is the id of modalData: ", modalData._id)
};
const handleEditClose = () => {
  setOpenEdit(false);
};

  return (
    <div>
      <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
              <img className={styles.modalImages} src={modalData.image_url} alt={modalData.dishes_id}/>
              <div className={styles.post}>
              <Typography className={classes.wrapAvatar}><Avatar style={{marginRight: "10px"}}></Avatar>Username</Typography>
              <Divider style={{margin: "5px 0"}}/>
              <Typography gutterBottom variant="body1" component="h2">
              {modalData.review}
              </Typography>
              <Typography gutterBottom variant="body1">
                🔥Shiokmeter: {modalData.rating}
              </Typography>
              <Divider style={{margin: "10px 0"}}/>
              <Typography gutterBottom variant="body1">
              <strong>{modalData.dishes_id}</strong> from {modalData.hawkerStall}
              </Typography>
              <Typography gutterBottom variant="body1">
                Hawker Centre: {modalData.hawkerCentre}
              </Typography>
              <CardActions gutterBottom>
                <Button size="small" variant="contained" color="primary" onClick={()=>handleEditOpen()}>Edit</Button>
                <Button size="small" variant="contained">Delete</Button>
              </CardActions>
              </div>
              </div>
            </Fade>
          </Modal>
          <UserProfileEdit openEdit={openEdit} handleEditClose={handleEditClose} post={post} postID={postID} />
    </div>
  )
}

export default UserProfileModal
