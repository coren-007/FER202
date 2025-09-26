export function Test2() {
  // khai báo mảng số nguyên
  const numbers = [1, 2, 3, 4, 5];
  // tính tổng các phần tử trong mảng
  const sum = numbers.reduce((total, number) => total + number, 0);
  // khai báo mảng tên
  const names = ['Nguyen Van A', 'Nguyen Van B', 'Nguyen Van C', 'Nguyen Van D', 'Nguyen Van E'];
  // khai báo mảng danh sách 10 người có id, name, age
  const people = [
    { id: 1, name: 'Nguyen Van A', age: 20 },
    { id: 2, name: 'Nguyen Van B', age: 15 },
    { id: 3, name: 'Nguyen Van C', age: 18 },
    { id: 4, name: 'Nguyen Van D', age: 17 },
    { id: 5, name: 'Nguyen Van E', age: 14 },
    { id: 6, name: 'Nguyen Van F', age: 22 },
    { id: 7, name: 'Nguyen Van G', age: 16 },
    { id: 8, name: 'Nguyen Van H', age: 13 },
    { id: 9, name: 'Nguyen Van I', age: 19 },
    { id: 10, name: 'Nguyen Van J', age: 21 },
  ];

  // sắp xếp mảng số nguyên tăng dần
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  // sắp xếp mảng tên tăng dần (theo bảng chữ cái)
  const sortedNames = [...names].sort();

  // lọc ra những người có tuổi từ 13 đến 19
  const teenPeople = people.filter(person => person.age >= 13 && person.age <= 19);

  // đếm số người tuổi teen
  const teenCount = teenPeople.length;

  // tính tuổi trung bình của nhóm tuổi teen
  const avgAge = teenCount > 0
    ? (teenPeople.reduce((total, person) => total + person.age, 0) / teenCount).toFixed(2)
    : 0;

  // khai báo mảng công ty
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

  const sortedCompanies = [...companies]
    .sort((a, b) => a.end - b.end)
    .slice(0, 3); // Lấy 3 công ty kết thúc sớm nhất

  // Spread operator
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // Hàm concatAll
  const concatAll = (...arrays) => arrays.flat();

  // In kết quả
  const concatResult = concatAll([1, 2], [3], [4, 5]);

  // Tính toán thống kê độ tuổi
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
  const stats = ages.reduce((acc, age) => {
    acc.total += age;
    acc.min = Math.min(acc.min, age);
    acc.max = Math.max(acc.max, age);

    if (age >= 13 && age <= 19) {
      acc.groups.teen++;
    } else if (age >= 20) {
      acc.groups.adult++;
    }

    return acc;
  }, {
    total: 0,
    min: Infinity,
    max: -Infinity,
    groups: { teen: 0, adult: 0 }
  });

  return (
    <div>
      <h2>Bài 2</h2>

      <p>Mảng số nguyên:</p>
      <ul>
        {numbers.map(number => (
          <li key={number}>{number}</li>
        ))}
      </ul>

      <p>Tổng các phần tử của mảng là: <strong>{sum}</strong></p>
      <p>Số lượng phần tử là: <strong>{numbers.length}</strong></p>

      <p>Mảng số nguyên sau khi sắp xếp tăng dần:</p>
      <ul>
        {sortedNumbers.map(number => (
          <li key={number}>{number}</li>
        ))}
      </ul>

      <p>Mảng tên:</p>
      <ul>
        {names.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <p>Mảng tên sau khi sắp xếp tăng dần:</p>
      <ul>
        {sortedNames.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <p>Danh sách 10 người:</p>
      <ul>
        {people.map(person => (
          <li key={person.id}>{person.name} - {person.age} tuổi</li>
        ))}
      </ul>

      <p>Danh sách người tuổi từ 13 đến 19:</p>
      <ul>
        {teenPeople.map(person => (
          <li key={person.id}>{person.name} - {person.age} tuổi</li>
        ))}
      </ul>

      <p>Số người tuổi teen (13-19): <strong>{teenCount}</strong></p>
      <p>Tuổi trung bình của người tuổi teen: <strong>{avgAge}</strong></p>

      <p>Top 3 công ty kết thúc sớm nhất:</p>
      <ul>
        {sortedCompanies.map(company => (
          <li key={company.name}>
            {company.name} - {company.end}
          </li>
        ))}
      </ul>

      <p>Ví dụ về Spread và Rest:</p>
      <p>{companies[0].name}, start = {companies[0].start}, end = {companies[0].end}</p>
      <p>{company0New.name}, start = {company0New.start}, end = {company0New.end}</p>
      <p>{concatResult.join(", ")}</p>
      <p>Total: {stats.total}, Min: {stats.min}, Max: {stats.max}</p>
      <p>Group: {`{ teen: ${stats.groups.teen}, adult: ${stats.groups.adult} }`}</p>
    </div>
  );
}
