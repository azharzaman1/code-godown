import { Popover } from "@headlessui/react";
import { Send } from "@mui/icons-material";
import ThemeButton from "../Generic/Button";
import ThemeHeading from "../Generic/Heading";
import ThemeText from "../Generic/Text";

export default function Hero() {
  return (
    <div className="relative bg-backgroundV1 overflow-hidden py-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
          </Popover>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <ThemeHeading type="primary">
                <span
                  className="block xl:inline"
                  data-testid="hero-main-heading"
                >
                  Save. Edit. Share.
                </span>{" "}
                <span className="block color-primary-dark xl:inline">
                  your code snippets
                </span>
              </ThemeHeading>
              <ThemeText className="mt-3 font-sans sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </ThemeText>
              <div className="mt-10 sm:mt-8 md:mt-12 lg:mt-14 flex items-center justify-center lg:justify-start space-x-3">
                <div className="flex flex-wrap space-x-3 items-center justify-evenly">
                  <ThemeButton className="mt-2">Primary Button</ThemeButton>
                  <ThemeButton className="mt-2" type="text">
                    Text Button
                  </ThemeButton>
                  <ThemeButton className="mt-2" type="secondary">
                    Secondary Button
                  </ThemeButton>
                  <ThemeButton
                    className="mt-2"
                    type="icon"
                    afterIcon={<Send />}
                  >
                    Icon Button
                  </ThemeButton>
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
