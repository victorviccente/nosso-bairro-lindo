import { createFileRoute, Link } from "@tanstack/react-router";
import { MARCA, MARCA_DESCRICAO } from "@/lib/brand";
import { Logo } from "@/components/marca/Logo";
import { Botao } from "@/components/base/Botao";
import { Campo } from "@/components/base/Campo";
import { Cartao } from "@/components/base/Cartao";
import { ChipStatus, type Status } from "@/components/base/ChipStatus";
import { ComparadorAntesDepois } from "@/components/base/ComparadorAntesDepois";
import muroAntes from "@/assets/muro-antes.jpg";
import muroDepois from "@/assets/muro-depois.jpg";

const titulo = `${MARCA} — o problema do bairro encontra quem resolve`;
const descricao =
  "Um morador fotografa o muro rabiscado. Um grafiteiro do bairro se candidata, consegue a autorização e transforma. O antes e o depois ficam públicos.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Landing,
});

const passos = [
  {
    numero: "01",
    titulo: "Alguém fotografa",
    texto: "Um morador publica o problema com foto e localização. Leva menos de um minuto.",
  },
  {
    numero: "02",
    titulo: "Quem resolve se candidata",
    texto: "Resolvedores verificados do bairro recebem o aviso e dizem como pretendem resolver.",
  },
  {
    numero: "03",
    titulo: "A autorização é confirmada",
    texto: "Nada começa sem o dono do local autorizar. Um moderador confere antes de liberar.",
  },
  {
    numero: "04",
    titulo: "O depois vira portfólio",
    texto: "A foto final entra no feed do bairro e no perfil público de quem resolveu.",
  },
];

const exemplos: { titulo: string; local: string; status: Status; apoios: number }[] = [
  { titulo: "Muro rabiscado na esquina da Rua Aurora", local: "Rua Aurora, 210", status: "em_andamento", apoios: 34 },
  { titulo: "Praça tomada por entulho depois da reforma", local: "Praça do Coreto", status: "com_candidato", apoios: 51 },
  { titulo: "Canteiro central morrendo por falta de rega", local: "Av. das Palmeiras", status: "aberto", apoios: 12 },
  { titulo: "Fachada da escola municipal descascando", local: "Rua Nove de Maio, 44", status: "resolvido", apoios: 88 },
  { titulo: "Poste apagado há três semanas", local: "Rua Aurora, 90", status: "encaminhado", apoios: 27 },
  { titulo: "Ponto de ônibus sem banco e sem cobertura", local: "Av. Central", status: "autorizado", apoios: 19 },
];

function Landing() {
  return (
    <div className="min-h-screen bg-nevoa">
      <Cabecalho />
      <main>
        <Hero />
        <ComoFunciona />
        <DoisLados />
        <PreviaFeed />
        <Autorizacao />
        <NaoFazemos />
        <CapturaBairro />
      </main>
      <Rodape />
    </div>
  );
}

function Cabecalho() {
  return (
    <header className="sticky top-0 z-10 border-b border-borda bg-branco/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Botao variante="texto">Ver o feed</Botao>
          </Link>
          <Link to="/">
            <Botao>Entrar</Botao>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-azul-fundo">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
        <div className="text-branco">
          <span className="inline-flex items-center rounded-chip bg-branco/10 px-3 py-1 text-13 font-semibold">
            Um bairro por vez
          </span>
          <h1 className="mt-4 text-40 text-branco md:text-56">
            O problema do bairro encontra quem sabe resolver
          </h1>
          <p className="medida mt-4 text-17 text-azul-claro">{MARCA_DESCRICAO}</p>
          <p className="medida mt-3 text-15 text-azul-claro">
            Aqui ninguém abre uma denúncia e espera. Aqui um muro abandonado vira mural porque um
            grafiteiro da rua de baixo viu a foto.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/">
              <Botao variante="claro" tamanho="lg">
                Publicar um problema
              </Botao>
            </Link>
            <Link to="/">
              <Botao variante="texto" tamanho="lg" className="text-branco hover:no-underline">
                Quero resolver
              </Botao>
            </Link>
          </div>
        </div>

        <div>
          <ComparadorAntesDepois
            antes={muroAntes}
            depois={muroDepois}
            alt="Muro da Rua Aurora"
            resolvido
          />
          <p className="mt-3 text-13 text-azul-claro">
            Muro da Rua Aurora. Publicado por Dona Cleide, resolvido pelo Tiago em 11 dias.
          </p>
        </div>
      </div>
    </section>
  );
}

