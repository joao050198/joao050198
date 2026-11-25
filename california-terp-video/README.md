# California Terp — Vídeo institucional (Remotion)

Filme de apresentação da marca e da história da California Terp: **62 s · 1920×1080 · 30 fps · H.264 + AAC**.
Vídeo pronto: [`out/california-terp-institucional.mp4`](out/california-terp-institucional.mp4)

## Roteiro (todo o texto vem da página "Sobre Nós" de terpenoscalifornia.com)

| # | Cena | O que conta |
|---|------|-------------|
| 1 | Abertura | Uma gota cai: "Tudo começa com um aroma." |
| 2 | Crença | "O ambiente. O aroma. A experiência. Influenciam diretamente a sua qualidade de vida." (o **porquê**) |
| 3 | Origem | "Foi por isso que nasceu a" → montagem animada do logo + "Aromas que elevam o seu momento" |
| 4 | Propósito | "Nascemos para proporcionar bem-estar e experiências sensoriais únicas…" |
| 5 | Processo | Molécula do limoneno (C₁₀H₁₆) desenhada traço a traço + "Destilados a vapor": Pureza, Fidelidade aromática, Excelência (o **como**) |
| 6 | Valores | O que nos move: Bem-estar, Qualidade Premium, Confiança |
| 7 | Portfólio | Monoterpenos, Frutados, Blends e Gummies + letreiro com os aromas |
| 8 | Momentos | Sono e Descanso, Equilíbrio Emocional, Alívio e Conforto, Foco e Vitalidade, Humor & Bem-estar, Relaxamento (cada corte cai numa batida) |
| 9 | Missão | Missão oficial, na íntegra |
| 10 | Assinatura | Logo + slogan + terpenoscalifornia.com |

## Fontes e recursos

- **Tipografia:** Montserrat (Julieta Ulanovsky) e Instrument Serif. São fontes desenhadas por type designers, com licença OFL (uso comercial livre). Os arquivos estão em `public/fonts`, então nada depende de internet.
- **Logo:** reconstruído em vetor (bandeira animada em SVG + letreiro em Montserrat) a partir do logo do site, que só existe em PNG 500×200.
- **Fotos:** banners e produtos do próprio site. Os banners foram recortados para tirar a marca d'água ✦ do Gemini que havia no canto.
- **Trilha:** original, sintetizada do zero com `scripts/trilha.py` (sem samples de terceiros, sem risco de direitos autorais). Está a 120 BPM, com os cortes sincronizados e loudness em −15 LUFS.

## Como editar e renderizar

```bash
npm install
npm run studio          # abre o editor visual do Remotion no navegador
npm run render          # gera out/california-terp-institucional.mp4
python3 scripts/trilha.py public/audio/trilha_raw.wav   # regera a trilha (requer numpy)
```

Textos: `src/scenes/*.tsx` · Cores e fontes: `src/theme.ts` · Duração das cenas: `src/timeline.json`
(se mudar as durações, regenere a trilha para manter a sincronia).
