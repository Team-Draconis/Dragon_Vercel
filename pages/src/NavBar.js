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
    <div>
      <Box display="flex" justifyContent="flex-start" m={2.1}>
        <Box style={{ marginRight: "auto" }}>
          <Link href="/">
            <motion.img
              src="/dragon.svg"
              height="60"
              width="65"
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.2 }}
            />
          </Link>
        </Box>
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
      </Box>
    </div>
  );
}
