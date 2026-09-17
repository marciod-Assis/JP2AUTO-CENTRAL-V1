# JP2auto Central — V2

Piloto local de acompanhamento de atendimento e pós-venda, com cadastros, histórico, SLAs, indicadores e vínculos de cliente/OS/protocolo.

## Executar no Windows

Na pasta do projeto, com Node 22.13+ e pnpm instalados:

```powershell
pnpm.cmd install
pnpm.cmd dev
```

Abra no navegador o endereço informado pelo terminal. O comando usa Next.js diretamente, sem autenticação de desenvolvimento Sites.

## Funcionalidades

- Cadastro, edição, transferência, pausa, encerramento e reabertura de atendimentos;
- Histórico de observações e mudanças;
- Código de cliente Bling, número de OS e protocolo Digisac opcional;
- Origem da tratativa, próxima ação e data de acompanhamento;
- Colaboradores com setor e ativação/desativação;
- Calendário semanal, limites por setor e alertas locais;
- Indicadores derivados dos registros, filtros, CSV e backup JSON.

## Limitações

Dados apenas neste navegador, sem login ou banco compartilhado. As integrações exibem referências e pendências; não sincronizam nem enviam mensagens. Não colocar credenciais nem dados de clientes no GitHub. Os exemplos da V1 não são importados como dados reais.

Veja [instruções e regras da V2](docs/V2.md) antes do uso.

## Verificar

```powershell
pnpm.cmd test
pnpm.cmd lint
pnpm.cmd build
```
