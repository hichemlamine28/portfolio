
export async function generateFingerprint(): Promise<string> {
  try {
    const components = [];

    // 1. User Agent
    components.push(navigator.userAgent || '');

    // 2. Résolution d'écran
    components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);

    // 3. Timezone
    components.push(Intl.DateTimeFormat().resolvedOptions().timeZone || '');

    // 4. Langue
    components.push(navigator.language || '');

    // 5. Plugins installés (simplifié)
    const plugins = Array.from(navigator.plugins || [])
      .map(plugin => plugin.name)
      .sort()
      .join(',');
    components.push(plugins);

    // 6. Canvas fingerprint
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('DevSecOps Portfolio 🚀', 2, 2);
      components.push(canvas.toDataURL().substring(0, 50));
    }

    // 7. WebGL infos
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const renderer = gl.getParameter(gl.RENDERER);
      const vendor = gl.getParameter(gl.VENDOR);
      components.push(`${vendor}-${renderer}`);
    }

    // 8. Support des fonctionnalités
    const features = [
      'localStorage' in window,
      'sessionStorage' in window,
      'indexedDB' in window,
      'Worker' in window,
      'WebSocket' in window
    ];
    components.push(features.join(','));

    // Créer un hash simple mais unique
    const fingerprint = await hashString(components.join('|'));
    
    console.log('🔑 Empreinte générée:', fingerprint.substring(0, 16) + '...');
    return fingerprint;

  } catch (error) {
    console.error('Erreur génération empreinte:', error);
    // Fallback : utiliser timestamp + random
    return `fallback_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }
}

async function hashString(str: string): Promise<string> {
  try {
    // Utiliser l'API crypto du navigateur pour un hash SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback : hash simple
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }
}
