import { TypeAhead } from "@/components/atoms/TypeAhead";
import { VirtualList } from "@/components/atoms/VirtualList";
import { autoSuggestion } from "@/helpers/apiCalls";
import useClickOutside from "@/helpers/hooks/useClickOutside";
import { useDebounce } from "@/helpers/hooks/useDebounce";
import {
  InputOnChangeData,
  SearchBoxChangeEvent,
} from "@fluentui/react-components";
import { useEffect, useRef, useState } from "react";

const AutoSuggestion = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sugeestionRes, setSugeestionRes] = useState<any>(null);
  const [isOpenList, setIsOpenList] = useState(true);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const shouldFetch = value?.trim().length > 1;

  const onChange: (
    ev: SearchBoxChangeEvent,
    data: InputOnChangeData
  ) => void = (_, data) => {
    if (data?.value?.length > 0) {
      const trimText = data?.value?.trim();
      if (trimText?.length > 0) {
        setValue(data?.value);
      }
    } else {
      setValue("");
    }
  };

  useEffect(() => {
    const getSuggestions = async () => {
      if (shouldFetch) {
        setLoading(true);
        autoSuggestion({
          params: {
            searchTerm: value?.trim(),
          },
        })
          .then((res) => {
            setSugeestionRes(res);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
          });
      } else {
        setSugeestionRes(null);
        setLoading(false);
      }
    };

    const debounceGetSuggestions = () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(getSuggestions, 300);
    };

    debounceGetSuggestions();

    return () => {
      if (debounceTimerRef?.current) {
        clearTimeout(debounceTimerRef?.current);
      }
    };
  }, [value]);

  useClickOutside(searchRef, () => setIsOpenList(false));
  return (
    <div className="relative flex justify-center items-center" ref={searchRef}>
      <TypeAhead
        onChange={onChange}
        value={value}
        onFocus={() => setIsOpenList(true)}
      />
      {shouldFetch && isOpenList ? (
        <div className="absolute w-full top-full z-10 shadow-2xl py-2 px-1 backdrop-blur-lg bg-slate-100 border">
          <VirtualList loading={loading} dishes={sugeestionRes?.data} />
        </div>
      ) : null}
    </div>
  );
};

export default AutoSuggestion;
