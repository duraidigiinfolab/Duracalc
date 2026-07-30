const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.css')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const files = walkSync('C:\\Rakesh\\Projects\\calculator_app\\apps\\web\\src');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (file.endsWith('globals.css')) {
    content = content.replace(/background-color: #F8FAFC;/g, 'background-color: #FFFFFF;');
    fs.writeFileSync(file, content);
    continue;
  }

  // Layout changes
  content = content.replace(/bg-zinc-950/g, 'bg-[#FFFFFF]');
  content = content.replace(/text-zinc-50/g, 'text-[#2563EB]');

  // Background and borders
  content = content.replace(/bg-zinc-900\/[0-9]+/g, 'bg-[#FFFFFF]');
  content = content.replace(/bg-zinc-900/g, 'bg-[#FFFFFF]');
  content = content.replace(/border-zinc-800\/[0-9]+/g, 'border-[#E5E7EB]');
  content = content.replace(/border-zinc-800/g, 'border-[#E5E7EB]');

  // Text colors
  content = content.replace(/text-zinc-400/g, 'text-gray-600');
  content = content.replace(/text-zinc-300/g, 'text-gray-700');
  content = content.replace(/text-zinc-200/g, 'text-[#2563EB]');
  content = content.replace(/text-zinc-100/g, 'text-[#2563EB]');
  content = content.replace(/text-zinc-500/g, 'text-gray-500');

  // Input placeholders and background
  content = content.replace(/placeholder-zinc-700/g, 'placeholder-gray-400');
  
  // Specific blocks
  content = content.replace(/bg-zinc-800\/[0-9]+/g, 'bg-[#E5E7EB]');
  content = content.replace(/bg-zinc-800/g, 'bg-[#E5E7EB]');
  
  content = content.replace(/hover:bg-zinc-800\/[0-9]+/g, 'hover:bg-gray-100');
  content = content.replace(/hover:bg-zinc-700\/[0-9]+/g, 'hover:bg-gray-300');
  content = content.replace(/hover:bg-zinc-700/g, 'hover:bg-gray-300');
  
  // Gradients for titles
  content = content.replace(/from-purple-400 via-pink-400 to-blue-400/g, 'from-[#2563EB] to-blue-400');
  content = content.replace(/from-purple-400 to-blue-400/g, 'from-[#2563EB] to-blue-400');
  content = content.replace(/from-blue-400 to-cyan-400/g, 'from-[#2563EB] to-blue-400');

  // In basic-calculator keypad, there are text colors for numbers and functions
  content = content.replace(/text-cyan-300/g, 'text-[#2563EB]');
  content = content.replace(/text-blue-400/g, 'text-[#2563EB]');

  // Non-button text-white replacements (heuristics)
  // We want to keep text-white for buttons like bg-blue-600 text-white, but change it for headers.
  // Actually, "text-white" might be used for headings like "EMI Calculator", "Basic Calculator".
  content = content.replace(/text-white mb-3/g, 'text-[#2563EB] mb-3');
  content = content.replace(/text-white break-all/g, 'text-[#2563EB] break-all');
  
  fs.writeFileSync(file, content);
}
console.log('UI updated');
