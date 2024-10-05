import { InputOnChangeData, SearchBox } from "@fluentui/react-components";
import type { SearchBoxChangeEvent } from "@fluentui/react-components";
import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    maxWidth: "1400px",
    width: "100%",
  },
});

type Props = {
  value: string;
  onChange: (ev: SearchBoxChangeEvent, data: InputOnChangeData) => void;
  onFocus: () => void;
};

export const TypeAhead = (props: Props) => {
  const { value, onChange, onFocus } = props;
  const styles = useStyles();

  return (
    <SearchBox
      value={value}
      onChange={onChange}
      className={styles.container}
      onFocus={onFocus}
    />
  );
};
