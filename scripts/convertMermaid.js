const fs = require('fs');
const { exec } = require('child_process');

const input = './content/mmd/beginner.mmd'; // Mermaid 源文件路径
const output = './content/mmd/beginner.svg'; // 输出的 SVG 文件路径

exec(`mmdc -i ${input} -o ${output}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`标准输出: ${stdout}`);
  console.error(`标准错误: ${stderr}`);
});
