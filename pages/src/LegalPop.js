import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import useMediaQuery from '@material-ui/core/useMedi-aQuery';
import { useTheme } from "@material-ui/core/styles";
import Router from "next/router";

export default function legalPop(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleAgree = (e) => {
    e.preventDefault();
    fetch("/api/testSaver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: props.canID,
        codes: props.canCode,
        test_mode: props.canMode,
        test_duration: props.canCounter,
        // test_result: "Here comes test result",
      }),
    })
      .then((res) => {
        Router.push("/appl/end");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Submit Results
      </Button>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Agree to submit personal data"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "black" }}>
            By selecting agree you agree to submit your personal information to Dragon Tester and have your most recent test scores shared with companies seeking frontend engineers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
