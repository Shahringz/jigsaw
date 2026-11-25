import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { assetHref } from './i18n';

const available = (file: string) => existsSync(resolve(process.cwd(), 'public/type', file));
const face = (family: string, file: string, weight: number, format: string) =>
  '@font-face{font-family:"'+family+'";src:url("'+assetHref('type/'+encodeURIComponent(file))+'") format("'+format+'");font-weight:'+weight+';font-display:swap}';
const arabic = [
  ['Regular', 400], ['Medium', 500], ['SemiBold', 600], ['Bold', 700],
] as const;
const digiRegular = ['Digi-Hamishe-Regular.woff2', 'Digi Hamishe Regular(1).ttf', 'Digi-Hamishe-Regular.ttf'].find(available);
const digiBold = ['Digi-Hamishe-Bold.woff2', 'Digi Hamishe Bold(1).ttf', 'Digi-Hamishe-Bold.ttf'].find(available);
const fontFormat = (file: string) => file.endsWith('.woff2') ? 'woff2' : 'truetype';
const digiCSS = digiRegular && digiBold
  ? face('Digi Hamishe',digiRegular,400,fontFormat(digiRegular)) + face('Digi Hamishe',digiBold,700,fontFormat(digiBold))
  : '';
const hasArabic = arabic.every(([name]) => available('IBMPlexSansArabic-'+name+'.ttf')) && available('IBM-Plex-Arabic-OFL.txt');
export const nativeFontCSS = [
  hasArabic ? arabic.map(([name,weight]) => face('IBM Plex Sans Arabic','IBMPlexSansArabic-'+name+'.ttf',weight,'truetype')).join('\n') : '',
  digiCSS,
].join('\n');
export const nativeHeadingFont = (locale: string) =>
  locale === 'ar' && hasArabic ? assetHref('type/IBMPlexSansArabic-Bold.ttf') :
  locale === 'fa' && digiRegular && digiBold ? assetHref('type/'+encodeURIComponent(digiBold)) :
  locale === 'en' ? assetHref('type/sora-bold.woff2') : assetHref('type/estedad-fa.woff2');
