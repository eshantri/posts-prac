import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
const CreatePost = () => {
  const [Body, setBody] = React.useState("");
  const [Title, setTitle] = React.useState("");
  const { createPost } = useContext(Context);
  return (
    <div>
      <Typography style={{margin:10}} variant="h6">Create Post</Typography>
      <TextField
        id="outlined-multiline-static"
        multiline
        value={Title}
        style={{ width: "100%", margin: "5px" }}
        label="Title"
        maxRows={4}
        onChange={(e) => setTitle(e.target.value)}
        defaultValue="Default Value"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        multiline
        value={Body}
        label="Content"
        style={{ width: "100%", fontWeight: "500", margin: "5px" }}
        onChange={(e) => setBody(e.target.value)}
        maxRows={8}
        defaultValue="Default Value"
        variant="outlined"
      />
      <div className="util-con">
        {" "}
        <Link to="/">
          {" "}
          <IconButton
            style={{ transition: "all 0.2s ease-in", margin: "5px" }}
            color="primary"
            onClick={() => createPost(Title, Body)}
            aria-label="remove from favorites"
          >
            <SaveIcon />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};

export default CreatePost;
