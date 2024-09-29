import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Adjust import based on your project structure
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from '@mui/material/TextField';

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      sx={{
      }}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined" // You can adjust the variant as needed
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        style: { height: '35px' }
      }}
    />
  );
};

export default PasswordInput;
