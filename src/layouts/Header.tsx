import Button from "../components/Button";

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between py-2">
          <div className="flex items-center">
            <div className="ml-10 hidden space-x-8 lg:block">
              {/* {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50">
                  {link.name}
                </a>
              ))} */}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Button size="lg">Log Out</Button>
            {/* <a
              href="#"
              className="inline-block rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-opacity-75">
              Sign in
            </a>
            <a
              href="#"
              className="inline-block rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50">
              Sign up
            </a> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
