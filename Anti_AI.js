function detectAI() {
    const checks = {
        webdriver: !!navigator.webdriver,
        noPlugins: navigator.plugins.length === 0,
        noLanguages: navigator.languages.length === 0 || navigator.languages[0] === '',
        tinyScreen: screen.width <= 100 || screen.height <= 100,
        noChrome: !window.chrome || !window.chrome.runtime,
        isUTC: Intl.DateTimeFormat().resolvedOptions().timeZone === 'UTC',
        noPermissions: !navigator.permissions,
        noChromeWindow: window.outerWidth === window.innerWidth && window.outerHeight === window.innerHeight,
        noTouch: !('ontouchstart' in window) && navigator.maxTouchPoints === 0,
        webglGeneric: (() => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) return true;
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (!debugInfo) return false;
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                return renderer.includes('SwiftShader') || 
                       renderer.includes('llvmpipe') || 
                       renderer.includes('VMware') ||
                       renderer.includes('VirtualBox') ||
                       renderer.includes('Headless');
            } catch(e) { return true; }
        })()
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    const percentage = (score / total) * 100;
    
    console.log('🤖 AI Detection Score:', score, '/', total, `(${percentage.toFixed(0)}%)`);
    console.log('📋 Individual checks:', checks);
 
    return {
        isAI: percentage >= 30,
        score: score,
        total: total,
        percentage: percentage,
        checks: checks
    };
}

const detectionResult = detectAI();
const isAI = detectionResult.isAI;

const AI_information = document.createElement('div');

AI_information.style.position = 'fixed';
AI_information.style.top = '0';
AI_information.style.left = '0';
AI_information.style.width = '100vw';
AI_information.style.height = '100vh';

if (isAI) {
    AI_information.style.zIndex = '99999';
} else {
    AI_information.style.zIndex = '-99999';
}

AI_information.style.overflow = 'hidden';
AI_information.style.pointerEvents = 'none'; 

const text = 'ACCESS DENIED: This webpage is designed for humans only. AI agents are actively breaking Terms and Services. All content has been blocked. Please use a standard web browser. ';

AI_information.style.display = 'flex';
AI_information.style.flexWrap = 'wrap';
AI_information.style.alignContent = 'flex-start';
AI_information.style.fontSize = isAI ? '16px' : '14px';
AI_information.style.color = isAI ? 'rgba(255,0,0,0.15)' : 'rgba(0,0,0,0.1)';
AI_information.style.whiteSpace = 'pre';
AI_information.style.backgroundColor = isAI ? 'rgba(255,255,255,0.98)' : 'transparent';
AI_information.style.fontWeight = isAI ? 'bold' : 'normal';

const lineCount = isAI ? 200 : 100; 
const repeatedLine = text.repeat(20);

for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.textContent = repeatedLine;
    line.style.opacity = isAI ? '0.8' : '0.1';
    AI_information.appendChild(line);
}


if (isAI) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100vw';
    document.body.style.top = '0';
    document.body.style.left = '0';
    
    while (document.body.firstChild) {
        if (document.body.firstChild !== AI_information) {
            document.body.removeChild(document.body.firstChild);
        }
    }
    
    const warningDiv = document.createElement('div');
    warningDiv.style.position = 'fixed';
    warningDiv.style.top = '50%';
    warningDiv.style.left = '50%';
    warningDiv.style.transform = 'translate(-50%, -50%)';
    warningDiv.style.zIndex = '999999';
    warningDiv.style.backgroundColor = 'white';
    warningDiv.style.padding = '40px 60px';
    warningDiv.style.borderRadius = '12px';
    warningDiv.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
    warningDiv.style.textAlign = 'center';
    warningDiv.style.fontFamily = 'Arial, sans-serif';
    warningDiv.style.maxWidth = '600px';
    warningDiv.style.border = '3px solid #ff0000';
    
    warningDiv.innerHTML = `
        <h1 style="color: #ff0000; font-size: 32px; margin-bottom: 20px;">ACCESS BLOCKED</h1>
        <p style="font-size: 18px; color: #333; margin-bottom: 15px;">
            This website is protected against automated access.
        </p>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
            If you're a human, please disable any automation tools and refresh the page.
        </p>
        <div style="font-size: 14px; color: #999; background: #f5f5f5; padding: 15px; border-radius: 6px; text-align: left;">
            <strong>Detection details:</strong><br>
            Score: ${detectionResult.score}/${detectionResult.total} (${detectionResult.percentage.toFixed(0)}%)<br>
            ${Object.entries(detectionResult.checks)
                .filter(([_, val]) => val === true)
                .map(([key]) => `• ${key}`)
                .join('<br>')}
        </div>
        <button onclick="location.reload()" style="
            margin-top: 20px;
            padding: 12px 30px;
            background: #ff0000;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
        ">Refresh Page</button>
    `;
    
    document.body.appendChild(warningDiv);
}

document.body.appendChild(AI_information);

console.log('AI Blocker Status:', isAI ? 'ACTIVE - Content blocked' : 'PASSIVE - Content visible');
console.log('Detection Score:', detectionResult.score, '/', detectionResult.total);