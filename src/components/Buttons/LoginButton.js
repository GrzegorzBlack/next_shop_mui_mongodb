import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import { BoxDropdown } from "./Button/ButtonStyles";
import IconButton from "@mui/material/IconButton";

const UserButton = ({ to }) => {
  return (
    <BoxDropdown>
      <Link href={to}>
        <IconButton>
          <PersonIcon sx={{ fontSize: 48 }} />
        </IconButton>
      </Link>
    </BoxDropdown>
  );
};
export default UserButton;
