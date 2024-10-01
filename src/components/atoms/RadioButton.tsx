"use client";

import { Field, Radio, RadioGroup, Button } from "@fluentui/react-components";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  choices: { value: string; label: string }[];
}

export const RadioButton = ({ label, value, setValue, choices }: Props) => {
  return (
    <>
      <Field label={label} className="font-semibold text-lg">
        <RadioGroup value={value} onChange={(_, data) => setValue(data.value)}>
          {choices?.map((choice) => (
            <Radio
              value={choice?.value}
              label={choice?.label}
              key={choice?.value}
            />
          ))}
        </RadioGroup>
      </Field>
      <Button disabled={!value} onClick={() => setValue("")}>
        Clear selection
      </Button>
    </>
  );
};
