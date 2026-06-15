const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/"\/images\//g, '"./images/');
  content = content.replace(/'\/images\//g, "'./images/");
  content = content.replace(/`\/images\//g, "`./images/");
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
  }
}

function walk(dir) {
  let list = fs.readdirSync(dir);
  for (let file of list) {
    let full = path.join(dir, file);
    let stat = fs.statSync(full);
    if (stat && stat.isDirectory()) walk(full);
    else if (full.endsWith('.ts') || full.endsWith('.tsx') || full.endsWith('.json')) replaceInFile(full);
  }
}

walk('./src');
replaceInFile('./vite.config.ts');
