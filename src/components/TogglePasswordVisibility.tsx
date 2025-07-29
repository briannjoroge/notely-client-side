import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

type passwordViewing = {
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  showStrength?: boolean;
};

function TogglePasswordVisibility({
  password,
  handlePassword,
  label = "Password",
  required = true,
  fullWidth = true,
  showStrength = false,
}: passwordViewing) {
  const [showPassword, setShowPassword] = useState(false);
  const [score, setScore] = useState(0);
  const strengthLabels = ["Too Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "error.main",
    "warning.main",
    "info.main",
    "primary.main",
    "success.main",
  ];

  useEffect(() => {
    if (showStrength && password.length > 0) {
      const result = zxcvbn(password);
      setScore(result.score);
    }
  }, [password, showStrength]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth={fullWidth}
        type={showPassword ? "text" : "password"}
        label={label}
        value={password}
        onChange={handlePassword}
        required={required}
        margin="normal"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {showStrength && password.length > 0 && (
        <>
          <Typography
            variant="body1"
            sx={{ mt: 1 }}
            color={strengthColors[score]}
          >
            Password Strength: {strengthLabels[score]}
          </Typography>

          {score < 3 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              Use at least 8 characters, one uppercase, one lowercase, and a
              number.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default TogglePasswordVisibility;
