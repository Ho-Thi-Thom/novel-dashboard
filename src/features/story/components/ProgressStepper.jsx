import { useTheme } from "@emotion/react";
import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";

const steps = [
  { step: 1, content: "Content" },
  { step: 2, content: "Vocabularies" },
  { step: 3, content: "Review" },
];
const ProgressStepper = ({ activeStep }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <Stepper
        activeStep={activeStep - 1}
        sx={{
          "& .MuiStepIcon-root.Mui-completed": {
            color: colors.greenAccent[500],
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: colors.redAccent[400],
          },
          "& .MuiStepIcon-root": {
            color: colors.blueAccent[500],
          },
        }}
      >
        {steps.map(({ step, content }) => (
          <Step key={step}>
            <StepLabel>{content}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProgressStepper;
