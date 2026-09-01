# Comunidade em Ação

# Prompt para Claude Code

Copie tudo abaixo da linha e cole no Claude Code, dentro de uma pasta vazia.

---

## Contexto

Você vai construir a **Quadra**, uma plataforma web que conecta um problema visível de um bairro a alguém da própria comunidade que sabe e quer resolver.

Não é um canal de denúncia para prefeitura. É um lugar onde o problema encontra quem resolve.

Exemplo central: existe um muro abandonado e rabiscado na rua. Um morador fotografa e publica. Um grafiteiro cadastrado na plataforma recebe o aviso, se candidata, consegue a autorização do dono do muro e transforma o muro em mural. O antes e o depois entram no portfólio público dele e no feed do bairro.

Outros casos: praça tomada por entulho resolvida por mutirão, canteiro morrendo resolvido por um coletivo de jardinagem, fachada de escola pintada por voluntários.

O nome "Quadra" é provisório. Deixe o nome em uma constante única em `lib/brand.ts` para ser trocado em um lugar só.

## Stack obrigatória

- Next.js 15, App Router, TypeScript

- Tailwind CSS v4

- Supabase: Auth, Postgres com PostGIS, Storage

- Login por telefone com OTP (o público é morador de bairro, senha é atrito demais)

- Mapa com MapLibre GL ou Leaflet

- Deploy Vercel

- Mobile first. Web responsivo, sem app nativo.

## Identidade visual

Não use paleta genérica de SaaS. A cor tem função semântica, não decorativa: azul é o que está vivo e em movimento, verde é o que ficou pronto, cinza é o que depende de terceiros.

### Cores

```css

--azul-fundo:    #06254F;  /* fundo escuro, header, rodapé, blocos de destaque */

--azul:          #1857D6;  /* cor de ação: botões, links, status aberto */

--azul-claro:    #E6EEFC;  /* fundo de bloco leve, chips, estados hover */

--verde:         #0FA968;  /* resolvido, concluído, confirmação */

--verde-claro:   #E1F6EC;  /* fundo de estado resolvido */

--branco:        #FFFFFF;  /* superfície principal */

--nevoa:         #F4F7FB;  /* fundo da página */

--tinta:         #0D1B2E;  /* texto principal */

--cinza:         #5D6E88;  /* texto secundário, status encaminhado */

--borda:         #D7E0EC;

```

Regra de uso de cor por status:

| Status | Cor |

|---|---|

| Aberto | azul |

| Com candidato | azul-claro com texto azul-fundo |

| Autorizado | azul-fundo |

| Em andamento | azul, com borda animada sutil |

| Resolvido | verde |

| Encaminhado à prefeitura | cinza |

### Tipografia

Uma família só: **Plus Jakarta Sans** (Google Fonts).

- Títulos: peso 800, `letter-spacing: -0.02em`, `line-height: 1.05`

- Subtítulos e rótulos de interface: peso 600

- Corpo: peso 400, `line-height: 1.6`, largura máxima de 68 caracteres

Escala: 13 / 15 / 17 / 21 / 28 / 40 / 56.

Nunca use caixa alta em rótulos. Nunca destaque uma palavra solta do título em cor diferente.

### Forma e superfície

- Raio de borda: 12px em cartões, 8px em botões e campos, 999px só em chips de status

- Bordas de 1px em `--borda`. Sombra apenas em elementos flutuantes (modal, toast), nunca em cartão de lista

- Espaçamento em múltiplos de 4px

- Fotos de antes e depois sempre lado a lado ou em comparador arrastável, nunca isoladas

### Marca

Logo: a palavra em peso 800 com um pin de mapa cujo miolo é um quadrado sólido, não um círculo. Azul sobre branco, branco sobre azul-fundo. Gere como componente React em SVG, sem arquivo de imagem.

Elemento gráfico recorrente: uma linha vertical divisória que separa antes e depois. Use no comparador do hero e como divisor de seções, sempre em verde quando o caso está resolvido.

### Acessibilidade

Contraste mínimo AA. Foco visível em azul com offset de 3px. Respeitar `prefers-reduced-motion`. Estados nunca comunicados só por cor: todo chip de status tem texto.

## Modelo de dados

Crie as migrations SQL do Supabase com RLS ativado em todas as tabelas.

