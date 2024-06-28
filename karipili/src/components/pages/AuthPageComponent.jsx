import Image from "next/image";
import Link from "next/link";

export default function AuthPageComponent() {
  return (
    <>
      <Image src="/logowhite.png" width={300} height={150} className="absolute pointer-events-none h-auto lg:pl-10 lg:pr-10 pt-5" priority />
      <div className="grid lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="bg-primary-50 h-screen flex">
            <div className="flex items-center lg:pl-20 text-primary-150">
              <div>
                <p className="font-bold text-2xl">Discover your future career here.</p>
                <p className="text-2xl w-[450px]">Let Karipili guide you to the perfect job in the ever-evolving world of Information Technology.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-primary-150 min-h-screen">
          <div>
            <p className="text-2xl font-bold text-primary-100 text-center mb-4">Get Started Now</p>
            <div className="flex gap-5 text-primary-150 mb-8">
              <Link href="/auth/signin">
                <button className="py-3 px-10 lg:px-20 bg-primary-200 font-semibold rounded-2xl border border-secondary-200 hover:scale-105">Sign In</button>
              </Link>
              <Link href="/auth/signup">
                <button className="py-3 px-10 lg:px-20 bg-primary-200 font-semibold rounded-2xl border border-secondary-200 hover:scale-105">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
