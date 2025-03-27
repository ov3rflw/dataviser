"use client";

import { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Popover } from "@mui/material";

export default function CustomDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <p onClick={handleIconClick} style={{cursor: "pointer"}}>
          Filtrer par date
        </p>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              handleClose(); 
            }}
            renderInput={() => null}
          />
        </Popover>
      </div>
    </LocalizationProvider>
  );
}
