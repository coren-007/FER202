const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

// Spread: tạo bản sao mới mà không thay đổi bản gốc
const company0New = { ...companies[0], start: companies[0].start + 1 };

// Hàm concatAll
const concatAll = (...arrays) => arrays.flat();

// In kết quả
console.log(companies[0]);    // { name: 'Company One', start: 1981, end: 2004 }
console.log(company0New);     // { name: 'Company One', start: 1982, end: 2004 }
console.log(concatAll([1, 2], [3], [4, 5])); // [1, 2, 3, 4, 5]
