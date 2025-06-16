# RPE-Frontend

## Descrição
Breve descrição do projeto RPE-Frontend.

## Tecnologias Utilizadas
- React
- TypeScript
- Vite
- ESLint
- Outras dependências relevantes

## Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd RPE-Frontend

# Instale as dependências
pnpm install
```

## Como rodar o projeto
```bash
pnpm dev
```

## Padrão de Commits

Este projeto utiliza o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/), validado automaticamente pelo [commitlint](https://github.com/conventional-changelog/commitlint).

antes de começar execute
```
pnpm prepare
```
para ativar a configuração do husky

obs.: caso queira um passo a passo detalhado de como fazer um commit dentro do padrão, basta executar:
```
pnpm commit
```
e seguir o guia (irá fazer um commit automatico no fim)

### Estrutura do commit

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé(s) opcional(is)]
```

### Tipos aceitos
- **feat**: Adiciona nova funcionalidade
- **fix**: Corrige um bug
- **docs**: Mudanças na documentação
- **style**: Formatação, sem alteração de código (espaços, ponto e vírgula, etc)
- **refactor**: Refatoração de código, sem adicionar funcionalidade ou corrigir bug
- **perf**: Melhora de performance
- **test**: Adiciona ou corrige testes
- **build**: Mudanças que afetam o sistema de build ou dependências externas
- **ci**: Mudanças em arquivos de configuração de integração contínua
- **chore**: Outras mudanças que não modificam src ou arquivos de teste
- **revert**: Reverte um commit anterior

### Exemplos
```
feat: adicionar endpoint de autenticação
fix(usuario): corrigir validação de email
chore: atualizar dependências
refactor(auth): simplificar lógica de login
```

### Mudanças que quebram compatibilidade
Inclua `!` após o tipo ou escopo, ou adicione um rodapé `BREAKING CHANGE:`.

```
feat!: alterar formato de resposta da API

BREAKING CHANGE: O campo 'id' agora é obrigatório.
```

Commits fora desse padrão serão rejeitados.

## Licença
Este projeto está licenciado sob a licença MIT.
