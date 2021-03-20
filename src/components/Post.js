import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Context } from "../Context";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Modal from "@material-ui/core/Modal";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    maxWidth: "100%",
    margin: "20px",
  },
  media: {
    height: 140,
  },
}));

export default function Post(props) {
  const { title, content, id, isLiked, isDisliked, userId } = props;
  const { onLikeClick, onDislikeClick, deletePost, editPost } = useContext(
    Context
  );
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [Body, setBody] = React.useState(content);
  const [Title, setTitle] = React.useState(title);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        id="outlined-multiline-static"
        multiline
        value={Title}
        style={{ width: "100%" }}
        maxRows={4}
        onChange={(e) => setTitle(e.target.value)}
        defaultValue="Default Value"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        multiline
        value={Body}
        style={{ width: "100%", fontWeight: "500" }}
        onChange={(e) => setBody(e.target.value)}
        maxRows={8}
        defaultValue="Default Value"
        variant="outlined"
      />
      <div className="util-con">
        {" "}
        <IconButton
          style={{ transition: "all 0.2s ease-in" }}
          onClick={() => editPost(id, Title, Body, userId)}
          color="primary"
          aria-label="remove from favorites"
        >
          <SaveIcon />
        </IconButton>
      </div>
    </div>
  );
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => onLikeClick(id)}
          style={{ transition: "all 0.2s ease-in" }}
          color={isLiked(id) ? "primary" : ""}
          aria-label="add to favorites"
        >
          <ThumbUpAltIcon />
        </IconButton>
        <IconButton
          onClick={() => onDislikeClick(id)}
          style={{ transition: "all 0.2s ease-in" }}
          color={isDisliked(id) ? "primary" : ""}
          aria-label="remove from favorites"
        >
          <ThumbDownIcon />
        </IconButton>
        <div className="util-con">
          <IconButton aria-label="edit" onClick={() => handleOpen()}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => deletePost(id)}
            aria-label="delete"
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Card>
  );
}
