import Link from "next/link";
import { useUser } from "../../contexts/UserProvider";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import handleData from "../../utility/handleDataApi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import {
  BoxDropdown,
  BoxDropdownContent,
} from "./AdminButton/AdminButtonStyles";

const UserLoggedButton = ({ to }) => {
  const dispatchIsLogged = useUser().dispatch;
  const stateOfUser = useUser().state;

  const { userName } = stateOfUser;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCLick = () => {
    const body = {
      userName,
    };

    handleData("PATCH", body, "users");
    const payload = {
      isLogged: false,
      userName: userName,
    };
    dispatchIsLogged({ type: "LOGGED_UNLOGGED", payload });
  };
  return (
    <BoxDropdown>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <VerifiedUserIcon sx={{ fontSize: 48 }} />
      </IconButton>
      <BoxDropdownContent>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem disabled>{userName}</MenuItem>
          <Link href={to}>
            <MenuItem onClick={handleCLick}>Log out</MenuItem>
          </Link>
        </Menu>
      </BoxDropdownContent>
    </BoxDropdown>
  );
};
export default UserLoggedButton;
