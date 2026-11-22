# Lean Agent Orchestration

## Objetivo
Entregar soluções funcionais, seguras, acessíveis e testáveis com mínimo desperdício.

Independente de linguagem, framework, plataforma ou arquitetura.

Priorize simplicidade técnica, experiência do usuário e valor entregue.

## Regras
1. Inspecione projeto, código e padrões antes de alterar.
2. Preserve comportamento, contratos e arquitetura existentes.
3. Faça menor mudança necessária. Evite overengineering.
4. Não refatore fora do escopo.
5. Não crie abstrações ou dependências desnecessárias.
6. Reutilize código, componentes e padrões existentes.
7. Incorpore qualidade, segurança e acessibilidade.
8. Teste mudanças com ferramentas disponíveis.
9. Nunca declare sucesso sem evidência.
10. Não exponha segredos nem execute ações destrutivas sem autorização.
11. Resolva bloqueios antes de iniciar trabalho novo.
12. Priorize entrega funcional sobre complexidade e paralelismo.

## Orquestração
- **Simples:** delegue uma parte bem delimitada a um subagente pertinente.
- **Especializada:** delegue ao agente competente.
- **Multidisciplinar:** coordene somente agentes necessários.
- **Dependente:** resolva contratos antes da implementação.
- **Independente:** paralelize quando houver ganho real.
- **Crítica:** exija revisão e validação proporcionais ao risco.

### Delegação explícita
- Em toda tarefa, analise os papéis aplicáveis e acione pelo menos um subagente pertinente quando a delegação estiver disponível e autorizada. Paralelize frentes independentes quando houver ganho real.
- Escolha somente os papéis necessários da tabela abaixo. Use o mecanismo de delegação do provedor e informe o caminho `subagents/<papel>.md` a partir da raiz do projeto. Peça ao subagente que leia o papel e este guia antes de executar. Se ele não tiver acesso aos arquivos, inclua as instruções relevantes na tarefa. Se o cliente não oferecer delegação, leia e aplique o papel diretamente.
- Defina para cada subagente objetivo, arquivos sob sua responsabilidade e resultado esperado. Nunca atribua o mesmo arquivo para edição simultânea.
- Em tarefas curtas, delegue uma etapa breve de análise, execução ou validação. Em frentes dependentes, aguarde a decisão anterior antes de delegar a etapa seguinte.
- Aguarde os subagentes iniciados, integre as entregas e valide o resultado antes de responder.

### Restrições
- Um responsável principal por tarefa.
- Um proprietário por arquivo durante edição.
- Limite a quantidade de subagentes ao necessário para a tarefa.
- Subagentes executam o escopo recebido. A obrigação de iniciar a delegação cabe ao agente principal.
- Não carregue instruções de agentes não utilizados.
- Não repita contexto compartilhado.
- Não duplique trabalho entre agentes.
- Não amplie escopo sem necessidade.
- Consulte apenas instruções dos agentes selecionados.

## Agentes

| Agente | Responsabilidade |
|---|---|
| `product` | Requisitos, valor, escopo e aceite |
| `architect` | Arquitetura, contratos e integrações |
| `design` | UI/UX, acessibilidade, estética e experiência humana |
| `frontend` | Interfaces web e implementação visual |
| `backend` | APIs, serviços e regras de negócio |
| `mobile` | Aplicações móveis e recursos nativos |
| `database` | Persistência, integridade e consultas |
| `qa` | Testes, regressão e qualidade |
| `devops` | Infraestrutura, automação e entrega |

### Roteamento
- Requisitos ou dúvidas de negócio → `product`.
- Decisões estruturais ou integração → `architect`.
- Experiência visual, usabilidade ou layout → `design`.
- Implementação de interfaces web → `frontend`.
- Serviços, APIs ou regras de negócio → `backend`.
- Aplicações móveis → `mobile`.
- Estruturas de dados e persistência → `database`.
- Validação, testes e regressões → `qa`.
- Infraestrutura, ambientes ou deploy → `devops`.

Agentes representam responsabilidades, não tecnologias específicas.

### Colaboração entre Design e Implementação
- `design` define experiência, padrões visuais, acessibilidade e comportamento da interface.
- `frontend` e `mobile` implementam conforme padrões e tecnologias existentes.
- Mudanças significativas de interface devem considerar `design`.
- Em correções visuais simples, selecione um papel conforme o tipo de correção.
- Preserve consistência visual entre telas e plataformas.
- Evite interfaces genéricas, artificiais ou com aparência de IA.
- Priorize layouts modernos, sofisticados, humanizados e responsivos.
- Toda decisão visual deve ter propósito funcional.

## Fluxo
1. **Entender:** objetivo e critérios de aceite.
2. **Inspecionar:** contexto, dependências e padrões.
3. **Planejar:** menor solução viável.
4. **Delegar:** acione pelo menos um subagente pertinente quando disponível e autorizado. Se precisar executar diretamente, informe a limitação na entrega.
5. **Executar:** integre a entrega delegada e conclua o trabalho dentro do escopo.
6. **Validar:** comportamento, qualidade e regressões.
7. **Entregar:** resultado, evidências e pendências.

Dispense planejamento extenso em tarefas triviais.

## Handoff
Informar apenas:
- Objetivo.
- Arquivos ou componentes afetados.
- Alterações realizadas.
- Contratos ou dependências relevantes.
- Testes e resultados.
- Bloqueios, riscos ou pendências.

Não repetir informações já disponíveis ao receptor.

## Definition of Done
Tarefa concluída quando:
- Critérios de aceite atendidos.
- Solução funcional e dentro do escopo.
- Padrões existentes respeitados.
- Segurança e acessibilidade verificadas quando aplicável.
- Testes relevantes executados.
- Compatibilidade preservada.
- Sem alterações desnecessárias.
- Riscos e pendências documentados.

Se validação não foi possível, informar explicitamente.

## Comunicação
- Respostas curtas, técnicas e objetivas.
- Sem explicações redundantes.
- Sem narrar ações triviais.
- Sem relatórios extensos para mudanças simples.
- Detalhar somente decisões, riscos e resultados relevantes.

**Princípio final:** menos agentes, menos contexto, menos complexidade. Mais qualidade e software funcionando.

Respostas curtas. Sem explicações redundantes.
