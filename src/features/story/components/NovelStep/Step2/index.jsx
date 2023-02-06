import { useTheme } from "@emotion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Typography } from "@mui/material";
import React, { Fragment, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { tokens } from "../../../../../theme";
import VocabularyItem from "./VocabularyItem";
import { uuid } from "@sanity/uuid";

const Step2 = ({ data, nextStep, backStep }) => {
  const theme = useTheme();
  const color = tokens(theme);
  const _id = uuid();

  const [vocabularies, setVocabularies] = useState(data.vocabularies ?? []);

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
              {vocabularies[index]?.en ?? "Thom Khung"}
            </Typography>
            <Typography variant="h5" display="inline">
              {part}
            </Typography>
          </Fragment>
        );
      }),
    ];

    return result;
  }, [data, vocabularies]);

  const getIndex = (data, id) => data.findIndex((value) => value._id === id);

  const handleMove = (dragItem, dropItem) => {
    setVocabularies((vocabularies) => {
      const temp = JSON.parse(JSON.stringify(vocabularies));
      const dragIndex = getIndex(temp, dragItem._id);
      const dropIndex = getIndex(temp, dropItem._id);
      temp.splice(dragIndex, 1);
      temp.splice(dropIndex, 0, dragItem);
      return temp;
    });
  };

  const [vocabularyRef] = useAutoAnimate();

  const handleCreate = (data, id) => {
    setVocabularies((vocabularies) => {
      const temp = JSON.parse(JSON.stringify(vocabularies));
      const index = getIndex(temp, id);
      temp.splice(index + 1, 0, { ...data, _id });
      return temp;
    });
  };

  const handleEdit = (data, id) => {
    setVocabularies((vocabularies) => {
      const temp = JSON.parse(JSON.stringify(vocabularies));
      const index = getIndex(temp, id);
      temp.splice(index, 1, { ...data, _id: id });
      return temp;
    });
  };

  const handleDelete = (id) => {
    setVocabularies((vocabularies) => {
      const temp = JSON.parse(JSON.stringify(vocabularies));
      const index = getIndex(temp, id);
      temp.splice(index, 1);
      return temp;
    });
  };
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
          ref={vocabularyRef}
        >
          {vocabularies?.map((vocabulary) => {
            return (
              <div key={vocabulary._id}>
                <VocabularyItem
                  data={vocabulary}
                  onMove={(dragItem) => {
                    handleMove(dragItem, vocabulary);
                  }}
                  onCreate={(data) => {
                    handleCreate(data, vocabulary._id);
                  }}
                  onEdit={(data) => {
                    handleEdit(data, vocabulary._id);
                  }}
                  onDelete={() => handleDelete(vocabulary._id)}
                />
              </div>
            );
          })}
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Step2;
