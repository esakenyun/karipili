import { useEffect } from "react";
import { IoAlertCircleSharp } from "react-icons/io5";

export default function LogoutModal({ props }) {
  const isLoading = props.isLoading;
  const isOpen = props.isOpen;
  const onClose = props.onClose;

  const onClickLogout = props.onClickLogout;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 lg:w-2/6 rounded-lg modal-content">
        <div className="flex items-center gap-2">
          <IoAlertCircleSharp className="text-warm-200 text-7xl" />
          <div className="pt-5">
            <p className="font-bold text-lg text-primary-100">Logging Out</p>
            <p className="text-sm md:text-sm text-primary-100 pt-2">Are you sure you want to log out?</p>
          </div>
        </div>
        <div className="flex justify-end mt-7">
          <button onClick={onClose} className="px-6 py-1 mr-2 bg-secondary-50 text-secondary-100 rounded-xl border-secondary-150 border-[1px] font-bold">
            Cancel
          </button>
          <button onClick={onClickLogout} className="px-10 py-1 bg-primary-200 text-white rounded-xl border-secondary-150 border-[1px] font-bold">
            {isLoading ? "Loading..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
