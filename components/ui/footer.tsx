import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="mt-10 w-full border-t border-greyOri-200 py-4">
      <section className="flex flex-col items-center justify-center md:flex-row md:justify-around mx-auto md:gap-96 w-full">
        <p className="text-greyOri-400 text-sm-ori text-center font-bold antialiased">
          &copy; 2025 ORIZON. Todos los derechos reservados.
        </p>
        <nav className="flex gap-8 sm:justify-center">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="text-black h-6 w-6 hover:text-blue-600 transition-colors" />
          </a>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} className="text-black h-6 w-6 hover:text-blue-400 transition-colors" />
          </a>
          <a href="https://github.com/Orizon-team/SchoolGuardian" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="text-black h-6 w-6 hover:text-greyOri-900 transition-colors" />
          </a>
        </nav>
      </section>
    </footer>
  );
}