```sql

users

  id, nome, telefone, tipo ('morador'|'resolvedor'|'moderador'),

  bairro_id, avatar_url, verificado boolean default false, created_at

resolvedores

  user_id (pk, fk users), bio, habilidades text[],

  raio_atuacao_km int, instagram, nota_media numeric, created_at

bairros

  id, nome, cidade, poligono geography(Polygon,4326), ativo boolean

problemas

  id, autor_id, bairro_id, categoria, titulo, descricao,

  foto_antes_url, ponto geography(Point,4326),

  status ('aberto'|'com_candidato'|'autorizado'|'em_andamento'|'resolvido'|'arquivado'),

  competencia ('comunidade'|'prefeitura'),

  protocolo_externo text null, apoios_count int default 0, created_at

candidaturas

  id, problema_id, resolvedor_id, mensagem,

  status ('pendente'|'aceita'|'recusada'), created_at

autorizacoes

  id, problema_id, tipo_local ('publico'|'privado'|'condominio'),

  autorizador_nome, autorizador_contato, comprovante_url,

  confirmado_por (fk users), confirmado_em

resolucoes

  id, problema_id, resolvedor_id, foto_depois_url,

  relato, custo_material numeric null, concluido_em

apoios

  user_id, problema_id, created_at, primary key (user_id, problema_id)

avaliacoes

  id, resolucao_id, autor_id, nota int check (nota between 1 and 5),

  comentario, created_at

```

Regras de RLS:

- Qualquer pessoa autenticada lê problemas do bairro ativo dela

- Só o autor edita o próprio problema, e só enquanto está `aberto`

- Só resolvedores verificados criam candidaturas

- Só moderadores escrevem em `autorizacoes.confirmado_por` e alteram `users.verificado`

- `apoios_count` atualizado por trigger, nunca pelo cliente

## Telas do MVP

1. `/` Landing pública com comparador antes/depois arrastável no hero, como funciona em 4 passos, os dois lados, prévia do feed, seção de autorização, seção do que a plataforma não faz, captura de bairro.

2. `/entrar` Login por telefone com OTP em duas etapas.

3. `/feed` Lista de problemas do bairro, ordenável por apoios e por recentes, filtro por categoria e status.

4. `/mapa` Mesmos problemas em pins coloridos pelo status.

5. `/publicar` Foto, localização automática com ajuste manual, categoria, descrição. Máximo três campos visíveis por vez.

6. `/problema/[id]` Foto, contador de apoios, lista de candidaturas, linha do tempo de status, bloco de autorização, foto do depois quando existir.

7. `/resolvedor/[id]` Perfil público com grade de antes e depois, habilidades, nota, contato.

8. `/cadastro-resolvedor` Habilidades, raio de atuação, Instagram, bio.

9. `/moderacao` Painel do moderador: aprovar resolvedores, mediar candidaturas, arquivar duplicados.

## Regras de negócio inegociáveis

1. **Escopo geográfico travado.** Um bairro ativo no lançamento. Quem está fora vê o feed, mas não publica.

2. **Autorização é bloqueante.** Nenhum problema muda para `em_andamento` sem um registro em `autorizacoes` confirmado por um moderador. Implemente isso como constraint no banco, não só na interface. Muro tem dono mesmo quando parece abandonado.

3. **Resolvedor é verificado por humano.** Todo cadastro entra com `verificado = false` e depende de aprovação no painel. Não automatize.

4. **Competência da prefeitura é separada.** Ao publicar, se a categoria for coleta, buraco, iluminação ou poda, o problema recebe `competencia = 'prefeitura'`, ganha chip cinza e uma tela que orienta a abrir o chamado no canal oficial. A plataforma guarda o número do protocolo e mostra quantos dias ele está parado. A plataforma nunca promete resolver esses casos.

5. **Sem pagamento no MVP.** Se houver custo de material, as pessoas combinam fora. Não construa intermediação financeira.

6. **Anti duplicata.** Ao publicar, buscar problemas abertos num raio de 100 metros com PostGIS e mostrar antes de confirmar, com a opção de apoiar o existente em vez de criar outro.

7. **Antes e depois são obrigatórios para concluir.** Sem `foto_depois_url` o caso não vira `resolvido`.

## Fora do escopo

Não construa: pagamento, chat interno, gamificação, múltiplas cidades, API de integração com prefeitura, app nativo, orçamento participativo, notificação push. Se achar que algo disso é necessário, escreva no README e siga sem construir.

## Como quero que você trabalhe

1. Comece pelo schema e pelas migrations do Supabase, com seed de um bairro e seis problemas de exemplo em estados diferentes.

2. Depois o design system: `globals.css` com os tokens acima e os componentes base (botão, campo, cartão, chip de status, comparador antes/depois).

3. Depois a landing, que precisa ficar pronta e apresentável sozinha.

4. Depois auth e feed.

5. Depois publicar, detalhe do problema e fluxo de candidatura.

6. Por último perfil de resolvedor e moderação.

Ao final de cada etapa, pare e me mostre o que ficou pronto antes de seguir. Não construa as seis etapas de uma vez.

Escreva tudo em português do Brasil: interface, nomes de tabela, nomes de variável de domínio e mensagens de erro. Mensagens de erro dizem o que aconteceu e o que fazer, nunca pedem desculpa.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nosso-bairro-lindo.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/acafe39f-2d50-4b23-afc7-ae9554616bbc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
