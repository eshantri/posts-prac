import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import ContextProvider from "./Context";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import LikedPosts from "./components/LikedPosts";
import DislikedPosts from "./components/DislikedPosts";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreatePost from "./components/CreatePost";
import NotFound from "./components/NotFound";
const theme = createMuiTheme({
  typography: {
    fontFamily: "Raleway, Arial",
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function App() {
  const classes = useStyles();
  return (
    <Router>
      {" "}
      <ContextProvider>
        <div className="App">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed">
              <Toolbar>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "10px",
                  }}
                >
                  <Typography variant="h6" className={classes.title}>
                    All Posts
                  </Typography>
                </Link>
                <Link
                  to="/liked"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "10px",
                  }}
                >
                  <Typography variant="h6" className={classes.title}>
                    Liked Posts
                  </Typography>
                </Link>
                <Link
                  to="/disliked"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "10px",
                  }}
                >
                  <Typography variant="h6" className={classes.title}>
                    Disliked Posts
                  </Typography>
                </Link>
                <Link to="/addpost">
                  <IconButton
                    style={{ transition: "all 0.2s ease-in" }}
                    color="default"
                    aria-label="add post"
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Link>
              </Toolbar>
            </AppBar>
            <Switch>
              {" "}
              <Route path="/" exact component={PostList} />
              <Route path="/liked" exact component={LikedPosts} />
              <Route path="/disliked" exact component={DislikedPosts} />
              <Route path="/addpost" exact component={CreatePost} />
              <Route component={NotFound} />
            </Switch>
          </ThemeProvider>
        </div>
      </ContextProvider>
    </Router>
  );
}

export default App;
