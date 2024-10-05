import CustomTable from "@/components/organisms/CustomTable";
import { listDishes } from "@/helpers/apiCalls";
import { ApiResponse, Dish, DishFilterParams } from "@/types";

type PageProps = {
  searchParams: DishFilterParams;
};

export default async function Home({ searchParams }: PageProps) {
  const res: ApiResponse<Dish[]> = await listDishes({ params: searchParams });
  return <CustomTable tableData={res} />;
}
