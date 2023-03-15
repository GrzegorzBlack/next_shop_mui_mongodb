import Link from "next/link";
import { ButtonStyled } from "./ButtonStyles";

const Button = ({ to, name }) => {
  return (
    <Link href={to}>
      <ButtonStyled>{name}</ButtonStyled>
    </Link>
  );
};
export default Button;
