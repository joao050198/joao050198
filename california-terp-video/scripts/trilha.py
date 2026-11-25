"""
Trilha sonora original do vídeo, sintetizada do zero com numpy (sem samples de terceiros).
120 BPM -> 1 batida = 15 frames a 30 fps, então todos os cortes caem no tempo.
Uso: python3 scripts/trilha.py public/audio/trilha_raw.wav
"""
import json, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
ROOT = Path(__file__).resolve().parent.parent
tl = json.loads((ROOT / 'src' / 'timeline.json').read_text())
FPS = tl['fps']
durs = [s['dur'] for s in tl['scenes']]
trans = tl['transitions']
starts = [0]
for i in range(1, len(durs)):
    starts.append(starts[-1] + durs[i - 1] - trans[i - 1])
TOTAL_F = starts[-1] + durs[-1]
T = TOTAL_F / FPS
N = int(T * SR)
fs = lambda f: f / FPS  # frames -> segundos
BEAT = 0.5
rng = np.random.default_rng(7)

out = np.zeros((N, 2))
midi = lambda m: 440.0 * 2 ** ((m - 69) / 12)

def add(sig, t0, gain=1.0, pan=0.0):
    i0 = int(t0 * SR)
    if i0 >= N: return
    if sig.ndim == 1:
        l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
        sig = np.stack([sig * l, sig * r], axis=1) * np.sqrt(2)
    n = min(len(sig), N - i0)
    out[i0:i0 + n] += sig[:n] * gain

def fft_filter(x, lo=None, hi=None, order=2):
    X = np.fft.rfft(x, axis=0)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    H = np.ones_like(f)
    if hi: H *= 1 / np.sqrt(1 + (f / hi) ** (2 * order))
    if lo: H *= 1 / np.sqrt(1 + (lo / np.maximum(f, 1e-3)) ** (2 * order))
    if X.ndim == 2: H = H[:, None]
    return np.fft.irfft(X * H, n=len(x), axis=0)

def env_adsr(n, a=0.01, r=0.3, sustain_len=None):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4))
    if sustain_len is not None:
        e *= np.clip(1 - (t - sustain_len) / r, 0, 1)
    return e

# ---------- instrumentos ----------
def pad_voice(freq, dur, rel=1.2, att=0.6):
    n = int((dur + rel) * SR); t = np.arange(n) / SR
    s = np.zeros(n)
    for cents in (-8, 0, 8):
        f = freq * 2 ** (cents / 1200); ph = rng.uniform(0, 2 * np.pi)
        for k in range(1, 9):
            if f * k > 9000: break
            s += np.sin(2 * np.pi * f * k * t + ph * k) / k ** 1.7
    return s * env_adsr(n, att, rel, dur) * (0.85 + 0.15 * np.sin(2 * np.pi * 0.23 * t))

def pluck(freq, decay=0.28):
    n = int(1.4 * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(4 * np.pi * freq * t) * np.exp(-t / 0.08) + 0.12 * np.sin(6 * np.pi * freq * t)
    return s * np.exp(-t / decay) * np.minimum(1, t / 0.004)

def kick():
    n = int(0.6 * SR); t = np.arange(n) / SR
    f = 46 + 95 * np.exp(-t / 0.035)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.28)
    return np.tanh(1.6 * s) + 0.25 * rng.standard_normal(n) * np.exp(-t / 0.004)

def clap():
    n = int(0.5 * SR); t = np.arange(n) / SR
    nz = fft_filter(rng.standard_normal(n), lo=900, hi=5000)
    e = np.exp(-t / 0.13) + sum(np.exp(-np.maximum(t - d, 0) / 0.01) * (t >= d) for d in (0.0, 0.011, 0.022)) * 0.6
    return nz * e * 0.9

def hat(open_=False):
    n = int(0.35 * SR); t = np.arange(n) / SR
    return fft_filter(rng.standard_normal(n), lo=7000) * np.exp(-t / (0.11 if open_ else 0.03))

