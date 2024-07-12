import { BiSearch } from "react-icons/bi";
import { MdWorkOutline, MdOutlineMap } from "react-icons/md";
import WaveAnimation from "../animation/WaveAnimation";

export default function DashboardPageComponent() {
  return (
    <>
      <div>
        {/* <div className="p-2 w-fit text-2xl font-bold text-primary-50 border-b-2 border-primary-50 ">
          <WaveAnimation title="Dashboard" />
        </div> */}

        <div className="pt-16">
          <h1 className="text-xl sm:text-3xl font-bold text-primary-50"> 
            <WaveAnimation title="Welcome to Karipili, "/>
            <br />
             <span className="text-base sm:text-lg text-secondary-150">
              <WaveAnimation title="get your experience to find job recommendations across the continent."/>
             </span>
          </h1>
          <div className="pt-16">
            <h2 className="text-md sm:text-lg italic">
              <WaveAnimation title="Please press try it on the sidebar to use the job recommendation." /></h2>
          </div>
        </div>
{/* 
        <div className="pt-10 flex flex-col w-fit gap-10 lg:gap-20 lg:flex-row">
      
          <div className="bg-primary-150 shadow-2xl rounded-2xl">
            <div className="flex-col">
              <div className="py-3 flex gap-2 items-center px-3 border-b-2 border-secondary-100 pr-40">
                <BiSearch className="text-xl" />
                <p className="text-primary-100">Search Count</p>
              </div>
              <div className="py-10 text-center font-bold text-5xl">100</div>
            </div>
          </div>
         
          <div className="bg-primary-150 shadow-2xl rounded-2xl">
            <div className="flex-col">
              <div className="py-3 flex gap-2 items-center px-3 border-b-2 border-secondary-100 pr-32">
                <MdWorkOutline className="text-xl" />
                <p className="text-primary-100">Total Job Available</p>
              </div>
              <div className="py-10 text-center font-bold text-5xl">100</div>
            </div>
          </div>
        </div> */}

        {/* <div className="pt-14">
          <div className="bg-primary-150 shadow-2xl rounded-2xl w-fit">
            <div className="flex-col">
              <div className="py-3 flex gap-2 items-center px-3 border-b-2 border-secondary-100 pr-9">
                <MdOutlineMap className="text-xl" />
                <p className="text-primary-100">The number of jobs by region</p>
              </div>
              <div className="py-3 flex flex-col items-center gap-3">
          
                <div className="bg-primary-50 rounded-xl py-2 px-2 text-primary-150 text-sm pr-32">1. Asia 84 Jobs</div>
                <div className="bg-primary-50 rounded-xl py-2 px-2 text-primary-150 text-sm pr-24">2. America 76 Jobs</div>
                <div className="bg-primary-50 rounded-xl py-2 px-2 text-primary-150 text-sm pr-28">3. Europe 81 Jobs</div>
                <div className="bg-primary-50 rounded-xl py-2 px-2 text-primary-150 text-sm pr-24">4. Australia 99 Jobs</div>
              </div>
            </div>
          </div>
        </div> */}
        
      </div>
    </>
  );
}
