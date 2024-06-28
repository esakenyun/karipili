"use client";
import Sidebar from "@/components/navigation/Sidebar";
import Topbar from "@/components/navigation/Topbar";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize() {
    if (window.innerWidth <= 1000) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  return (
    <>
      <div className="bg-secondary-50 min-h-screen" id="dashboard">
        <Topbar showNav={showNav} setShowNav={setShowNav} />
        <Transition
          as={Fragment}
          show={showNav}
          enter="transform transition duration-[400ms]"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-[400ms] transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full">
          <Sidebar showNav={showNav} setShowNav={setShowNav} />
        </Transition>
        <main className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-56" : ""}`}>
          <div className="px-4 md:px-16">{children}</div>
          {/* <SpeedInsights /> */}
        </main>
      </div>
    </>
  );
}
