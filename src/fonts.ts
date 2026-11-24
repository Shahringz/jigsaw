import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { assetHref } from './i18n';

const available = (file: string) => existsSync(resolve(process.cwd(), 'public/type', file));
const face = (family: string, file: string, weight: number, format: string) =>
  '@font-face{font-family:"'+family+'";src:url("'+assetHref('type/'+file)+'") format("'+format+'");font-weight:'+weight+';font-display:swap}';
const arabic = [
  ['Regular', 400], ['Medium', 500], ['SemiBold', 600], ['Bold', 700],
] as const;
const digiRegular = 'Digi-Hamishe-Regular.woff2';
const digiBold = 'Digi-Hamishe-Bold.woff2';
const hasDigi = available(digiRegular) && available(digiBold);
const hasArabic = arabic.every(([name]) => available('IBMPlexSansArabic-'+name+'.ttf')) && available('IBM-Plex-Arabic-OFL.txt');
export const nativeFontCSS = [
  hasArabic ? arabic.map(([name,weight]) => face('IBM Plex Sans Arabic','IBMPlexSansArabic-'+name+'.ttf',weight,'truetype')).join('\n') : '',
  hasDigi ? face('Digi Hamishe',digiRegular,400,'woff2') + face('Digi Hamishe',digiBold,700,'woff2') : '',
].join('\n');
export const nativeHeadingFont = (locale: string) =>
  locale === 'ar' && hasArabic ? assetHref('type/IBMPlexSansArabic-Bold.ttf') :
  locale === 'fa' && hasDigi ? assetHref('type/'+digiBold) :
  locale === 'en' ? assetHref('type/sora-bold.woff2') : assetHref('type/estedad-fa.woff2');
