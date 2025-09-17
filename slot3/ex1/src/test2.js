// Hàm tính tổng
const sum = (...nums) => {
  return nums.reduce((acc, num) => {
    return !isNaN(num) && typeof num === 'number' ? acc + num : acc;
  }, 0);
};

// Hàm tính trung bình
const avg = (...nums) => {
  if (nums.length === 0) return 0;
  const total = nums.reduce((acc, num) => {
    return !isNaN(num) && typeof num === 'number' ? acc + num : acc;
  }, 0);
  return (total / nums.length).toFixed(2);
};

// In kết quả
console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 'x', 4));      // 5
console.log(avg(1, 2, 3, 4));     // 2.50
console.log(avg());               // 0