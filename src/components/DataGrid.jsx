import { Box, useTheme } from "@mui/material";
import { DataGrid as XDataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

const DataGrid = ({ data, columns, ...props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      borderRadius="7px"
      m="20px 0 0 0"
      height="65vh"
      backgroundColor={colors.primary[200]}
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <XDataGrid
        rows={data}
        columns={columns}
        style={{
          fontSize: "14px",
        }}
        {...props}
      />
    </Box>
  );
};

export default DataGrid;
