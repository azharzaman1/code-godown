import { Popover } from "@headlessui/react";
import Button from "../Generic/Button";
import Heading from "../Generic/Heading";
import ThemeText from "../Generic/Text";

export default function Hero() {
  return (
    <div className="relative bg-backgroundV1 dark:bg-backgroundV1Dark overflow-hidden md: lg:py-20 xl:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-0 lg:z-10 py-8 lg:py-12 xl:py-16 lg:max-w-2xl lg:w-full bg-white shadow-sm">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 transform translate-x-1/2 text-white"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="py-2 lg:py-4 xl:py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center lg:text-left">
              <Heading type="primary">
                <span
                  className="block xl:inline"
                  data-testid="hero-main-heading"
                >
                  Save. Edit. Share.
                </span>{" "}
                <span className="block text-primary xl:inline">
                  your code snippets
                </span>
              </Heading>
              <ThemeText className="mt-3 font-sans sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </ThemeText>
              <div className="mt-5 md:mt-8 lg:mt-10 flex items-center justify-center lg:justify-start space-x-3">
                <div className="flex flex-wrap space-x-3 items-center justify-evenly">
                  <Button className="mt-2" size="lg">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
