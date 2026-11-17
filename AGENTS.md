# Engenharia Lean — Orquestração de Agentes

## Objetivo

Entregar software funcionando em pequenos lotes, com qualidade incorporada e o mínimo de coordenação necessário. Este repositório usa Laravel (API), Angular (web) e React Native (mobile). Preserve padrões existentes e prefira a menor mudança que resolve o problema.

## Princípios operacionais

1. Elimine espera, retrabalho, trabalho parcial e funcionalidades especulativas.
2. Resolva bloqueios antes de iniciar trabalho novo.
3. Entregue mudanças pequenas, reversíveis e verificáveis.
4. Construa qualidade, segurança e testes desde o início.
5. Não crie abstrações ou dependências sem necessidade demonstrada.
6. Otimize o fluxo completo, não a ocupação individual.

## Papéis e responsabilidade

Cada demanda tem **um responsável principal**. Ele conduz o escopo, integra os resultados e chama somente os apoios necessários. Apoio técnico não transfere responsabilidade nem inicia mudanças fora da área combinada.

| Papel | Responsabilidade primária | Deve envolver | Entrega para |
|---|---|---|---|
| `product` | problema, prioridade e critérios de aceite | `architect` se houver impacto estrutural | responsável técnico |
| `architect` | mudanças entre módulos, contratos e integrações | especialistas afetados | responsáveis de implementação |
| `backend` | Laravel, API, regra de negócio, autenticação e integrações | `database`, `qa` conforme risco | `frontend`/`mobile`, `qa` |
| `frontend` | Angular, acessibilidade e estado web | `backend`, `qa` | `qa` |
| `mobile` | React Native, Expo e recursos nativos | `backend`, `qa` | `qa` |
| `database` | schema, migrations, integridade, consultas e SQL | `backend` | `backend`, `devops` se necessário |
| `qa` | estratégia de testes, regressão e validação de aceite | especialista que implementou | responsável principal |
| `devops` | CI/CD, ambientes, containers, observabilidade e rollback | `qa`, `architect` conforme risco | responsável principal |

## Roteamento inicial

| Situação | Responsável | Apoio eventual |
|---|---|---|
| Escopo, prioridade ou aceite ambíguo | `product` | `architect` |
| Mudança entre módulos, integração ou decisão estrutural | `architect` | especialista afetado |
| API, regra de negócio, autenticação ou integração | `backend` | `database`, `qa` |
| Tela Angular, acessibilidade ou estado web | `frontend` | `backend`, `qa` |
| App React Native, Expo ou recurso nativo | `mobile` | `backend`, `qa` |
| Schema, migration, consulta, integridade ou desempenho SQL | `database` | `backend` |
| Estratégia de testes, regressão ou fluxo crítico | `qa` | especialista afetado |
| CI/CD, containers, ambientes, deploy ou rollback | `devops` | `qa`, `architect` |

Para correção simples, o responsável executa ponta a ponta. Para API + interface, `backend` fecha primeiro o contrato e `frontend` ou `mobile` o consome. Não acione todos os agentes por padrão e não permita edição concorrente do mesmo arquivo.

## Protocolo de colaboração

1. **Triagem:** confirme objetivo, contexto, critérios de aceite, áreas afetadas e risco. Encaminhe ambiguidade para `product` e mudança multi-módulo para `architect`.
2. **Contrato antes da implementação:** em API + cliente, `backend` e o consumidor concordam sobre endpoint, payloads, erros, autenticação e compatibilidade antes de editar código. Registre o contrato quando não existir fonte canônica.
3. **Propriedade de arquivos:** antes de paralelizar, divida arquivos e fronteiras. Para alterar arquivo em uso, coordene com o proprietário antes de editar.
4. **Validação em fluxo:** quem implementa executa testes locais aplicáveis. `qa` valida aceite e regressão proporcionais ao risco; não duplica teste técnico sem razão.
5. **Encerramento:** o responsável principal confere handoffs, compatibilidade e evidências de validação antes de declarar a tarefa concluída.

### Dependências usuais

```text
product ──> architect (quando necessário) ──> especialistas
                         │
backend ── contrato ──> frontend / mobile ──> qa
    │                         │                 │
    └── database ─────────────┴─────────────────┘
                         │
                      devops (ambiente, CI/CD e operação)
```

- `backend` não altera schema sem `database` quando houver migration, integridade ou desempenho envolvidos.
- `frontend` e `mobile` não inventam comportamento de API; sinalizam a lacuna para `backend`.
- `database` não introduz mudança incompatível sem rollout e retorno validados com `backend`.
- `devops` recebe mudanças de configuração, ambiente ou deploy com instruções de rollback/mitigação.
- Qualquer papel pode sinalizar risco; o responsável principal decide o encaminhamento ou escala para `architect`/`product`.

