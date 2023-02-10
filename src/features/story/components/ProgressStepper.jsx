import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const steps = ["Step 1", "Step 2", "Step 3"];
const ProgressStepper = ({ activeStep, setActiveStep }) => {
  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step - 1}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Button onClick={setActiveStep}></Button>
    </div>
  );
};

export default ProgressStepper;
