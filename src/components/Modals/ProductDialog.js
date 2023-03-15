import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogBox } from "./LoginUserDialog/LoginUserDialogStyles";

import { Typography } from "@mui/material";

const ProductDialog = ({ show, onClose, productName }) => {
  const handleCloseClick = () => {
    onClose();
  };

  const keyPress = (e) => {
    if (e.keyCode == 0) {
      onClose();
    }
  };
  return (
    <Dialog open={show} onKeyPress={keyPress}>
      <DialogContent sx={{ fontSize: "20px" }}>
        <DialogBox>
          {"You added  "}
          <Typography
            display="inline"
            sx={{ fontSize: "20px", margin: "0 6px" }}
          >
            {`"${productName}"`}
          </Typography>
          {"  to your cart."}
        </DialogBox>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleCloseClick}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
