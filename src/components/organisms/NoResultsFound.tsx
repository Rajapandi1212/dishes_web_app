import Link from "next/link";
import { SubTitle } from "../atoms/Text";
import { Button } from "../atoms/Button";

const NoResultsFound = () => {
  return (
    <div className="flex w-full h-24 flex-col gap-3 justify-center items-center">
      <SubTitle>No Results Found!</SubTitle>
      <Link href="/">
        <Button>RESET</Button>
      </Link>
    </div>
  );
};

export default NoResultsFound;
