export function Header() {
  return (
    <header className="bg-primaryOri">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-secondaryOri text-lg-ori font-bold">
          SCHOOL GUARDIAN
        </h1>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <button className="px-10 py-3.5 text-sm-ori font-bold text-secondaryOri transition hover:text-greyOri-300">
                Iniciar Sesión
              </button>
            </li>
            <li>
              <button className="flex items-center gap-x-2 border-2 border-secondaryOri text-sm-ori text-secondaryOri font-bold rounded-lg py-3.5 px-10 hover:bg-greyOri-300 hover:border-greyOri-300 hover:text-primaryOri">
                Registrarse
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}