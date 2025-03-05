# 🧡 doaê

doaê é uma plataforma web criada para facilitar a arrecadação de doações para campanhas sociais. Simples, transparente e direto ao ponto, o doaê conecta pessoas dispostas a ajudar com causas que precisam de apoio.

---

## 💡 Funcionalidades

✅ Criação de campanhas (apenas por administradores)  
✅ Listagem pública de campanhas ativas  
✅ Doações (apenas por usuários cadastrados)  
✅ Transparência total: valor arrecadado e número de doadores visíveis  
✅ Histórico de doações para cada usuário  

---

## ⚙️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| **Frontend** | Next.js (App Router) + TypeScript + Tailwind CSS |
| **Backend** | Fastify + Prisma + PostgreSQL + TypeScript |
| **Infra** | Podman + Podman Compose |

---

## 📦 Estrutura do Repositório (Monorepo)

```
/
├── backend (Fastify + Prisma)
├── frontend (Next.js)
├── podman-compose.yml
├── README.md
```

---

## 🔗 Fluxo básico
1. Administradores criam campanhas com título, descrição, meta e prazo.
2. Qualquer pessoa pode visualizar campanhas públicas.
3. Usuários cadastrados podem doar via PIX (simulado inicialmente).
4. A campanha mostra o progresso (valor arrecadado e número de doadores).
5. Cada usuário tem seu histórico de doações visível no perfil.

---

## 🚀 Como rodar o projeto (em desenvolvimento)

### Pré-requisitos
- Node.js 20+
- Podman ou Docker (caso prefira)
- Yarn ou npm

### Passo a passo
```bash
# Clonar o repositório
git clone <url-do-repo>

# Subir ambiente completo com Podman
podman-compose up --build

# Backend roda em http://localhost:3001
# Frontend roda em http://localhost:3000
```

---

## 🚀 Como rodar os serviços

| Comando            | O que faz |
|--------------------|---------------------|
| `make up`          | Sobe os containers (backend, frontend e banco) |
| `make down`        | Derruba todos os containers |
| `make logs`        | Mostra os logs em tempo real |
| `make ps`          | Lista os containers ativos |
| `make migrate`     | Executa as migrations do Prisma no backend |
| `make seed`        | Executa o script de seed do Prisma (se configurado) |
| `make clean-volumes` | Apaga os dados persistidos do PostgreSQL |
| `make reset`       | Faz um reset completo (down + clean-volumes + up) |
| `make init`        | Roda migrations e seed (ideal após subir o ambiente) |

---

## 📄 Licença
Esse projeto é open-source e pode ser usado conforme a licença [MIT](LICENSE).

---

Feito com 💛 para ajudar quem precisa.
