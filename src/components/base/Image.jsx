import React from "react";
import { Controller } from "react-hook-form";

const Image = ({ control, name, width = "30%", alt = "#img", placeholder, label, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          {label && <h5>{label}</h5>}
          {field.value ? (
            <img src={field.value} width={width} alt={alt} {...props} />
          ) : (
            placeholder ?? <img alt="placeholder" src={require("../../utils/img/novel.png")} width={60} height={40} />
          )}
        </>
      )}
    />
  );
};

export default Image;
