// Melhorias progressivas do site. Sem este ficheiro, o conteúdo continua legível.
(() => {
  const content = document.querySelector(".content");
  if (!content) return;
  const direct = sel => [...content.children].filter(el => el.matches(sel));

  // O menu do topo já leva ao início; a linha «Voltar ao início» só faz falta no GitHub.
  // «Versão online» também só faz sentido para quem lê no GitHub.
  direct("p").forEach(p => {
    const text = p.textContent.trim();
    const a = p.querySelector("a");
    if ((a && text === a.textContent.trim() && /^voltar/i.test(text)) || /^Versão online:/.test(text)) p.remove();
  });

  // Tabelas largas deslizam na horizontal em ecrãs pequenos.
  content.querySelectorAll("table").forEach(t => {
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    t.before(wrap);
    wrap.append(t);
  });

  // Coluna «Tipo» das ferramentas: etiquetas coloridas.
  const kind = label => {
    const l = label.toLocaleLowerCase("pt-PT");
    if (l.startsWith("plano")) return "freemium";
    if (l.startsWith("grátis")) return "free";
    if (l.includes("open source")) return "oss";
    if (l === "local") return "local";
    return "other";
  };
  content.querySelectorAll("table").forEach(t => {
    const col = [...t.querySelectorAll("thead th")].findIndex(th => th.textContent.trim() === "Tipo");
    if (col < 0) return;
    t.classList.add("tools");
    t.querySelectorAll("tbody tr").forEach(tr => {
      const td = tr.children[col];
      if (!td) return;
      const parts = td.textContent.split(",").map(s => s.trim()).filter(Boolean);
      td.textContent = "";
      parts.forEach(label => {
        const span = document.createElement("span");
        span.className = `pill pill-${kind(label)}`;
        span.textContent = label;
        td.append(span);
      });
    });
  });

  // Botão «Copiar» nos blocos de texto (o modelo e o pedido do sorteio).
  content.querySelectorAll("pre").forEach(pre => {
    const box = pre.closest(".highlighter-rouge") || pre;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy";
    btn.textContent = "Copiar";
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText.replace(/\n$/, ""));
        btn.textContent = "Copiado ✓";
      } catch {
        btn.textContent = "Seleciona o texto e copia";
      }
      setTimeout(() => { btn.textContent = "Copiar"; }, 2200);
    });
    box.classList.add("has-copy");
    box.append(btn);
  });

  // Links externos abrem noutro separador.
  content.querySelectorAll('a[href^="http"]').forEach(a => {
    if (a.host !== location.host) { a.target = "_blank"; a.rel = "noopener"; }
  });

  // Índice «Nesta página», com a secção atual destacada.
  const toc = document.getElementById("toc");
  const heads = direct("h2[id]");
  if (toc && heads.length >= 3) {
    const links = new Map();
    heads.forEach(h => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent;
      li.append(a);
      toc.append(li);
      links.set(h, a);
    });
    toc.closest(".toc").hidden = false;
    document.body.classList.add("has-toc");
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          toc.querySelectorAll("a").forEach(a => a.removeAttribute("aria-current"));
          links.get(e.target).setAttribute("aria-current", "true");
        });
      }, { rootMargin: "-15% 0px -75% 0px" });
      heads.forEach(h => obs.observe(h));
    }
  }
})();
