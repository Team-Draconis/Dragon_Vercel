import Link from "next/link";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import styles from "./styles/Navbar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/appl/signin">
            <Button color="inherit">Candidate Login</Button>
          </Link>
          <Link href="/comp/signin">
            <Button color="inherit">Company Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
