import { SetStateAction, useEffect, useState } from "react";
import {
  Virtualizer,
  useStaticVirtualizerMeasure,
} from "@fluentui/react-components/unstable";

import { makeStyles } from "@fluentui/react-components";
import { Button } from "./Button";
import Link from "next/link";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    width: "100%",
    height: "100%",
    maxHeight: "60vh",
  },
});

type Props = {
  loading: boolean;
  handleButtonClick: () => void;
  dishes: { id: number; name: string }[];
};

export const VirtualList = ({
  loading,
  handleButtonClick,
  dishes = [],
}: Props) => {
  const styles = useStyles();
  const [showOverlay, setShowOverlay] = useState(loading);
  const childLength = dishes?.length;

  const {
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollRef,
    containerSizeRef,
  } = useStaticVirtualizerMeasure({
    defaultItemSize: 25,
  });

  //Workaround for loader flickering effect
  useEffect(() => {
    if (loading) {
      setShowOverlay(true);
    } else {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div
      aria-label="Dishes Virtualizer"
      className={styles.container}
      role={"list"}
      ref={scrollRef}
    >
      {showOverlay ? (
        <div className="h-[30vh] flex items-center justify-center">
          <span className="relative flex h-10 w-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-10 w-10 bg-sky-500"></span>
          </span>
        </div>
      ) : childLength < 1 && !loading ? (
        <div className="h-[30vh] flex items-center justify-center">
          <span>No Dishes Found.</span>
        </div>
      ) : (
        <Virtualizer
          numItems={childLength}
          virtualizerLength={virtualizerLength}
          bufferItems={bufferItems}
          bufferSize={bufferSize}
          itemSize={25}
          containerSizeRef={containerSizeRef}
        >
          {(index) => {
            const dish = dishes?.[index];
            return (
              <div
                role={"listitem"}
                aria-posinset={index}
                aria-setsize={childLength}
                key={`dish-virtualizer-child-${index}`}
                className="flex justify-between items-center gap-2 p-2 md:pr-4 border-b-2"
              >
                <span>{dish?.name}</span>

                <Link href={`/dish/${dish?.id}`} className="">
                  <Button onclick={handleButtonClick}>VIEW</Button>
                </Link>
              </div>
            );
          }}
        </Virtualizer>
      )}
    </div>
  );
};
