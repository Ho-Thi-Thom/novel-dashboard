import { Box } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";
import { Document, Page, pdfjs } from "react-pdf";
import pdfUrl from "../../../utils/pdf/CV.pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Dashboard = () => {
  const [numPages, setNumPages] = useState(null);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Box m="20px 5px 20px 20px" sx={{ width: "90%", m: "auto" }}>
      <Header title="MY CV" subtitle="Detail CV" />
      <Box sx={{ display: "flex", height: "75vh" }}>
        <Document file={pdfUrl} onLoadSuccess={handleLoadSuccess}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {Array.from(Array(numPages)).map((v, index) => {
              return <Page pageNumber={index + 1} renderAnnotationLayer={false} key={index} />;
            })}
          </Box>
        </Document>
      </Box>
    </Box>
  );
};

export default Dashboard;
