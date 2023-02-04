import { Box } from "@mui/material";
import React, { lazy, Suspense, useMemo, useRef, useState } from "react";
import Header from "../../../../components/Header";

const Step1 = lazy(() => import("./Step1"));
const Step2 = lazy(() => import("./Step2"));

const NovelStep = ({ data }) => {
  const isEdit = Boolean(data);
  const [step, setStep] = useState(1);
  const dataRef = useRef(data);

  const handleNextStep1 = (data) => {
    dataRef.current = data;
    setStep(2);
  };

  const handleNextStep2 = (data) => {
    console.log(data);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return <Step1 data={dataRef.current} nextStep={handleNextStep1} />;
      case 2:
        return <Step2 data={dataRef.current} nextStep={handleNextStep2} backStep={handleBack} />;
      default:
        return null;
    }
  }, [step]);

  return (
    <Box m="20px 5px 20px 20px">
      <Header title="Edit Novel" subtitle="Update the content for the story template" />
      <Suspense fallback={<div>Loading...</div>}>{renderStep}</Suspense>
    </Box>
  );
};

export default NovelStep;
