import Capitalize, { Header, SubTitle } from "@/components/atoms/Text";
import { convertToMins } from "@/helpers/common";
import { Dish } from "@/types";
import Image from "next/image";
import { FC } from "react";

const DishConatiner = ({ dish }: { dish: Dish }) => {
  const {
    diet,
    ingredient_names,
    name,
    cook_time,
    course,
    diet_label,
    flavor,
    prep_time,
    region,
    state,
  } = dish;
  return (
    <div className="relative w-full h-full bg-clip-padding bg-primary-light mx-2 p-2 sm:p-4 lg:p-8 sm:mx-8 md:mx-10 lg:mx-20  backdrop-blur-md shadow-[0_8px_16px_0_rgba(_31,38,135,0.37_)] rounded-xl border-primary border">
      <div className="flex gap-2 justify-center mb-4 items-baseline">
        <span
          className={`${
            diet ? "bg-green-700" : "bg-red-700"
          } rounded-full h-6 w-6`}
        ></span>
        <Header
          className={`${diet ? "text-green-700" : "text-red-700"}  text-center`}
        >
          {name}
        </Header>
      </div>
      <div className="flex flex-col gap-3 justify-start">
        <SubTitle>Ingredients :</SubTitle>
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
          {ingredient_names?.map((ingredient, i) => (
            <Capitalize
              key={"ingredient" + ingredient + i}
              className="text-base"
            >
              {ingredient}
            </Capitalize>
          ))}
        </div>
        <InfoSection label="Diet" value={diet_label || ""} />
        <InfoSection label="Flavor" value={flavor || ""} />
        <InfoSection label="Course" value={course || ""} />
        <InfoSection label="Cook Time" value={cook_time || 0} />
        <InfoSection label="Preparation Time" value={prep_time || 0} />
        <InfoSection label="State" value={state || ""} />
        <InfoSection label="Region" value={region || ""} />
      </div>
      <Image
        src="/images/cooking.svg"
        alt="Dishes Baackground"
        width={300}
        height={300}
        className="hidden md:block opcaity-70 mix-blend-darken absolute right-4 bottom-8"
      />
    </div>
  );
};

export default DishConatiner;

const InfoSection: FC<{
  label: string;
  value: string | number | undefined;
}> = ({ label, value }) => {
  return (
    <div>
      <SubTitle>{`${label} : `}</SubTitle>
      <span className="capitalize text-base">{convertToMins(value)}</span>
    </div>
  );
};
