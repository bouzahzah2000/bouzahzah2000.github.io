class DebugConsole {
    constructor() {
        this.createConsoleElement();
        this.isVisible = false;
        this.maxLogs = 100; // Maximum number of logs to keep
        this.setupKeyboardShortcut();
    }

    createConsoleElement() {
        // Create console container
        this.consoleElement = document.createElement('div');
        this.consoleElement.id = 'debugConsole';
        this.consoleElement.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 300px;
            background-color: rgba(0, 0, 0, 0.9);
            color: #fff;
            font-family: monospace;
            font-size: 14px;
            z-index: 9999;
            display: none;
            flex-direction: column;
        `;

        // Create console header
        const header = document.createElement('div');
        header.style.cssText = `
            padding: 8px;
            background-color: #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        header.innerHTML = `
            <span>Debug Console</span>
            <div>
                <button onclick="debugConsole.clear()" style="margin-right: 10px;">Clear</button>
                <button onclick="debugConsole.toggle()">Close</button>
            </div>
        `;

        // Create console output area
        this.outputElement = document.createElement('div');
        this.outputElement.style.cssText = `
            flex-grow: 1;
            overflow-y: auto;
            padding: 10px;
        `;

        // Assemble console
        this.consoleElement.appendChild(header);
        this.consoleElement.appendChild(this.outputElement);
        document.body.appendChild(this.consoleElement);
    }

    setupKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            // Toggle console with Ctrl + Shift + D
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    log(...args) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        
        const timestamp = new Date().toLocaleTimeString();
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
            }
            return String(arg);
        }).join(' ');

        logEntry.innerHTML = `<span style="color: #888;">[${timestamp}]</span> ${message}`;
        this.outputElement.appendChild(logEntry);

        // Trim old logs if exceeding maxLogs
        while (this.outputElement.children.length > this.maxLogs) {
            this.outputElement.removeChild(this.outputElement.firstChild);
        }

        // Auto-scroll to bottom
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    error(...args) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry error';
        logEntry.style.color = '#ff4444';
        
        const timestamp = new Date().toLocaleTimeString();
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
            }
            return String(arg);
        }).join(' ');

        logEntry.innerHTML = `<span style="color: #888;">[${timestamp}]</span> ❌ ${message}`;
        this.outputElement.appendChild(logEntry);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    warn(...args) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry warning';
        logEntry.style.color = '#ffaa00';
        
        const timestamp = new Date().toLocaleTimeString();
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
            }
            return String(arg);
        }).join(' ');

        logEntry.innerHTML = `<span style="color: #888;">[${timestamp}]</span> ⚠️ ${message}`;
        this.outputElement.appendChild(logEntry);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    clear() {
        this.outputElement.innerHTML = '';
    }

    toggle() {
        this.isVisible = !this.isVisible;
        this.consoleElement.style.display = this.isVisible ? 'flex' : 'none';
    }
}

// Initialize global debug console
window.debugConsole = new DebugConsole();

// Override console methods to also log to debug console
const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn
};

console.log = function(...args) {
    originalConsole.log.apply(console, args);
    debugConsole.log(...args);
};

console.error = function(...args) {
    originalConsole.error.apply(console, args);
    debugConsole.error(...args);
};

console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    debugConsole.warn(...args);
};
