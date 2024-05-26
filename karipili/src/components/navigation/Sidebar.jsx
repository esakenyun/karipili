import { forwardRef, useState } from "react";
import Image from "next/image";
import { HiOutlineHome } from "react-icons/hi";
import { BsChatSquareText } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { SidebarItem } from "./SidebarItem";

const Sidebar = forwardRef(({ showNav, setShowNav }, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <div id="sidebar" className={`fixed w-56 h-full bg-primary-100 shadow-sm z-40 transition-all duration-200 ${showNav ? "left-0" : "-left-56"} ${isHover ? "overflow-y-auto" : "overflow-y-hidden"}`} ref={ref}>
      {/* <div className="pt-2 pr-2 flex justify-end items-center text-primary-150">
        <FiMenu className="h-7 w-7 cursor-pointer" onClick={() => setShowNav(!showNav)} />
      </div> */}
      <div className="flex flex-col justify-center items-center pt-36">
        <div className="mb-14">
          <Image src="/logowhite.png" width={250} height={250} alt="Karipili Logo" priority />
        </div>
        <div className="flex flex-col">
          <SidebarItem href="/dashboard" text="Dashboard" icon={HiOutlineHome} onItemClick={() => setIsActive(false)} />
          <SidebarItem href="/dashboard/prompt" text="Prompt" icon={BsChatSquareText} onItemClick={() => setIsActive(false)} />
          <SidebarItem href="/dashboard/settings" text="Settings" icon={IoSettingsSharp} onItemClick={() => setIsActive(false)} />
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
