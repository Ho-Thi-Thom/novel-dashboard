import { createContext, useContext } from "react";

const defaultValue = {
  data: {
    title: "",
    content: "",
    imageUrl: "",
    image: null,
    vocabularies: [],
  },
  isEdit: false,
  nextStep: () => {},
  backStep: () => {},
  save: () => {},
};

const StepContext = createContext(defaultValue);

const StepProvider = ({ children, value }) => {
  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

export const useStepContext = () => {
  const context = useContext(StepContext);

  if (!context) {
    throw Error("Must be using ib Step Provider");
  }

  const { data, isEdit, backStep, nextStep, save } = context;

  return {
    data,
    isEdit,
    save,
    backStep(data) {
      backStep();
      save(data);
    },
    nextStep(data) {
      nextStep(data);
      save(data);
    },
  };
};

export default StepProvider;