def bass_note(freq, dur):
    n = int((dur + 0.05) * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(4 * np.pi * freq * t)
    return np.tanh(1.3 * s) * env_adsr(n, 0.006, 0.05, dur) * (0.75 + 0.25 * np.exp(-t / 0.1))

def impact():
    n = int(3.2 * SR); t = np.arange(n) / SR
    f = 34 + 40 * np.exp(-t / 0.12)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 1.1)
    nz = fft_filter(rng.standard_normal(n), hi=2500) * np.exp(-t / 0.35) * 0.5
    return np.tanh(1.4 * (sub + nz))

def reverse_swell(dur=1.6):
    n = int(dur * SR); t = np.arange(n) / SR
    nz = fft_filter(rng.standard_normal(n), lo=1500, hi=12000)
    s = nz * np.exp(-t / (dur * 0.35))
    s += 0.4 * np.sin(2 * np.pi * midi(74) * t) * np.exp(-t / (dur * 0.4))
    return s[::-1]

def whoosh(dur=0.8):
    n = int(dur * SR); t = np.arange(n) / SR
    nz = fft_filter(rng.standard_normal(n), lo=400, hi=4500)
    e = np.sin(np.pi * t / dur) ** 3
    pan = np.linspace(-0.8, 0.8, n)
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return np.stack([nz * e * l, nz * e * r], axis=1) * np.sqrt(2)

def water_drop():
    n = int(0.8 * SR); t = np.arange(n) / SR
    f = 380 + 900 * (1 - np.exp(-t / 0.03))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.09) * np.minimum(1, t / 0.002)

# ---------- harmonia: D – A – Bm – G (1 compasso = 2 s cada) ----------
CHORDS = [
    (38, [50, 62, 66, 69]),  # D
    (33, [45, 61, 64, 69]),  # A
    (35, [47, 62, 66, 71]),  # Bm
    (31, [43, 62, 67, 71]),  # G
]
BAR = 4 * BEAT

s_cre, s_ori, s_mis, s_ass = starts[1], starts[2], starts[8], starts[9]
logo_hit = fs(s_ori + 45)
groove_on = fs(s_ori + 60)
groove_off = fs(s_mis)
end_hit = fs(s_ass + 15)
mom_start = starts[7] + 60

# Intro: drone em Ré + brilho agudo
add(pad_voice(midi(50), fs(s_cre) + 0.5, att=2.5) + pad_voice(midi(57), fs(s_cre) + 0.5, att=3.0), 0, 0.055)
n = int(fs(s_cre) * SR); t = np.arange(n) / SR
add(np.sin(2 * np.pi * midi(86) * t) * (0.5 + 0.5 * np.sin(2 * np.pi * 3 * t)) * np.minimum(1, t / 2.5), 0, 0.012)
add(water_drop(), fs(40), 0.10)
add(kick(), fs(40), 0.08)

# Progressão de acordes (pad + baixo + arpejo) a partir da cena 2
t0 = fs(s_cre)
bar_i = 0
tt = t0
final_chord_t = end_hit
while tt < final_chord_t - 0.01:
    root, voices = CHORDS[bar_i % 4]
    for v in voices:
        add(pad_voice(midi(v), BAR, rel=1.0, att=0.35), tt, 0.032, pan=rng.uniform(-0.4, 0.4))
    # arpejo em colcheias
    arp = [voices[1] + 12, voices[2] + 12, voices[3] + 12, voices[1] + 24]
    pattern = [0, 1, 2, 3, 2, 1, 2, 3]
    for k, pi in enumerate(pattern):
        at = tt + k * BEAT / 2
        if at >= final_chord_t: break
        g = 0.05 if at < groove_on else 0.06
        if groove_off <= at < end_hit: g = 0.07
        add(pluck(midi(arp[pi])), at, g, pan=(-0.45 if k % 2 == 0 else 0.45))
    # baixo só no groove
    for k in range(8):
        at = tt + k * BEAT / 2
        if groove_on <= at < groove_off:
            add(bass_note(midi(root + 12), BEAT / 2 * 0.8), at, 0.11)
    tt += BAR
    bar_i += 1

