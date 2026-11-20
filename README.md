# Do zero ao protótipo

Tens uma ideia mas não sabes programar? Esta página diz-te por onde começar: o que construir primeiro, que ferramenta usar e como saber se o protótipo funciona.

Material do workshop de 21 de novembro de 2026 no Startup Forge Tondela, por Carlos André Martins Ferreira.

Versão online: <https://carlosandreferreira.github.io/do-zero-ao-prototipo/>

## Escolhe o teu caminho

- **Quero começar.** Continua a ler esta página: tem o [roteiro](#o-roteiro-em-cinco-passos), o modelo para a tua ideia e um exemplo completo.
- **Quero escolher uma ferramenta.** Vai às [ferramentas, organizadas por objetivo](ferramentas.md).
- **Quero continuar a aprender.** Vê os [cursos e listas recomendados](aprender-mais.md).
- **Quero experimentar.** Abre a [demo do sorteio](https://carlosandreferreira.github.io/do-zero-ao-prototipo/demo/), com nomes fictícios. O [código](https://github.com/CarlosAndreFerreira/do-zero-ao-prototipo/blob/main/demo/index.html) é um único ficheiro HTML.

## O roteiro em cinco passos

| Passo | Pergunta | No exemplo do sorteio |
|---|---|---|
| 1. Definir | Quem vai usar isto e para fazer o quê? | Quem organiza o evento quer sortear camisolas e souvenirs entre os participantes. |
| 2. Reduzir | Qual é a única ação que tem de funcionar? | Colar os nomes, escrever o prémio e carregar em «Sortear». Contas, inscrições e emails ficam de fora. |
| 3. Escolher | Preciso de explicar a ideia, mostrar um ecrã ou experimentar uma interação? | Queremos carregar num botão e ver o resultado, por isso precisamos de uma página interativa. |
| 4. Construir | Que pedido faço à IA para obter a primeira versão? | Um pedido com objetivo, regras e formato (está mais abaixo). |
| 5. Testar | Que exemplo me diz se a primeira versão faz o que pedi? | Se a Ana ganha a camisola, não pode voltar a sair na ronda do souvenir. |

**Não comeces pela ferramenta.** Se ainda estás a explicar a ideia, usa papel ou um chat. Se queres mostrar como seria o ecrã, o [Stitch](https://stitch.google.com/) desenha-o a partir de uma frase. Se precisas de ver alguém a carregar num botão, faz uma página interativa. Só precisas de uma API quando a própria aplicação tem de pedir algo à IA enquanto alguém a usa. No sorteio, a IA constrói a página, mas quem sorteia é o browser.

## O modelo para a tua ideia

Copia, preenche e guarda. É o teu próximo passo escrito.

```text
Quero ajudar [pessoa] a [fazer uma tarefa].
Na primeira versão, essa pessoa só precisa de conseguir [uma ação].
Para já, não preciso de [o que fica de fora].
Começo com [papel / chat / página interativa].
Pedido à IA: [objetivo] + [regras] + [formato da resposta].
Vou saber que funciona quando [resultado que consigo ver].
```

## O pedido do sorteio

Este é o pedido usado na demo. Podes colá-lo no [Gemini Canvas](https://gemini.google.com/) (ativa o Canvas antes de enviar) ou noutra ferramenta com pré-visualização.

```text
Cria uma página de sorteio em português de Portugal.
Aceita um nome por linha; ignora linhas vazias e espaços a mais.
Nomes repetidos (sem contar maiúsculas) contam como uma pessoa.
Em cada ronda escrevo o prémio e sorteio um vencedor por clique.
Quem ganha sai da lista e não pode sair nas rondas seguintes.
Mostra o vencedor em grande e a lista dos prémios atribuídos.
Usa crypto.getRandomValues; se não houver nomes, não sorteia.
Entrega um único ficheiro HTML, sem serviços externos.
```

Repara na estrutura: a primeira linha é o **objetivo**, as do meio são as **regras** e a última é o **formato**. Se não escreveres uma regra, a IA decide por ti.

## Como testar

Antes de cada teste, diz em voz alta o que deveria acontecer. Cola um nome por linha.

| Teste | O que colar ou fazer | O que deve acontecer |
|---|---|---|
| Caso normal | Ana, Bruno, Carla | O vencedor é um dos três e aparece em grande. |
| Repetidos | Ana, ana, Bruno | Entram só duas pessoas. |
| Ronda seguinte | A Ana ganha a camisola | Na ronda do souvenir, a Ana já não pode sair. |
| Fim da lista | Todos já ganharam | O botão não sorteia e explica porquê. |

Se um teste falhar, pede uma correção específica e repete o mesmo teste. Só depois de tudo passar é que vale a pena mexer no visual.

## Os diapositivos

A apresentação do workshop, com o roteiro, o pedido do sorteio e os testes.

- **[Ver em PDF](diapositivos/do-zero-ao-prototipo.pdf)**: abre no browser, sem precisar do PowerPoint.
- **[Descarregar o PowerPoint](diapositivos/do-zero-ao-prototipo.pptx)**: o original editável, com os tempos e as dicas de apresentação nas notas de cada diapositivo. O último diapositivo é a checklist de preparação para quem apresenta.

## Cuidados

- **Dados pessoais.** Não coles nomes, emails ou dados de clientes no pedido à IA. Usa exemplos fictícios para construir e testar.
- **Grátis não é infinito.** Os planos gratuitos têm limites e mudam com frequência. Confirma sempre na página oficial.
- **Links públicos.** Em vários construtores, uma app feita no plano gratuito fica acessível a quem tiver o link.
- **Quando chamar alguém técnico.** Contas de utilizador, pagamentos ou dados de clientes já não são protótipo: são produto.

## Sobre este repositório

Última revisão: novembro de 2026. Conteúdo partilhado com a licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.pt): podes copiar e adaptar, desde que indiques a origem. O texto completo está em [LICENSE](LICENSE). Os logótipos da Startup Forge Tondela e de outras organizações que aparecem nos diapositivos pertencem aos respetivos donos e não estão incluídos nesta licença.

Os testes da secção «Como testar» também existem em versão automática, em [tests/](https://github.com/CarlosAndreFerreira/do-zero-ao-prototipo/blob/main/tests/sorteio.test.mjs). Correm no GitHub a cada alteração; para os correr no teu computador, com o [Node.js](https://nodejs.org/) instalado: `node --test tests/*.test.mjs`.
