import Image from "next/image";
import Link from "next/link";

export default function HomePageComponent() {
  return (
    <>
      <div className=" bg-primary-50 h-screen">
        <Image src="/logowhite.png" width={300} height={150} className=" pointer-events-none h-auto lg:pl-10 lg:pr-10 pt-5" priority />
        <div className="grid grid-cols-2 px-20 items-center">
          <div className="text-primary-150">
            <p className="text-2xl font-bold">Welcome To Karipili.</p>
            <div className="pt-8 pb-10">
              <p className="w-[450px]">
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
          <Image src="/bghome.png" width={500} height={500} className="h-auto object-cover" priority />
        </div>
      </div>
    </>
  );
}
