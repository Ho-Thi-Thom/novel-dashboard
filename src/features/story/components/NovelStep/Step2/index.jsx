import React, { useMemo, Fragment } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../../../theme";
import VocabularyItem from "./VocabularyItem";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Step2 = ({ data, nextStep, backStep }) => {
  const theme = useTheme();
  const color = tokens(theme);

  const renderContent = useMemo(() => {
    if (!data.content) return null;

    const contents = data.content.split("*");

    const [fristContent, ...otherContent] = contents;

    const result = [
      <Typography key={0} variant="h5" display="inline">
        {fristContent}
      </Typography>,
      ...otherContent.map((part, index) => {
        return (
          <Fragment key={index + 1}>
            <Typography variant="h5" display="inline" fontWeight={600} sx={{ color: color.greenAccent[500], mx: 0.5 }}>
              {data.vocabularies[index]?.en}
            </Typography>
            <Typography variant="h5" display="inline">
              {part}
            </Typography>
          </Fragment>
        );
      }),
    ];

    return result;
  }, [data]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ display: "flex", maxHeight: "70vh" }}>
        <Box
          sx={{
            flex: 3,
            // bgcolor: "red",
            p: 3,
            lineHeight: 2,
            border: 1,
            borderRadius: 7,
            marginRight: 2,
            overflow: "auto",
          }}
        >
          {renderContent}
        </Box>
        <Box
          sx={{
            flex: 2,
            overflow: "auto",
          }}
        >
          <div>
            {data.vocabularies?.map((vocabulary) => {
              return (
                <div key={vocabulary._id}>
                  <VocabularyItem data={vocabulary} />
                </div>
              );
            })}
          </div>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Step2;
