import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const directory = resolve('public/type');
await mkdir(directory, { recursive: true });
// Official Google Fonts source, pinned to IBM Plex Sans Arabic 1.101 (SIL OFL).
const base = 'https://raw.githubusercontent.com/google/fonts/2cf30108643373d19195f09bdba07de4317152ae/ofl/ibmplexsansarabic/';
const files = ['IBMPlexSansArabic-Regular.ttf','IBMPlexSansArabic-Medium.ttf','IBMPlexSansArabic-SemiBold.ttf','IBMPlexSansArabic-Bold.ttf','OFL.txt'];
await Promise.all(files.map(async (name) => {
  const target = resolve(directory, name === 'OFL.txt' ? 'IBM-Plex-Arabic-OFL.txt' : name);
  try {
    const existing = await readFile(target);
    if (existing.length > 1000) return;
  } catch {}
  try {
    const response = await fetch(base + name, { signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (name.endsWith('.ttf') && (bytes.length < 10000 || bytes.readUInt32BE(0) !== 0x00010000)) throw new Error('Invalid TTF');
    if (name === 'OFL.txt' && !bytes.toString().includes('SIL OPEN FONT LICENSE')) throw new Error('Invalid OFL license');
    await writeFile(target, bytes);
  } catch (error) {
    console.warn('Arabic font unavailable; existing Estedad fallback retained: ' + name + ': ' + error.message);
  }
}));
