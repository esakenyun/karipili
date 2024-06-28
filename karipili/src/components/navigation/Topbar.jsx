import { FiMenu } from "react-icons/fi";
export default function Topbar({ showNav, setShowNav }) {
  return (
    <div className={`fixed w-full h-16 flex justify-between items-center bg-primary-50 z-30 transition-all duration-[400ms] ${showNav ? "pl-56" : ""}`}>
      <div className="pl-4 md:pl-16">
        <FiMenu className={`h-7 w-7 text-primary-150 cursor-pointer ${!showNav ? "block" : "hidden"}`} onClick={() => setShowNav(!showNav)} />
      </div>
    </div>
  );
}
