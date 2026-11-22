# Boilerplate AI Dev

Template de orquestração com nove papéis em `subagents/`, na raiz do projeto. Todos os provedores usam esse diretório por meio de `AGENTS.md` e `AGENTS-ORQUESTRACAO.md`.

## Inicializar um projeto

Com Node.js e npm disponíveis, execute a partir deste repositório.

```sh
npm run agents:init -- ../meu-projeto --providers claude grok cursor
```

Omita `--providers` para incluir toda a configuração. As opções são `codex`, `claude`, `grok`, `cursor`, `gemini` e `copilot`. Claude Code e Gemini CLI leem `AGENTS.md` pelos respectivos arquivos de entrada na raiz. Codex também recebe `.codex/config.toml` com as configurações de orquestração. Grok Build, Cursor e GitHub Copilot CLI leem `AGENTS.md` diretamente.

O comando cria o diretório quando necessário. Se um arquivo existente tiver conteúdo diferente, ele informa o conflito antes de escrever. Repetir uma instalação com os mesmos arquivos é seguro. Execute `npm run agents:help` para consultar as opções.

## Usar e manter os papéis

Peça ao assistente para delegar uma tarefa seguindo um papel, por exemplo, “Use `subagents/qa.md` para executar a suíte de testes existente”. O cliente usa seu próprio mecanismo de delegação e passa o caminho ao subagente. A descoberta dos papéis é feita pelas instruções compartilhadas.

Edite os arquivos em `subagents/` diretamente. Ao adicionar ou renomear um papel, atualize também a tabela em `AGENTS-ORQUESTRACAO.md`.
