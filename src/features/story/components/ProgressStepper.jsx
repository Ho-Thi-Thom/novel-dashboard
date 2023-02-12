import { useTheme } from "@emotion/react";
import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";

const steps = [
  { step: 1, content: "Content" },
  { step: 2, content: "Vocabularies" },
  { step: 3, content: "Review" },
];
const ProgressStepper = ({ activeStep, setActiveStep }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(activeStep);
  return (
    <div>
      <Stepper
        activeStep={activeStep - 1}
        sx={{
          "& .MuiStepIcon-root.Mui-completed": {
            color: colors.greenAccent[500],
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: colors.redAccent[500],
          },
          "& .MuiStepIcon-root": {
            color: colors.blueAccent[500],
          },
        }}
      >
        {steps.map(({ step, content }) => (
          <Step
            key={step}
            onClick={() => {
              setActiveStep(step);
            }}
          >
            <StepLabel>{content}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProgressStepper;
