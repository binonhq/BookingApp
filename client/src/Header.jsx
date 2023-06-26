import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const userInfo = useContext(UserContext);
  // console.log(userInfo);

  return (
    <header className="flex justify-between">
      <Link
        to={"/"}
        className="flex items-center gap-1 text-primary md:pl-2 lg:pl-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
        <span className="font-bold text-2xl text-primary">HustBooking</span>
      </Link>
      <div className="pr-5">
        {!userInfo.user ? (
          <div className="flex items-centers gap-2">
            <Link
              to={"/register"}
              className="font-semibold text-primary px-7 py-2 border border-primary rounded-3xl "
            >
              Sign up
            </Link>
            <Link
              to={"/login"}
              className="font-semibold text-white px-7 py-2 border border-primary rounded-3xl bg-primary"
            >
              Log in
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to={"/account/profile"}
              className="flex gap-2 text-lg items-center"
            >
              <h1 className="font-semibold text-primary">
                {userInfo.user["email"]}
              </h1>
              <span className="material-symbols-outlined text-3xl text-primary">
                account_circle
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
