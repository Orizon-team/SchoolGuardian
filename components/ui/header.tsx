import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primaryOri">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-secondaryOri text-lg-ori font-bold">
            SCHOOL GUARDIAN
          </h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/login">
                <button className="px-10 py-3.5 text-sm-ori font-bold text-secondaryOri transition hover:text-greyOri-300">
                  Iniciar Sesión
                </button>
              </Link>
            </li>
            <li>
              <Link href="/sign-up">
                <button className="flex items-center gap-x-2 border-2 border-secondaryOri text-sm-ori text-secondaryOri font-bold rounded-lg py-3.5 px-10 hover:bg-greyOri-300 hover:border-greyOri-300 hover:text-primaryOri">
                  Registrarse
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