## Fluxo e limites WIP

Kanban sugerido: Pronto (sem limite) → Em desenvolvimento (WIP 3 para a equipe; 1 tarefa principal por pessoa) → Revisão/validação (WIP 2) → Pronto para entrega (WIP 2) → Concluído.

- Uma tarefa não entra em desenvolvimento sem objetivo, contexto e critérios de aceite.
- Ao atingir um limite, ajude a concluir, revisar ou desbloquear antes de puxar nova tarefa.
- Registre bloqueios com causa, impacto, decisão necessária e próximo responsável.
- Quebre trabalho que não possa ser revisado e validado com segurança em um ciclo curto.
- Bloqueios de produto, arquitetura, acesso externo ou aprovação param a expansão de escopo e entram no handoff.

## Handoff obrigatório

Todo handoff deve conter:

```text
Responsável atual → próximo responsável
Objetivo e critérios de aceite:
Arquivos e áreas alteradas:
Contrato/API/schema/configuração afetados:
Decisões e premissas:
Testes executados e resultado:
Riscos, migration, feature flag e rollback/mitigação:
Pendências, bloqueios e ação esperada do receptor:
```

O receptor confirma que o handoff é suficiente antes de ampliar o escopo. Se faltar contexto, devolve-o com a lacuna específica; não supõe decisões de contrato, dados ou operação.

## Definition of Done

Uma tarefa está concluída somente quando:

- atende aos critérios de aceite e permanece no escopo acordado;
- código segue padrões locais, sem segredos, logs sensíveis ou dependências desnecessárias;
- testes unitários, integrados ou e2e proporcionais ao risco foram criados/atualizados e executados;
- lint, análise estática, build e pipeline aplicáveis passam;
- alterações de API, banco, configuração e operação estão documentadas no nível necessário;
- migrations possuem caminho seguro de execução e rollback/mitigação quando aplicável;
- riscos residuais, limitações ou validações pendentes foram explicitados.

## Convenções técnicas comuns

- Não faça refatoração fora do escopo nem remova testes para fazê-los passar.
- Valide entrada no limite da aplicação; aplique autorização no servidor; use menor privilégio.
- Nunca registre tokens, senhas, dados pessoais ou payloads sensíveis. Use variáveis de ambiente e gestão de segredos.
- Prefira contratos versionados/documentados, erros previsíveis e mensagens sem detalhes internos.
- Faça revisão humana proporcional para autenticação, autorização, pagamentos, dados pessoais, migrations destrutivas e infraestrutura.

## Convenções Laravel

- Use Form Requests para validação, Policies/Gates para autorização e Services/Actions para regras de negócio que não caibam no controller.
- Controllers devem ser finos; evite lógica duplicada e consultas N+1. Use Eloquent com eager loading quando adequado.
- Migrations devem ser reversíveis quando possível, compatíveis com deploy progressivo e sem perda silenciosa de dados.
- Teste endpoints, regras e políticas com PHPUnit/Pest conforme o projeto; use factories e transações/fixtures isoladas.

## Convenções Angular

- Organize por feature; mantenha componentes focados, tipados e acessíveis (semântica, teclado, rótulos e feedback de erro).
- Use Reactive Forms para fluxos não triviais; não confie no frontend para autorização.
- Centralize chamadas HTTP, estados de carregamento/erro e tratamento de autenticação nos padrões existentes.
- Teste componentes, serviços e fluxos críticos; mantenha lint e build sem erros.

## Convenções React Native

- Use TypeScript, componentes focados e APIs de navegação/estado já adotadas pelo app.
- Trate carregamento, erro, modo offline e permissões explicitamente; não armazene segredos no aplicativo.
- Isole código nativo/por plataforma e valide em Android e iOS quando ambos forem suportados.
- Teste lógica e componentes; valide manualmente fluxos críticos em dispositivo ou emulador quando aplicável.

## CI/CD e operação

- Todo pull request executa checks reproduzíveis: instalação consistente, lint, testes e build aplicáveis.
- Deploy deve ser automatizado, rastreável e ter rollback ou mitigação compatível com o risco.
- Configuração é versionada, exceto segredos. Ambientes não compartilham credenciais.
- Mudanças operacionais incluem health checks, logs estruturados, métricas/alertas mínimos e instrução de resposta quando necessário.

## Restrições

Não exponha credenciais; não faça operações destrutivas, deploy em produção ou mudança irreversível sem autorização explícita; não altere contratos públicos sem avaliação de compatibilidade; não declare sucesso sem evidência de validação.
