import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarItem = ({ href, text, icon: Icon, onItemClick }) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <div
        className={`pl-6 py-3 px-6 rounded text-center cursor-pointer mb-16 flex items-center transition-colors ${
          pathname === href ? "bg-primary-200 font-bold rounded-md text-primary-150" : "text-secondary-150 hover:bg-primary-200 hover:rounded-md hover:text-primary-150"
        } `}
        onClick={onItemClick}>
        <div className="mr-2">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
};
