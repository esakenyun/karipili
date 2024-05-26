import Image from "next/image";
import Link from "next/link";

export default function SignInPageComponent() {
  return (
    <>
      <Image src="/logoblack.png" width={300} height={150} className="absolute pointer-events-none h-auto lg:pl-10 lg:pr-10 pt-5" priority />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-secondary-50 shadow-2xl px-6 py-9 rounded-[35px]">
          <div className="flex justify-center items-center gap-32">
            <div className="ml-14">
              <p className="font-bold text-3xl text-warm-250">Sign In</p>
              <p className="font-medium py-4 text-warm-250 text-sm">If you are already a member, easily log in</p>
              <form action="#" className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="w-full p-2 border text-sm border-secondary-100 rounded-xl" />
                <input type="password" placeholder="Password" className="w-full p-2 border border-secondary-100 rounded-xl" />
                <button className="py-2 font-semibold bg-warm-250 text-primary-150 rounded-xl border border-secondary-100 hover:scale-105 active:bg-warm-300">Sign In</button>
              </form>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs">Dont have an account ?</p>
                <Link href="/auth/signup">
                  <button className="text-xs bg-primary-150 rounded-xl py-2 px-6 border border-secondary-100 hover:scale-105">Register</button>
                </Link>
              </div>
            </div>
            <Image src="/bgauth.png" width={300} height={150} priority />
          </div>
        </div>
      </div>
    </>
  );
}
