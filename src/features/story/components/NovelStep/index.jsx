import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { lazy, Suspense, useMemo, useRef, useState } from "react";
import Header from "../../../../components/Header";
import { tokens } from "../../../../theme";
import StepProvider from "./StepContext";
import ProgressStepper from "../ProgressStepper";
const Step1 = lazy(() => import("./Step1"));
const Step2 = lazy(() => import("./Step2"));
const Step3 = lazy(() => import("./Step3"));

const NovelStep = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isEdit = Boolean(data);
  const [step, setStep] = useState(0);
  const dataRef = useRef(data);
  const save = (data) => {
    dataRef.current = {
      ...dataRef.current,
      ...data,
    };
  };

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const renderStep = useMemo(() => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 onUpdate={handleSubmit} />;
      default:
        return null;
    }
  }, [step]);

  const value = {
    data: dataRef.current,
    nextStep: handleNextStep,
    backStep: handleBack,
    save: save,
  };

  return (
    <Box m="20px 5px 20px 20px">
      <Header
        title={isEdit ? "Edit Novel" : "Create Novel"}
        subtitle={isEdit ? "Update the content for the story template" : "Create the content"}
      />
      <Box sx={{ pt: 2, my: 2, mx: "auto", backgroundColor: colors.primary[400], borderRadius: 2, width: "70%" }}>
        <ProgressStepper activeStep={step} setActiveStep={setStep} />
      </Box>
      <StepProvider value={value}>
        <Suspense fallback={<div>Loading...</div>}>{renderStep}</Suspense>
      </StepProvider>
    </Box>
  );
};

export default NovelStep;
