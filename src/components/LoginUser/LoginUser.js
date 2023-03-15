import { useAdmin } from "../../contexts/AdminProvider";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../../contexts/UserProvider";
import { useFormik } from "formik";
import {
  LoginTextField,
  PasswordBoxWrapper,
  PasswordIconButton,
  LogInButton,
} from "./LoginUserStyles";
import LoginDialog from "../Modals/LoginUserDialog/LoginUserDialog";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import handleData from "../../utility/handleDataApi";

export const LoginUser = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const dispatchIsLogged = useAdmin().dispatch;

  const dispatchUserLogged = useUser().dispatch;
  const stateOfUser = useUser().state;
  const { userName } = stateOfUser;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values) => {
    const { userName, password } = values;
    if (userName === "admin" && password === "admin") {
      const value = true;
      dispatchIsLogged({ value, type: "LOGGED" });
      return router.push("/admin");
    }

    const body = {
      userName,
      password,
    };

    handleData("PATCH", body, "users");
    const payload = {
      isLogged: true,
      userName: userName,
    };
    dispatchUserLogged({ type: "LOGGED_UNLOGGED", payload });
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    onSubmit: (values) => {
      handleSubmit(values);
      // setOpen(true);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <p>Please Log In</p>
        <LoginTextField
          variant="outlined"
          id="userName"
          name="userName"
          type="text"
          label="Username"
          onChange={formik.handleChange}
        />
        <PasswordBoxWrapper>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <PasswordIconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </PasswordIconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </FormControl>
        </PasswordBoxWrapper>
        <LogInButton type="submit" variant="contained">
          Log In
        </LogInButton>
      </form>
      <LoginDialog
        onClose={() => setOpen(false)}
        show={open}
        userLogged={userName}
        dialogTextOne={"You logged in. You can now buy products"}
        pushTo={"snacks"}
      />
    </>
  );
};
