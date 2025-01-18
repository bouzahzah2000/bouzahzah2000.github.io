const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Function to copy directory recursively
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            // Skip debug-console.js
            if (entry.name === 'debug-console.js') {
                continue;
            }

            let content = fs.readFileSync(srcPath, 'utf8');

            // Remove debug console references from HTML files
            if (entry.name.endsWith('.html')) {
                content = content.replace(/<script src="js\/debug-console\.js"><\/script>/g, '');
                content = content.replace(/<button[^>]*onclick="debugConsole\.toggle\(\)"[^>]*>.*?<\/button>/g, '');
            }

            fs.writeFileSync(destPath, content);
        }
    }
}

// Copy all directories except node_modules and .git
const excludeDirs = ['node_modules', '.git', 'dist'];
const entries = fs.readdirSync(__dirname, { withFileTypes: true });

for (const entry of entries) {
    if (excludeDirs.includes(entry.name)) {
        continue;
    }

    const srcPath = path.join(__dirname, entry.name);
    const destPath = path.join(distDir, entry.name);

    if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
    } else {
        fs.copyFileSync(srcPath, destPath);
    }
}

console.log('Build completed! Production files are in the dist directory.');
