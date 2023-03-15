import { useFormik } from "formik";
import handleData from "../../utility/handleDataApi";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { StyledForm } from "./FormStyles";

export const Form = ({
  setSnacks,
  setDrinks,
  setSpirits,
  itemsSnacks,
  itemsDrinks,
  itemsSpirits,
}) => {
  const formik = useFormik({
    initialValues: {
      category: "",
      name: "",
      price: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleSubmit = (values) => {
    const { category, name, price } = values;

    const body = {
      category,
      name,
      price,
    };

    handleData("POST", body, category).then((data) => {
      switch (category) {
        case "snacks":
          setSnacks([...itemsSnacks, data.snack]);
          break;
        case "drinks":
          setDrinks([...itemsDrinks, data.drink]);
          break;
        case "spirits":
          setSpirits([...itemsSpirits, data.spirit]);
          break;
        default:
          console.log(`Sorry, we are out of ${category}.`);
      }
    });
  };
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        type="text"
        label="Enter product name"
        onChange={formik.handleChange}
        value={formik.values.name}
        required
      />
      <TextField
        id="price"
        name="price"
        type="number"
        label="Enter product price"
        onChange={formik.handleChange}
        value={formik.values.price}
        InputProps={{ inputProps: { min: 1, max: 999 } }}
        required
      />
      <FormControl sx={{ width: "200px" }}>
        <InputLabel>Choose product type</InputLabel>
        <Select
          id="demo-simple-select"
          name="category"
          label="Choose product type"
          onChange={formik.handleChange}
          value={formik.values.category}
          required
        >
          <MenuItem value="snacks">Snacks</MenuItem>
          <MenuItem value="drinks">Drinks</MenuItem>
          <MenuItem value="spirits">Spirits</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Add product
      </Button>
    </StyledForm>
  );
};
