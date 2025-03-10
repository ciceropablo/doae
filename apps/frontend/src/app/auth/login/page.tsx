// export default function LoginPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Entrar no doaê</h1>
//       <form className="space-y-4">
//         <input
//           type="email"
//           placeholder="E-mail"
//           className="w-full p-2 border"
//         />
//         <input
//           type="password"
//           placeholder="Senha"
//           className="w-full p-2 border"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 px-4 rounded"
//         >
//           Entrar
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/api/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token); // por enquanto, depois melhoramos para cookies HTTP
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Entrar no Doaê</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
