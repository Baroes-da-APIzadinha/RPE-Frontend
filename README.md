# RPE-Frontend

## 📋 Descrição
Frontend do projeto RPE desenvolvido com React, TypeScript e Vite. Este projeto utiliza as melhores práticas de desenvolvimento moderno com configurações otimizadas para performance e qualidade de código.

## 🚀 Tecnologias Utilizadas

### Core
- **React 19.1.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.8.3** - Superset do JavaScript com tipagem estática
- **Vite 6.3.5** - Build tool e dev server de alta performance

### Desenvolvimento e Qualidade
- **ESLint 9.25.0** - Linter para identificar e corrigir problemas no código
- **TypeScript ESLint 8.30.1** - Regras específicas do TypeScript para ESLint
- **React Hooks ESLint Plugin** - Regras para hooks do React
- **React Refresh ESLint Plugin** - Suporte ao Fast Refresh

### Git Hooks e Padrões de Commit
- **Husky 9.1.7** - Git hooks para automatizar tarefas (configurado automaticamente via `prepare` script)
- **Commitizen 4.3.1** - Interface interativa para commits padronizados
- **Commitlint 19.8.1** - Validação de mensagens de commit
- **Conventional Changelog** - Padrão de commits convencionais

## 📦 Pré-requisitos
- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes recomendado)

> **Nota:** O projeto utiliza pnpm como gerenciador de pacotes principal. Se você não tiver o pnpm instalado, pode instalá-lo com: `npm install -g pnpm`

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/RPE-Frontend.git
cd RPE-Frontend

# Instale as dependências
pnpm install
```

## 🏃‍♂️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Compila o projeto para produção |
| `pnpm preview` | Visualiza a build de produção localmente |
| `pnpm lint` | Executa o linter para verificar o código |
| `pnpm commit` | Abre interface interativa para commits |

## 🚀 Como Executar

### Desenvolvimento
```bash
pnpm dev
```
O projeto estará disponível em `http://localhost:5173`

### Produção
```bash
pnpm build
pnpm preview
```

### Linting
```bash
pnpm lint
```

## ⚙️ Configurações de Ambiente

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto para configurações locais:

```bash
# Exemplo de variáveis de ambiente
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=RPE Frontend
```

> **Nota:** Todas as variáveis de ambiente devem começar com `VITE_` para serem acessíveis no código frontend.

## 📝 Padrões de Commit

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).

### Estrutura da Mensagem
```
<tipo>(escopo opcional): descrição breve

[corpo do commit]

[rodapé opcional]
```

### Tipos de Commit
| Tipo | Descrição |
|------|-----------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Formatação, sem alteração de código |
| `refactor` | Refatoração de código |
| `test` | Adição ou modificação de testes |
| `chore` | Tarefas de build ou manutenção |
| `perf` | Melhorias de performance |
| `ci` | Mudanças em CI/CD |
| `build` | Mudanças no sistema de build |

### Exemplos
```bash
feat: adicionar tela de login
fix(auth): corrigir validação de token
docs: atualizar README com novas instruções
refactor(components): simplificar lógica do formulário
```

### Como Fazer Commits
```bash
# Usando commitizen (recomendado)
pnpm commit

# Ou usando git commit diretamente (será validado pelo commitlint)
git commit -m "feat: adicionar nova funcionalidade"
```

## 🏗️ Estrutura do Projeto

```
RPE-Frontend/
├── public/                 # Arquivos estáticos
├── src/                    # Código fonte
│   ├── assets/            # Recursos (imagens, ícones)
│   ├── components/        # Componentes React
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── .eslintrc.js          # Configuração do ESLint
├── commitlint.config.cjs # Configuração do Commitlint
├── tsconfig.json         # Configuração do TypeScript
├── vite.config.ts        # Configuração do Vite
├── pnpm-workspace.yaml   # Configuração do workspace pnpm
└── package.json          # Dependências e scripts
```

## 🔧 Configurações

### TypeScript
- Configuração modular com referências de projeto
- Suporte completo a React e JSX
- Verificação estrita de tipos

### ESLint
- Regras recomendadas para React e TypeScript
- Plugins para hooks e refresh
- Configuração otimizada para desenvolvimento

### Vite
- Build tool de alta performance
- Hot Module Replacement (HMR)
- Otimizações automáticas para produção

### pnpm Workspace
- Configuração de monorepo para gerenciamento de múltiplos pacotes
- Otimização de instalação e cache de dependências

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`pnpm commit`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Procure por issues existentes
3. Crie uma nova issue com detalhes do problema

---

**Desenvolvido com ❤️ usando React, TypeScript e Vite**
