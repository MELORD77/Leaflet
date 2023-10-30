import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ setCameraId }) {
  const [age, setAge] = React.useState("");
  const [disabledItems, setDisabledItems] = React.useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleItemClick = (value) => {
    setDisabledItems((prevDisabledItems) => [...prevDisabledItems, value]);
    setCameraId(value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 250, marginBottom: "10px" }}>
      <FormControl fullWidth size="small">
        <Select value={age} onChange={handleChange}>
          <MenuItem
            value="option1"
            disabled={disabledItems.includes("option1")}
            onClick={() => handleItemClick("option1")}
          >
            Option 1
          </MenuItem>
          <MenuItem
            value="option2"
            disabled={disabledItems.includes("option2")}
            onClick={() => handleItemClick("option2")}
          >
            Option 2
          </MenuItem>
          <MenuItem
            value="option3"
            disabled={disabledItems.includes("option3")}
            onClick={() => handleItemClick("option3")}
          >
            Option 3
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
