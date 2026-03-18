<div class="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
    <div class="p-6 border-b border-gray-800 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="60" height="60" class="mx-auto mb-3">
            <defs>
                <linearGradient id="blockGradient1-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fb923c;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="blockGradient2-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fdba74;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#fb923c;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="blockGradient3-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ea580c;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#c2410c;stop-opacity:1" />
                </linearGradient>
                <filter id="glow-sidebar">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>
            <g filter="url(#glow-sidebar)">
                <polygon points="100,140 140,120 140,80 100,100" fill="url(#blockGradient1-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <polygon points="60,120 100,100 140,120 100,140" fill="url(#blockGradient2-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <polygon points="60,120 100,140 100,100 60,80" fill="url(#blockGradient3-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <polygon points="90,100 130,80 130,40 90,60" fill="url(#blockGradient1-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <polygon points="50,80 90,60 130,80 90,100" fill="url(#blockGradient2-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <polygon points="50,80 90,100 90,60 50,40" fill="url(#blockGradient3-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <polygon points="105,75 135,60 135,35 105,50" fill="url(#blockGradient1-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <polygon points="75,60 105,50 135,60 105,75" fill="url(#blockGradient2-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <polygon points="75,60 105,75 105,50 75,35" fill="url(#blockGradient3-sidebar)" stroke="#1f2937" stroke-width="2"/>
                <rect x="92" y="102" width="6" height="6" fill="#fdba74" opacity="0.6"/>
                <rect x="110" y="92" width="6" height="6" fill="#fdba74" opacity="0.6"/>
                <rect x="102" y="52" width="6" height="6" fill="#fdba74" opacity="0.6"/>
                <rect x="118" y="45" width="5" height="5" fill="#fdba74" opacity="0.6"/>
            </g>
        </svg>
        <h1 class="text-2xl font-bold text-white">ChunkBase</h1>
        <p class="text-gray-400 text-xs mt-1">Modpack Manager</p>
    </div>
    
    <nav class="flex-1 p-4">
        <a href="index.php?page=dashboard" 
           class="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors <?php echo $page === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'; ?>">
            <i class="fas fa-home"></i>
            <span class="text-lg">Dashboard</span>
        </a>
        
        <a href="index.php?page=mods" 
           class="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors <?php echo $page === 'mods' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'; ?>">
            <i class="fas fa-folder-open"></i>
            <span class="text-lg">Mods</span>
        </a>
        
        <a href="index.php?page=modpacks" 
           class="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors <?php echo $page === 'modpacks' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'; ?>">
            <i class="fas fa-boxes"></i>
            <span class="text-lg">Modpacks</span>
        </a>
        
        <a href="index.php?page=compatibility" 
           class="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors <?php echo $page === 'compatibility' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'; ?>">
            <i class="fas fa-gauge"></i>
            <span class="text-lg">Compatibility</span>
        </a>
        
        <a href="index.php?page=profile" 
           class="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors <?php echo $page === 'profile' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'; ?>">
            <i class="fas fa-cog"></i>
            <span class="text-lg">Settings</span>
        </a>
    </nav>
    
    <div class="p-4 border-t border-gray-800">
        <a href="index.php?logout=1" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors">
            <i class="fas fa-sign-out-alt"></i>
            <span class="text-lg">Logout</span>
        </a>
    </div>
</div>