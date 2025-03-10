import Link from "next/link";

export function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto p-4 flex justify-between">
        <Link href="/">
          <span className="font-bold text-2xl">doaê</span>
        </Link>
        <div className="space-x-4 flex items-center">
          <a href="/sobre" className="hover:underline">
            Sobre
          </a>
          <Link href="/campanhas/nova" className="hover:underline">
            Nova campanha
          </Link>
          <a href="/auth/login" className="hover:underline">
            Logar
          </a>
          <a href="/auth/cadastrar" className="hover:underline">
            Cadastrar
          </a>
        </div>
      </nav>
    </header>
  );
}
