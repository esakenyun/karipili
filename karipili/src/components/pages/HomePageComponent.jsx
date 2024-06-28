import Image from "next/image";
import Link from "next/link";

export default function HomePageComponent() {
  return (
    <>
      {/* Dekstop Mode */}
      <div className=" bg-primary-50 min-h-screen">
        <Image src="/logowhite.png" width={300} height={150} className=" pointer-events-none h-auto lg:pl-10 lg:pr-10 pt-5" priority />
        <div className="grid lg:grid-cols-2 px-10 lg:px-20 items-center">
          <div className="text-primary-150">
            <p className="text-2xl font-bold">Welcome To Karipili.</p>
            <div className="pt-8 pb-10">
              <p className="lg:w-[450px]">
                Prepare to dive into the realm of Information Technology with Karipili, your ultimate career recommendation system. Unlock tailored career paths and explore a world of opportunities perfectly matched to your skills and
                aspirations. Let Karipili be your compass as you navigate the dynamic landscape of IT professions worldwide
              </p>
            </div>
            <div className="lg:pl-24">
              <Link href="/auth">
                <button className="py-3 px-16 bg-warm-300 rounded-2xl border font-bold border-secondary-50 hover:scale-105">Start Now</button>
              </Link>
            </div>
          </div>
          <Image src="/bghome.png" width={500} height={500} className="h-auto hidden lg:block object-cover" priority />
        </div>
      </div>
      {/* Mobile Mode */}
      {/* <div className="bg-primary-50 lg:hidden min-h-screen">
        <Image src="/logowhite.png" width={200} height={150} className=" pointer-events-none h-auto pt-5" priority />
        <div className="px-5">
          <div className="text-primary-150">
            <p className="text-2xl font-bold">Welcome To Karipili.</p>
            <div className="pt-8 pb-10">
              <p className="">
                Prepare to dive into the realm of Information Technology with Karipili, your ultimate career recommendation system. Unlock tailored career paths and explore a world of opportunities perfectly matched to your skills and
                aspirations. Let Karipili be your compass as you navigate the dynamic landscape of IT professions worldwide
              </p>
            </div>
            <div className="pl-24">
              <Link href="/auth">
                <button className="py-3 px-16 bg-warm-300 rounded-2xl border font-bold border-secondary-50 hover:scale-105">Start Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
