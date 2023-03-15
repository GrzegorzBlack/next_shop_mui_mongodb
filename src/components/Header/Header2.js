import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import {
  HeaderButton,
  ImageBoxWrapper,
  MenuBoxWrapper,
  HeaderButtonsWrapper,
  HeaderIconsWrapper,
} from "./Header2Styles";
import MenuItem from "@mui/material/MenuItem";
import CartButton from "../Buttons/CartIconButton";
import UserButton from "../Buttons/LoginButton";
import AdminButton from "../Buttons/AdminButton/AdminButton";
import UserLoggedButton from "../Buttons/UserIconButon";
import CartValue from "../CartValue/CartValue";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAdmin } from "../../contexts/AdminProvider";
import { useUser } from "../../contexts/UserProvider";

import Image from "next/image";

const pages = ["snacks", "drinks", "spirits"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { pathname } = useRouter();

  const stateOfAdmin = useAdmin().state;
  const stateOfUser = useUser().state;

  const { isLogged } = stateOfUser;

  const whatIcon = () => {
    if (stateOfAdmin) {
      return <AdminButton to={"/login"} toAdmin={"/admin"} />;
    } else if (isLogged) {
      return <UserLoggedButton to={"/login"} />;
    } else {
      return <UserButton to={"/login"} />;
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <ImageBoxWrapper>
        <Toolbar disableGutters>
          <div>
            <Link href={isLogged ? "/snacks" : "/"}>
              <Image src="/Frame1.png" alt="me" width="220" height="100" />
            </Link>
          </div>

          <MenuBoxWrapper>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: "flex",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={`/${page.toUpperCase()}`}>{page}</Link>
                </MenuItem>
              ))}
            </Menu>
          </MenuBoxWrapper>
          <HeaderButtonsWrapper>
            {pages.map((page) => (
              <HeaderButton
                key={page}
                variant="contained"
                onClick={handleCloseNavMenu}
                disabled={
                  pathname === "/" ||
                  pathname === "/login" ||
                  pathname === "/register"
                    ? true
                    : false
                }
              >
                <Link href={`/${page}`}>{page}</Link>
              </HeaderButton>
            ))}
          </HeaderButtonsWrapper>
          <Box
            sx={{
              width: "400px",
            }}
          ></Box>
          <HeaderIconsWrapper>
            <CartValue />

            <CartButton to={"/cart"} />
            {whatIcon()}
          </HeaderIconsWrapper>
        </Toolbar>
      </ImageBoxWrapper>
    </AppBar>
  );
}
export default ResponsiveAppBar;
