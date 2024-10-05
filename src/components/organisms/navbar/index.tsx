import AutoSuggestion from "@/components/molecules/auto_suggestion";
import { Avatar } from "@fluentui/react-components";
import { Food28Regular } from "@fluentui/react-icons";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="grid gap-3 grid-cols-[auto_minmax(200px,1fr)_40px] md:gap-5 md:pl-6 justify-between items-center px-2 py-1 md:py-4 border-b border-b-slate-300 mb-2">
      <Link href="/">
        <div className="hidden md:block font-extrabold text-primary">
          DISHCOVERY
        </div>
        <div className="md:hidden text-4xl font-bold text-primary">D</div>
      </Link>
      <AutoSuggestion />
      <Link href="/suggestions">
        <Avatar
          className="justify-self-center"
          icon={<Food28Regular />}
          color="brand"
          size={40}
          aria-label="Group"
        />
      </Link>
    </div>
  );
};

export default Navbar;
