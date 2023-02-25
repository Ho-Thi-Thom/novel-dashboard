import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/styles";
import React from "react";
import { useStepContext } from "../../../../context/StepContext";
import useVocabularyContent from "../../../../hook/useVocabularyContent";
import { tokens } from "../../../../theme";

const Step3 = ({ onSubmit }) => {
  const { backStep, data, isEdit } = useStepContext();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const BlueOnGreenTooltip = styled(Tooltip)({
    tooltip: {
      fontSize: "14px",
      color: "white",
      backgroundColor: colors.greenAccent[900],
      padding: "5px",
    },
  });

  const renderContent = useVocabularyContent({
    content: data.content,
    vocabularies: data.vocabularies,
    renderContent(content) {
      return (
        <Typography variant="h6" display="inline">
          {content}
        </Typography>
      );
    },
    renderVocabulary(vocabulary) {
      return (
        <BlueOnGreenTooltip title={vocabulary?.vi}>
          <Typography variant="h6" display="inline-block" sx={{ color: colors.greenAccent[500] }}>
            {vocabulary?.en}
          </Typography>
        </BlueOnGreenTooltip>
      );
    },
  });

  return (
    <>
      <Box sx={{ maxHeight: "65vh", display: "flex-column" }}>
        <Typography variant="h3" textTransform={"uppercase"} textAlign="center" color={colors.grey[100]}>
          {data.title}
        </Typography>
        <Box
          sx={{
            flex: 1,
            mt: 4,
            p: 3,
            lineHeight: 2,
            border: 1,
            borderRadius: "4px",
            overflow: "auto",
            paddingX: "5px",
          }}
        >
          {renderContent}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", mt: "20px", gap: 2, pr: 2 }}>
          <Button
            color="info"
            variant="contained"
            style={{ marginTop: "7px" }}
            onClick={backStep}
            startIcon={<ArrowBackIosIcon />}
          >
            Back step
          </Button>
          <Button
            color="secondary"
            variant="contained"
            style={{ marginTop: "7px" }}
            onClick={onSubmit}
            endIcon={<SaveAltIcon />}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Step3;
