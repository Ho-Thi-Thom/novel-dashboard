import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";

const Upload = ({ control, name, onChange, accept, size = 2, ...props }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    // ...
    const file = e.target.files[0];

    if (file) {
      // Validate
      if (!validate.type(accept, file.type)) {
        setError("Invalid format, accept: " + accept);
        return;
      }

      if (!validate.size(size, file.size)) {
        setError(`Invalid size, accept: under ${size}MB`);
        return;
      }

      if (error) {
        setError("");
      }
      setFile(file);
      onChange?.(URL.createObjectURL(file), file);
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <input type="file" accept={accept} value={field.value} {...props} onChange={handleChange} />
          {file && (
            <>
              <p>{file.name}</p>
            </>
          )}
          {error && (
            <FormHelperText error sx={{ fontSize: "12px" }}>
              {error}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default Upload;

const validate = {
  type: (accept, type) => {
    if (!accept.includes(type)) {
      return false;
    }
    return true;
  },
  size: (size, fileSize) => {
    // fileSize: byte
    // size: megabyte
    if (fileSize / 1024 / 1024 > size) {
      return false;
    }
    return true;
  },
};
