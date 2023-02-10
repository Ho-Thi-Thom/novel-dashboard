import { useTheme } from "@emotion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { Box, Button, Typography } from "@mui/material";
import { uuid } from "@sanity/uuid";
import React, { useState } from "react";
import { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useVocabularyContent from "../../../../../hook/useVocabularyContent";
import { tokens } from "../../../../../theme";
import { useStepContext } from "../StepContext";
import VocabularyInput from "./VocabularyInput";
import VocabularyItem from "./VocabularyItem";

const Step2 = () => {
  const { nextStep, backStep, data } = useStepContext();
  const theme = useTheme();
  const color = tokens(theme);
  const _id = uuid();

  const [vocabularyRef] = useAutoAnimate();
  const [vocabularies, setVocabularies] = useState(
    data.vocabularies?.map((item) => {
      return { ...item, state: item.state ?? color.greenAccent[500] };
    }) ?? []
  );
  const spaceVocabularies = useMemo(() => {
    return data.content.split("*").length - 1;
  }, [data]);

  const countVocabularies = vocabularies.length;

  const renderContent = useVocabularyContent({
    content: data.content,
    vocabularies,
    renderContent(content) {
      return (
        <Typography variant="h6" display="inline">
          {content}
        </Typography>
      );
    },
    renderVocabulary(vocabulary) {
      return (
        <Typography variant="h6" display="inline-block" fontWeight={600} sx={{ color: vocabulary?.state }}>
          {vocabulary?.en}
        </Typography>
      );
    },
    renderEmptyVocabulary() {
      return (
        <Box
          display="inline-block"
          sx={{
            border: "1px",
            borderRadius: "5px",
            width: "50px",
            height: "20px",
            backgroundColor: color.blueAccent[500],
          }}
        />
      );
    },
  });

  const getIndex = (data, id) => (id ? data.findIndex((value) => value._id === id) : -1);

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

  const handleCreate = (data, id) => {
    setVocabularies((vocabularies) => {
      const temp = JSON.parse(JSON.stringify(vocabularies));
      const index = getIndex(temp, id);
      temp.splice(index + 1, 0, { en: data.en.trim(), vi: data.vi.trim(), _id, state: "#61B146" });
      return temp;
    });
  };

  const handleEdit = (data, id) => {
    setVocabularies((vocabularies) => {
      const temp = JSON.parse(JSON.stringify(vocabularies));
      const index = getIndex(temp, id);
      temp.splice(index, 1, { ...data, _id: id, state: "#E6B325" });
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

  const onNextStep = () => {
    if (spaceVocabularies === countVocabularies) {
      nextStep({ vocabularies });
    } else {
      alert("Number of words and spaces that are incompatible");
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ display: "flex", gap: 3, pl: 1, pb: 1 }}>
        <Typography>Space : {spaceVocabularies} </Typography>/
        <Typography>Vocabulaties : {countVocabularies}</Typography>
      </Box>
      <Box sx={{ display: "flex", maxHeight: "65vh" }}>
        <Box
          sx={{
            flex: 1,
            p: 3,
            lineHeight: 2,
            border: 1,
            borderRadius: "4px",
            marginRight: 2,
            overflow: "auto",
            paddingX: "5px",
          }}
        >
          {renderContent}
        </Box>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            paddingX: "5px",
          }}
          ref={vocabularyRef}
        >
          {vocabularies?.length ? (
            vocabularies.map((vocabulary) => {
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
            })
          ) : (
            <VocabularyInput defaultValues={null} onSubmit={handleCreate} />
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: "20px", gap: 2, pr: 2 }}>
        <Button
          color="info"
          variant="contained"
          style={{ marginTop: "7px" }}
          onClick={() => backStep({ vocabularies })}
          startIcon={<ChevronLeftOutlinedIcon />}
        >
          Back step
        </Button>
        <Button
          color="success"
          variant="contained"
          style={{ marginTop: "7px" }}
          endIcon={<ArrowForwardIosOutlinedIcon />}
          onClick={onNextStep}
        >
          Next step
        </Button>
      </Box>
    </DndProvider>
  );
};

export default Step2;
