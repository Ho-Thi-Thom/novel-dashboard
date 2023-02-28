import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputBase } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { tokens } from "../theme";

const Search = ({ onSearch }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState("");
  const firstRender = useRef(false);

  useEffect(() => {
    let timeout = null;
    if (firstRender.current) {
      timeout = setTimeout(() => {
        onSearch({
          params: value,
        });
      }, [500]);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [value]);

  useEffect(() => {
    firstRender.current = true;
  }, []);

  return (
    <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search"
      />
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default Search;
