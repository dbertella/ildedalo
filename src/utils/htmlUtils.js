// Decode HTML entities in text content
export function decodeHtmlEntities(text) {
  if (!text) return '';
  
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™')
    .replace(/&euro;/g, '€')
    .replace(/&pound;/g, '£')
    .replace(/&cent;/g, '¢')
    .replace(/&deg;/g, '°')
    .replace(/&plusmn;/g, '±')
    .replace(/&times;/g, '×')
    .replace(/&divide;/g, '÷')
    .replace(/&frac12;/g, '½')
    .replace(/&frac14;/g, '¼')
    .replace(/&frac34;/g, '¾')
    .replace(/&sup1;/g, '¹')
    .replace(/&sup2;/g, '²')
    .replace(/&sup3;/g, '³')
    .replace(/&micro;/g, 'µ')
    .replace(/&para;/g, '¶')
    .replace(/&middot;/g, '·')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lsaquo;/g, '‹')
    .replace(/&rsaquo;/g, '›')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&dagger;/g, '†')
    .replace(/&Dagger;/g, '‡')
    .replace(/&bull;/g, '•')
    .replace(/&hellip;/g, '…')
    .replace(/&permil;/g, '‰')
    .replace(/&prime;/g, '′')
    .replace(/&Prime;/g, '″')
    .replace(/&sdot;/g, '⋅')
    .replace(/&frasl;/g, '⁄')
    .replace(/&weierp;/g, '℘')
    .replace(/&image;/g, 'ℑ')
    .replace(/&real;/g, 'ℜ')
    .replace(/&trade;/g, '™')
    .replace(/&alefsym;/g, 'ℵ')
    .replace(/&larr;/g, '←')
    .replace(/&uarr;/g, '↑')
    .replace(/&rarr;/g, '→')
    .replace(/&darr;/g, '↓')
    .replace(/&harr;/g, '↔')
    .replace(/&crarr;/g, '↵')
    .replace(/&lArr;/g, '⇐')
    .replace(/&uArr;/g, '⇑')
    .replace(/&rArr;/g, '⇒')
    .replace(/&dArr;/g, '⇓')
    .replace(/&hArr;/g, '⇔')
    .replace(/&forall;/g, '∀')
    .replace(/&part;/g, '∂')
    .replace(/&exist;/g, '∃')
    .replace(/&empty;/g, '∅')
    .replace(/&nabla;/g, '∇')
    .replace(/&isin;/g, '∈')
    .replace(/&notin;/g, '∉')
    .replace(/&ni;/g, '∋')
    .replace(/&prod;/g, '∏')
    .replace(/&sum;/g, '∑')
    .replace(/&minus;/g, '−')
    .replace(/&lowast;/g, '∗')
    .replace(/&radic;/g, '√')
    .replace(/&prop;/g, '∝')
    .replace(/&infin;/g, '∞')
    .replace(/&ang;/g, '∠')
    .replace(/&and;/g, '∧')
    .replace(/&or;/g, '∨')
    .replace(/&cap;/g, '∩')
    .replace(/&cup;/g, '∪')
    .replace(/&int;/g, '∫')
    .replace(/&there4;/g, '∴')
    .replace(/&sim;/g, '∼')
    .replace(/&cong;/g, '≅')
    .replace(/&asymp;/g, '≈')
    .replace(/&ne;/g, '≠')
    .replace(/&equiv;/g, '≡')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&sub;/g, '⊂')
    .replace(/&sup;/g, '⊃')
    .replace(/&nsub;/g, '⊄')
    .replace(/&sube;/g, '⊆')
    .replace(/&supe;/g, '⊇')
    .replace(/&oplus;/g, '⊕')
    .replace(/&otimes;/g, '⊗')
    .replace(/&perp;/g, '⊥')
    .replace(/&sdot;/g, '⋅')
    .replace(/&lceil;/g, '⌈')
    .replace(/&rceil;/g, '⌉')
    .replace(/&lfloor;/g, '⌊')
    .replace(/&rfloor;/g, '⌋')
    .replace(/&lang;/g, '〈')
    .replace(/&rang;/g, '〉')
    .replace(/&loz;/g, '◊')
    .replace(/&spades;/g, '♠')
    .replace(/&clubs;/g, '♣')
    .replace(/&hearts;/g, '♥')
    .replace(/&diams;/g, '♦');
}

// Decode HTML entities for multiple fields in an object
export function decodeHtmlEntitiesInObject(obj, fields = ['title', 'excerpt', 'content']) {
  if (!obj) return obj;
  
  const decoded = { ...obj };
  
  fields.forEach(field => {
    if (decoded[field]) {
      decoded[field] = decodeHtmlEntities(decoded[field]);
    }
  });
  
  return decoded;
}

// Decode HTML entities for an array of objects
export function decodeHtmlEntitiesInArray(array, fields = ['title', 'excerpt', 'content']) {
  if (!Array.isArray(array)) return array;
  
  return array.map(item => decodeHtmlEntitiesInObject(item, fields));
}

// Strip HTML tags from text
export function stripHtmlTags(text) {
  if (!text) return '';
  return text.replace(/<[^>]*>/g, '');
}

// Decode HTML entities and strip HTML tags
export function cleanText(text) {
  if (!text) return '';
  return decodeHtmlEntities(stripHtmlTags(text));
}

// Clean text for multiple fields in an object
export function cleanTextInObject(obj, fields = ['title', 'excerpt', 'content']) {
  if (!obj) return obj;
  
  const cleaned = { ...obj };
  
  fields.forEach(field => {
    if (cleaned[field]) {
      cleaned[field] = cleanText(cleaned[field]);
    }
  });
  
  return cleaned;
}

// Clean text for an array of objects
export function cleanTextInArray(array, fields = ['title', 'excerpt', 'content']) {
  if (!Array.isArray(array)) return array;
  
  return array.map(item => cleanTextInObject(item, fields));
} 