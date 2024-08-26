/** @type {import("..").ICase[]} */
const testCases = [
  { keyword_1: "TOLI DARLIA CORINA SILLA", keyword_2: "Tolidarlia corina silla", expected: 100 },
  { keyword_1: "ZAHRADIFA KANIABILLA. ANANDA", keyword_2: "Zahradifa Kaniabilla Ananda", expected: 100 },
  { keyword_1: "TUBAGUS RAGIL SANTOSO", keyword_2: "TUBAGUS RAGIL SANTOSO, S.Pd.", expected: 100 },
  { keyword_1: "EMALIA TAT MA' INUL KULUB", keyword_2: "EMALIA TAT MA’ INUL KULUB", expected: 100 },
  { keyword_1: "John Doe", keyword_2: "John Doe ", expected: 100 },
  { keyword_1: "John Doe", keyword_2: "John Doe.", expected: 100 },
  { keyword_1: "John Doe", keyword_2: "John. Doe", expected: 100 },
  { keyword_1: "John Doe", keyword_2: "John Doe S.Pd", expected: 100 },
  { keyword_1: "John Doe Spd", keyword_2: "John Doe", expected: 100 },
  { keyword_1: "John Doe", keyword_2: "Johnny Doe", expected: 100 },
  { keyword_1: "Sabiq Muhammad .A.M.", keyword_2: "Sabiq Muhammad AM", expected: 100 },
  { keyword_1: "John Doe", keyword_2: "John Doe", expected: 100 },
  { keyword_1: "John Doe", keyword_2: "john doe", expected: 100 }, // Case-insensitive
  { keyword_1: "John Doe", keyword_2: "Jöhn Döe", expected: 99.9 }, // Diacritics
  { keyword_1: "John", keyword_2: "Jon", expected: 90 }, // Minor change
  { keyword_1: "John", keyword_2: "Jonathan", expected: 0 }, // Different length
  { keyword_1: "John O'Neill", keyword_2: "John O'Neil", expected: 99.9 }, // Apostrophe
  { keyword_1: "John-Doe", keyword_2: "John Doe", expected: 99.7 }, // Separator handling
  { keyword_1: "Néstor laMötte Barrière", keyword_2: "Nestor la Mote Barriere", expected: 99.7 }, // Separator handling
  { keyword_1: "Néstor laMötte Barrièrexxssss", keyword_2: "Nestor la Mote Barrierezzzxx", expected: 99.7 },
];

module.exports = { testCases };