function Secao({
  id,
  titulo,
  subtitulo,
  children,
  escura = false,
}: {
  id?: string;
  titulo: string;
  subtitulo?: string;
  children?: React.ReactNode;
  escura?: boolean;
}) {
  return (
    <section id={id} className={escura ? "bg-azul-fundo" : "bg-nevoa"}>
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className={`text-28 md:text-40 ${escura ? "text-branco" : "text-tinta"}`}>{titulo}</h2>
        {subtitulo && (
          <p className={`medida mt-3 text-17 ${escura ? "text-azul-claro" : "text-cinza"}`}>
            {subtitulo}
          </p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  return (
    <Secao titulo="Como funciona" subtitulo="Quatro passos, do celular do morador ao muro pintado.">
      <ol className="grid gap-4 md:grid-cols-4">
        {passos.map((passo) => (
          <li key={passo.numero}>
            <Cartao className="h-full">
              <span className="text-13 font-semibold text-azul">{passo.numero}</span>
              <h3 className="mt-2 text-17">{passo.titulo}</h3>
              <p className="mt-2 text-15 text-cinza">{passo.texto}</p>
            </Cartao>
          </li>
        ))}
      </ol>
    </Secao>
  );
}

function DoisLados() {
  return (
    <Secao
      titulo="Os dois lados"
      subtitulo="A plataforma só faz sentido quando as duas pontas estão no mesmo bairro."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Cartao className="border-l-2 border-l-azul">
          <h3 className="text-21">Quem vê o problema</h3>
          <p className="mt-2 text-15 text-cinza">
            Você passa todo dia por aquele canteiro morrendo. Publica a foto, marca no mapa e apoia o
            que os vizinhos já publicaram. Quanto mais apoio, mais visível para quem resolve.
          </p>
          <ul className="mt-4 space-y-2 text-15">
            <li>Publicar com foto e localização automática</li>
            <li>Apoiar um problema que já existe em vez de duplicar</li>
            <li>Acompanhar a linha do tempo até o depois</li>
          </ul>
        </Cartao>
        <Cartao className="border-l-2 border-l-verde">
          <h3 className="text-21">Quem sabe resolver</h3>
          <p className="mt-2 text-15 text-cinza">
            Grafiteiro, jardineiro, marceneiro, coletivo de mutirão. Você recebe os casos dentro do
            seu raio de atuação e constrói um portfólio público de antes e depois reais.
          </p>
          <ul className="mt-4 space-y-2 text-15">
            <li>Cadastro com habilidades e raio de atuação</li>
            <li>Verificação feita por uma pessoa, não por robô</li>
            <li>Perfil público com grade de antes e depois</li>
          </ul>
        </Cartao>
      </div>
    </Secao>
  );
}

function PreviaFeed() {
  return (
    <Secao
      titulo="O feed do bairro agora"
      subtitulo="Cada caso mostra em que pé está. O estado nunca é comunicado só por cor."
    >
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {exemplos.map((caso) => (
          <li key={caso.titulo}>
            <Cartao className="flex h-full flex-col gap-3">
              <ChipStatus status={caso.status} className="self-start" />
              <h3 className="text-17">{caso.titulo}</h3>
              <p className="text-13 text-cinza">{caso.local}</p>
              <p className="mt-auto text-13 font-semibold text-azul">{caso.apoios} apoios</p>
            </Cartao>
          </li>
        ))}
      </ul>
    </Secao>
  );
}

function Autorizacao() {
  return (
    <Secao
      escura
      titulo="Muro tem dono, mesmo quando parece abandonado"
      subtitulo="Nenhum caso entra em andamento sem autorização registrada e conferida por um moderador."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            titulo: "Local privado",
            texto: "Nome e contato de quem autorizou, mais o comprovante anexado.",
          },
          {
            titulo: "Local público",
            texto: "Depende da permissão do órgão responsável antes de qualquer tinta.",
          },
          {
            titulo: "Condomínio",
            texto: "Autorização do síndico ou da assembleia, registrada no caso.",
          },
        ].map((item) => (
          <div key={item.titulo} className="rounded-lg border border-branco/20 p-4">
            <h3 className="text-17 text-branco">{item.titulo}</h3>
            <p className="mt-2 text-15 text-azul-claro">{item.texto}</p>
          </div>
        ))}
      </div>
    </Secao>
  );
}

function NaoFazemos() {
  return (
    <Secao
      titulo="O que a plataforma não faz"
      subtitulo="Dizer isso em voz alta evita frustração depois."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Cartao>
          <ChipStatus status="encaminhado" className="self-start" />
          <h3 className="mt-3 text-17">Coleta, buraco, iluminação e poda são da prefeitura</h3>
          <p className="mt-2 text-15 text-cinza">
            Esses casos ganham chip cinza e orientação para abrir o chamado no canal oficial. A
            plataforma guarda o número do protocolo e mostra há quantos dias ele está parado. Nunca
            prometemos resolver.
          </p>
        </Cartao>
        <Cartao>
          <h3 className="text-17">Não intermediamos dinheiro</h3>
          <p className="mt-2 text-15 text-cinza">
            Se houver custo de material, as pessoas combinam fora daqui. Também não há chat interno,
            ranking, pontuação nem app para instalar.
          </p>
        </Cartao>
      </div>
    </Secao>
  );
}

function CapturaBairro() {
  return (
    <section className="bg-branco">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-28 md:text-40">Seu bairro ainda não está aberto</h2>
            <p className="medida mt-3 text-17 text-cinza">
              Começamos com um bairro só, de propósito. Diga onde você mora e avisamos quando a{" "}
              {MARCA} chegar aí. Enquanto isso você já pode ver o feed.
            </p>
          </div>
          <form
            className="grid gap-4 rounded-lg border border-borda p-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <Campo rotulo="Bairro" placeholder="Ex.: Vila Aurora" required />
            <Campo
              rotulo="Telefone"
              type="tel"
              inputMode="tel"
              placeholder="(11) 90000-0000"
              ajuda="Usamos só para avisar da abertura do bairro."
              required
            />
            <Botao type="submit" tamanho="lg">
              Avisar quando abrir
            </Botao>
          </form>
        </div>
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="bg-azul-fundo">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <Logo tom="branco" />
        <p className="text-13 text-azul-claro">
          {MARCA} é um nome provisório. Um bairro por vez, sem promessa que não dá para cumprir.
        </p>
      </div>
    </footer>
  );
}
