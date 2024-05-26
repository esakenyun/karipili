export default function SettingsPageComponent() {
  return (
    <>
      <div>
        <p className="p-2 w-fit text-2xl font-bold text-primary-50 border-b-2 border-primary-50 ">Settings</p>
        <div className="pt-14 flex flex-col w-fit gap-10 lg:gap-36 lg:flex-row">
          {/* Profile Section */}
          <div>
            <p className="w-fit text-xl font-bold text-primary-50 border-b-2 border-primary-50 ">Profile</p>
            <div className="pt-10">
              <p className="text-primary-50 font-light text-lg">Change Password</p>
              <form className="flex flex-col gap-6 mt-3">
                <input
                  type="password"
                  name="oldpassword"
                  placeholder="Old Password"
                  className="py-2 pl-4 pr-32 rounded-lg text-sm border-2 border-secondary-150  focus:outline-none placeholder:text-xs placeholder:font-bold placeholder:text-secondary-150"
                />
                <input type="password" placeholder="New Password" className="py-2 pl-4 pr-32 rounded-lg text-sm border-2 border-secondary-150  focus:outline-none placeholder:text-xs placeholder:font-bold placeholder:text-secondary-150" />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="py-2 pl-4 pr-32 rounded-lg text-sm border-2 border-secondary-150  focus:outline-none placeholder:text-xs placeholder:font-bold placeholder:text-secondary-150"
                />
                <div className="flex gap-5">
                  <button className="w-full py-2 bg-secondary-100 rounded-md text-sm font-semibold text-secondary-150 border-2 border-secondary-150 hover:scale-105">Cancel</button>
                  <button className="w-full py-2 bg-primary-200 rounded-md text-sm font-semibold text-primary-150 border-2 border-secondary-150 hover:scale-105">Confirm</button>
                </div>
              </form>
            </div>
          </div>
          {/* Auth Section */}
          <div>
            <p className="w-fit text-xl font-bold text-primary-50 border-b-2 border-primary-50 ">Auth</p>
            <div className="pt-10">
              <button className="py-1 px-20 text-sm text-primary-150 bg-warm-150 border-2 border-secondary-150 rounded-lg font-semibold hover:scale-105">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
