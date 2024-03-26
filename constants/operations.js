const sum = (num1, num2) => {
  console.log(process.argv);
  console.log(num1 + num2);
};
const res = (num1, num2) => console.log(num1 - num2);

if (process.argv[2] === "-sum") sum(+process.argv[3], +process.argv[4]);
if (process.argv[2] === "-res") res(+process.argv[3], +process.argv[4]);
