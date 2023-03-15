import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  TypographyStyled,
  DialogBox,
  DialogTextStyled,
} from "./LoginUserDialogStyles";
import { Typography } from "@mui/material";

const LoginDialog = ({
  show,
  onClose,
  userLogged,
  dialogTextOne,
  dialogTextTwo,
  dialogTextThree,
  pushTo,
}) => {
  const router = useRouter();

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
    pushTo ? router.push(`/${pushTo}`) : null;
  };

  const keyPress = (e) => {
    if (e.keyCode == 0) {
      onClose();
      pushTo ? router.push(`/${pushTo}`) : null;
    }
  };

  return (
    <Dialog open={show} onKeyPress={keyPress}>
      {userLogged ? (
        <DialogTitle>
          <DialogBox>
            <Typography sx={{ fontSize: "30px" }}>Hello</Typography>{" "}
            <TypographyStyled sx={{ fontSize: "30px" }}>
              {userLogged}
            </TypographyStyled>
            <Typography sx={{ fontSize: "30px" }}>!</Typography>
          </DialogBox>
        </DialogTitle>
      ) : null}
      <DialogContent>
        <DialogContentText sx={{ color: "black" }}>
          {dialogTextOne}
        </DialogContentText>
        {dialogTextTwo ? (
          <DialogTextStyled sx={{ pt: 2 }}>{dialogTextTwo}</DialogTextStyled>
        ) : null}
        {dialogTextThree ? (
          <DialogTextStyled sx={{ pt: 2 }}>{dialogTextThree}</DialogTextStyled>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          autoFocus
          type="submit"
          onClick={(e) => handleCloseClick(e)}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
