import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="justify-center items-center h-full mr-20 relative w-full">
      <div className="bg-gray-200 w-full h-full relative text-black">
        <Image
          src="/Logo.png"
          alt="SwiftGo-Logo"
          width={150}
          height={150}
          className="ml-5 pt-2"
        />
        <div className="flex flex-col justify-center items-center mt-[40%] md:mt-[40%] lg:mt-[15%] text-center">
          <h1 className="text-4xl font-semibold">
            🛒 Ready to elevate your shopping experience? Sign up or log in now.
            Your personalized retail journey starts here.
          </h1>
          <h2 className="text-lg mt-5">
            🚀 Swift Go: Elevate Your Everyday - Your Ultimate Destination for
            Daily Essentials! 🚀
          </h2>
          <p className="font-bold mt-5 underline">
            <a href="#formContainer">Scroll Down To get started</a>
          </p>
        </div>
      </div>
      <div
        className="flex justify-center items-center pb-10 bg-gray-200"
        id="formContainer"
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