# Acorde final sustentado
for v in [50, 57, 62, 66, 69, 74]:
    add(pad_voice(midi(v), T - end_hit - 1.2, rel=1.2, att=0.2), end_hit, 0.04, pan=rng.uniform(-0.5, 0.5))

# Bateria: kick suave antes do logo, groove completo depois
b = fs(s_cre) + 2 * BAR
while b < logo_hit - 0.6:
    add(kick(), b, 0.16); b += 2 * BEAT
b = groove_on
k = 0
while b < groove_off - 0.01:
    add(kick(), b, 0.30)
    if k % 2 == 1: add(clap(), b, 0.11, pan=0.05)
    add(hat(), b + BEAT / 2, 0.05, pan=0.3)
    add(hat(), b + BEAT / 4, 0.018, pan=-0.3)
    b += BEAT; k += 1

# Acentos nas palavras da cena "Para cada momento"
for i in range(6):
    add(hat(open_=True), fs(mom_start + 15 * i), 0.05, pan=(-0.3 if i % 2 else 0.3))
    add(pluck(midi(86 - (i % 3) * 2), decay=0.15), fs(mom_start + 15 * i), 0.035)

# Impactos e risers
for hit in (logo_hit, end_hit):
    rs = reverse_swell(1.6)
    add(rs, hit - len(rs) / SR, 0.11)
    add(impact(), hit, 0.42)

# Whooshes nas transições
for i in range(1, len(starts) - 1):
    mid = fs(starts[i] + trans[i - 1] / 2)
    if abs(mid - logo_hit) < 0.6: continue
    add(whoosh(0.8), mid - 0.4, 0.07)

# ---------- side-chain leve (o pad "respira" com o kick) ----------
duck = np.ones(N)
b = groove_on
while b < groove_off:
    i0 = int(b * SR); n = min(int(0.4 * SR), N - i0)
    tt_ = np.arange(n) / SR
    duck[i0:i0 + n] = np.minimum(duck[i0:i0 + n], 1 - 0.3 * np.exp(-tt_ / 0.12))
    b += BEAT
out *= duck[:, None]

# ---------- reverb (convolução com resposta impulsiva sintética) ----------
irn = int(2.6 * SR); ti = np.arange(irn) / SR
ir = rng.standard_normal((irn, 2)) * np.exp(-ti / 0.65)[:, None]
ir = fft_filter(ir, hi=6000)
ir /= np.sqrt((ir ** 2).sum(axis=0))
L = 1 << int(np.ceil(np.log2(N + irn)))
wet = np.fft.irfft(np.fft.rfft(out, L, axis=0) * np.fft.rfft(ir, L, axis=0), L, axis=0)[:N]
mix = out * 0.82 + wet * 0.33

# master: corte de graves inúteis, fade final, limitador suave
mix = fft_filter(mix, lo=28)
fade = np.ones(N); fl = int(2.0 * SR); fade[-fl:] = np.linspace(1, 0, fl) ** 2
fi = int(0.05 * SR); fade[:fi] = np.linspace(0, 1, fi)
mix *= fade[:, None]
mix /= np.max(np.abs(mix)) + 1e-9
mix = np.tanh(1.2 * mix) / np.tanh(1.2)
mix *= 0.89

dst = sys.argv[1] if len(sys.argv) > 1 else str(ROOT / 'public' / 'audio' / 'trilha_raw.wav')
pcm = (mix * 32767).astype('<i2')
with wave.open(dst, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print(f'ok {dst} {T:.2f}s logo_hit={logo_hit:.2f}s end_hit={end_hit:.2f}s')
