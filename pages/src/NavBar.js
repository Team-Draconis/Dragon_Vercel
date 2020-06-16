import Link from "next/link";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import styles from "../styles/Navbar.module.css";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";

export default function NavBar() {
  return (
    // <div className="navbar">
    //   <h2 id="title">Dragon Tester: Show your fire!</h2>
    //   <Link href="/">
    //     <a>LogOut</a>
    //   </Link>
    //   <Link href="/comp/login">
    //     <a>Company LogIn</a>
    //   </Link>
    // </div>
    <div>
      <Box display="flex" justifyContent="flex-start" m={2.1}>
        {/* <AppBar position="static" color="primary">
        <Toolbar display="flex" justifyContent="flex-start"> */}
        {/* <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
        {/* <Typography variant="h6">Home</Typography> */}
        <Box style={{ marginRight: "auto" }}>
          <Link href="/">
            {/* <Button color="inherit">Home</Button> */}

            <motion.img
              src="/dragon.svg"
              height="60"
              width="65"
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.2 }}
            />
          </Link>
        </Box>
        {/* </Link>
          <Link href="/appl/SignIn">
            <Button color="inherit">Login</Button>
          </Link>
          <Link href="/comp/signin">
            <Button color="inherit">Company</Button>
          </Link> */}
        <Box>
          <Link href="/">
            <motion.div whileHover={{ scale: 1.2 }}>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Logout
              </Button>
            </motion.div>
          </Link>
        </Box>
        {/* </Toolbar>
      </AppBar> */}
      </Box>
    </div>
  );
}
