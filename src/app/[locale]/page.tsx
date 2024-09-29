import { Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("homepage");
  return (
    <main>
      {t("title")}
      <Button />
    </main>
  );
}
