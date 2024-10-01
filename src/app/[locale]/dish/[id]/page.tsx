import DishConatiner from "@/components/organisms/dish";
import { getDish } from "@/helpers/apiCalls";
import Image from "next/image";
import { notFound } from "next/navigation";

const DishPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const dish = await getDish(id);
  if (!dish?.id) {
    notFound();
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-11/12 min-h-[85vh] h-[85vh] relative flex justify-center items-start py-4 md:py-8">
        <Image
          src="/images/dish_bg.jpg"
          alt="Dishes Baackground"
          fill
          className="opacity-70"
        />
        <DishConatiner dish={dish} />
      </div>
    </div>
  );
};

export default DishPage;
