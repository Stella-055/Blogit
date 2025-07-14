import useUser from "../stores/userStore";
const Hero = () => {
  const { user } = useUser();

  return (
    <div>
      <section
        style={{ height: "100vh" }}
        className="bg-white lg:grid lg:h-screen lg:place-content-center  flex items-center"
      >
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Come Manage Your Blogs
              <strong className="text-blue-500"> with BlogIt </strong>
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
              nisi. Natus, provident accusamus impedit minima harum corporis
              iusto.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <a
                className="inline-block rounded border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                href={user ? `/dashboard/${user?.id}/Blogs ` : "/signin"}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
