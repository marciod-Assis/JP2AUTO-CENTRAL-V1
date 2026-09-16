# JP2auto — Central de Atendimento V1

Painel inicial para acompanhar atendimentos, SLAs, alertas e desempenho dos setores da JP2auto.

## O que já funciona

- Visão geral de atendimentos, atrasos e cumprimento de SLA;
- Filtro por setor e busca por cliente, protocolo ou atendente;
- Cadastro manual de novos atendimentos;
- Cálculo automático de status pelo tempo de espera;
- Armazenamento local dos atendimentos cadastrados;
- Fila visual de alertas;
- Gráfico de volume semanal;
- Ranking equilibrando prazo e avaliação;
- Layout adaptado para computador e celular.

Os dados iniciais são demonstrativos. As integrações com Digisac e Chat On estão sinalizadas como pendentes até o fornecimento das APIs.

## Executar localmente
C:\Users\Billy\Desktop\APP_JP2AUTO\jp2auto-central-v1> pnpm.cmd exec next dev 
http://192.168.20.81:3000/

Requer Node.js 22 ou superior e pnpm.

```bash
pnpm install
pnpm dev
```

## Validar para produção

```bash
pnpm lint
pnpm build
```

## Próxima etapa

1. Criar autenticação e banco PostgreSQL;
2. Receber eventos do Digisac por webhook ou consulta periódica;
3. Configurar envio de alertas no Digisac e Chat On;
4. Cadastrar usuários, horários úteis e SLAs reais;
5. Substituir os dados demonstrativos pelas informações oficiais.

Nunca salve tokens ou senhas no repositório. Use variáveis de ambiente protegidas.
