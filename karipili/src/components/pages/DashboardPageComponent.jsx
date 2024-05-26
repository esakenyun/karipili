import { BiSearch } from "react-icons/bi";
import { MdWorkOutline, MdOutlineMap } from "react-icons/md";

export default function DashboardPageComponent() {
  return (
    <>
      <div>
        <p className="p-2 w-fit text-2xl font-bold text-primary-50 border-b-2 border-primary-50 ">Dashboard</p>
        <div className="pt-14 flex flex-col w-fit gap-10 lg:gap-20 lg:flex-row">
          {/* Card 1 Section */}
          <div className="bg-primary-150 shadow-2xl rounded-2xl">
            <div className="flex-col">
              <div className="py-3 flex gap-2 items-center px-3 border-b-2 border-secondary-100 pr-40">
                <BiSearch className="text-xl" />
                <p className="text-primary-100">Search Count</p>
              </div>
              <div className="py-10 text-center font-bold text-5xl">100</div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-primary-150 shadow-2xl rounded-2xl">
            <div className="flex-col">
              <div className="py-3 flex gap-2 items-center px-3 border-b-2 border-secondary-100 pr-32">
                <MdWorkOutline className="text-xl" />
                <p className="text-primary-100">Total Job Available</p>
              </div>
              <div className="py-10 text-center font-bold text-5xl">100</div>
            </div>
          </div>
        </div>
        <div className="pt-14">
          <div className="bg-primary-150 shadow-2xl rounded-2xl w-fit">
            <div className="flex-col">
              <div className="py-3 flex gap-2 items-center px-3 border-b-2 border-secondary-100 pr-9">
                <MdOutlineMap className="text-xl" />
                <p className="text-primary-100">The number of jobs by region</p>
              </div>
              <div className="py-3 flex flex-col items-center gap-3">
                {/*  Count Job */}
                <div className="bg-primary-50 rounded-xl py-2 px-2 text-primary-150 text-sm pr-32">1. Asia 84 Jobs</div>
                <div className="bg-primary-50 rounded-xl py-2 px-2 text-primary-150 text-sm pr-24">2. America 76 Jobs</div>
                <div className="bg-primary-50 rounded-xl py-2 px-2 text-primary-150 text-sm pr-28">3. Europe 81 Jobs</div>
                <div className="bg-primary-50 rounded-xl py-2 px-2 text-primary-150 text-sm pr-24">4. Australia 99 Jobs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
