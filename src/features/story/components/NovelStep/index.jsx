import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { lazy, Suspense, useMemo, useRef, useState } from "react";
import Header from "../../../../components/Header";

import { tokens } from "../../../../theme";

import { forwardRef, useImperativeHandle } from "react";
import StepProvider from "../../../../context/StepContext";
import ProgressStepper from "../ProgressStepper";

const Step1 = lazy(() => import("./Step1"));
const Step2 = lazy(() => import("./Step2"));
const Step3 = lazy(() => import("./Step3"));

const NovelStep = forwardRef(({ data, onSubmit }, ref) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isEdit = Boolean(data);
  const [step, setStep] = useState(1);
  const dataRef = useRef(data);

  useImperativeHandle(
    ref,
    () => ({
      refresh() {
        setStep(1);
        dataRef.current = null;
      },
    }),
    []
  );

  const save = (data) => {
    dataRef.current = {
      ...dataRef.current,
      ...data,
    };
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(dataRef.current);
      handleNextStep();
    } catch (error) {}
  };

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 onSubmit={handleSubmit} isEdit={isEdit} />;
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
      <Box sx={{ py: 2, my: 2, mx: "auto", backgroundColor: colors.primary[400], borderRadius: 2, width: "70%" }}>
        <ProgressStepper activeStep={step} setActiveStep={setStep} />
      </Box>
      <StepProvider value={value}>
        <Suspense fallback={<div>Loading...</div>}>{renderStep}</Suspense>
      </StepProvider>
    </Box>
  );
});

export default NovelStep;
