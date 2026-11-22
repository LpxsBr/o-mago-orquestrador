# O Mago Orquestrador

Template de orquestração com nove papéis em `subagents/`, na raiz do projeto. Todos os provedores usam esse diretório por meio de `AGENTS.md` e `AGENTS-ORQUESTRACAO.md`.


![tmo](/assets/img/tmo.png)

## Instalar em um projeto existente

Na raiz do projeto de destino, execute com Node.js, npm e Git disponíveis.

```sh
npm exec --yes --package=git+https://github.com/LpxsBr/o-mago-orquestrador.git -- o-mago-orquestrador init .
```

O npm executa o instalador do repositório sem adicionar dependências ao projeto. Use `init . --providers claude grok cursor` para selecionar provedores. Se já existir um arquivo Markdown como `AGENTS.md`, o instalador preserva o conteúdo e acrescenta as instruções do template em um bloco identificado. Reinstalações preservam o bloco existente.

## Instalar a partir de um clone local

Com Node.js e npm disponíveis, execute a partir deste repositório.

```sh
npm run agents:init -- ../meu-projeto --providers claude grok cursor
```

Omita `--providers` para incluir toda a configuração. As opções são `codex`, `claude`, `grok`, `cursor`, `gemini` e `copilot`. Claude Code e Gemini CLI leem `AGENTS.md` pelos respectivos arquivos de entrada na raiz. Codex também recebe `.codex/config.toml` com as configurações de orquestração. Grok Build, Cursor e GitHub Copilot CLI leem `AGENTS.md` diretamente.

O comando cria o diretório quando necessário. Se o projeto tiver um `.codex/config.toml` diferente do template, o instalador informa o conflito antes de escrever. Execute `npm run agents:help` para consultar as opções.

## Usar e manter os papéis

O agente principal segue a orquestração em toda tarefa. Ele analisa o pedido, seleciona os papéis pertinentes e aciona pelo menos um subagente quando a delegação está disponível e autorizada. As instruções compartilhadas indicam os papéis e o cliente fornece o mecanismo de delegação.

Edite os arquivos em `subagents/` diretamente. Ao adicionar ou renomear um papel, atualize também a tabela em `AGENTS-ORQUESTRACAO.md`.
