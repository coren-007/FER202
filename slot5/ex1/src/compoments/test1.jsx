export function Test1() {
    // Các hàm trong Exercise1
  const double = x => x * 2;
  const isPositive = x => x > 0;

return (
    <div>
      <h1>test1</h1>
      <p>This is the first exercise component.</p>
      <h2>Chi tiet bai tap 1</h2>
      <p>Double of 5 is: {double(5)}</p>
      <p>isPositive: {isPositive(10909)? "So duong": "So am"}</p>
    </div>


  );
}