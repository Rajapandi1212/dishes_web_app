"use client";

import React, { Dispatch, memo, SetStateAction, useCallback } from "react";

interface Props {
  label: string;
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
}

const InputBox = ({ label, value, setValue }: Props) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event?.target?.value;
      setValue(rawValue);
    },
    [setValue]
  );

  return (
    <div className="max-w-20 mx-auto">
      <label
        htmlFor="number-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        value={value || ""}
        type="number"
        onChange={(e) => onChange(e)}
        id="number-input"
        aria-describedby="time_selelction"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="0"
      />
    </div>
  );
};

export default memo(InputBox);
