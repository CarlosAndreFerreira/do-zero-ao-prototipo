// Testa a lógica do sorteio (demo/index.html), entre os marcadores LOGIC-START e LOGIC-END.
// Correr com: node --test tests/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../demo/index.html", import.meta.url), "utf8");
const block = html.match(/\/\*LOGIC-START\*\/([\s\S]*?)\/\*LOGIC-END\*\//);
assert.ok(block, "marcadores LOGIC-START/LOGIC-END não encontrados em demo/index.html");
const { normalise, parseNames, randomIndex, remaining } = new Function(
  `${block[1]}; return { normalise, parseNames, randomIndex, remaining };`
)();

// Gerador falso: devolve os valores dados, por ordem.
const fakeCrypto = values => ({
  calls: 0,
  getRandomValues(buf) { buf[0] = values[this.calls++]; return buf; },
});

test("normalise tira espaços a mais", () => {
  assert.equal(normalise("  Ana   Martins \t"), "Ana Martins");
});

test("caso normal: um nome por linha, ignora linhas vazias", () => {
  const r = parseNames("Ana\n\n  \r\nBruno\r\nCarla\n");
  assert.deepEqual(r.names, ["Ana", "Bruno", "Carla"]);
  assert.equal(r.repeated, 0);
});

test("repetidos sem contar maiúsculas contam como uma pessoa", () => {
  const r = parseNames("Ana\nana\nBruno\n  ANA  ");
  assert.deepEqual(r.names, ["Ana", "Bruno"]);
  assert.equal(r.repeated, 2);
});

test("repetidos com acentos e espaços interiores", () => {
  const r = parseNames("João  Sá\njoão sá\nÉrica\nérica");
  assert.deepEqual(r.names, ["João Sá", "Érica"]);
  assert.equal(r.repeated, 2);
});

test("quem ganhou não volta a sair na ronda seguinte", () => {
  const names = ["Ana", "Bruno", "Carla"];
  const left = remaining(names, [{ name: "Ana", prize: "Camisola" }]);
  assert.deepEqual(left, ["Bruno", "Carla"]);
});

test("fim da lista: todos ganharam", () => {
  const winners = ["Ana", "Bruno"].map(name => ({ name, prize: "Souvenir" }));
  assert.deepEqual(remaining(["Ana", "Bruno"], winners), []);
});

test("randomIndex rejeita valores que causariam enviesamento", () => {
  // n = 3: limit = 2^32 - (2^32 % 3) = 4294967295; 4294967295 é rejeitado.
  const c = fakeCrypto([4294967295, 7]);
  assert.equal(randomIndex(3, c), 7 % 3);
  assert.equal(c.calls, 2);
});

test("randomIndex fica sempre entre 0 e n-1", () => {
  for (const n of [1, 2, 3, 7, 10, 1000]) {
    for (let i = 0; i < 200; i++) {
      const k = randomIndex(n, globalThis.crypto);
      assert.ok(Number.isInteger(k) && k >= 0 && k < n, `n=${n} deu ${k}`);
    }
  }
});

test("randomIndex distribui de forma uniforme (aproximada)", () => {
  const n = 5, runs = 50000, counts = new Array(n).fill(0);
  for (let i = 0; i < runs; i++) counts[randomIndex(n, globalThis.crypto)]++;
  for (const c of counts) assert.ok(Math.abs(c - runs / n) < runs / n * 0.05, `contagens ${counts}`);
});
