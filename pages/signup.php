<div class="min-h-screen bg-gray-950 flex">
    <div class="w-80 bg-gray-900 border-r border-gray-800 p-6 flex items-center justify-center">
        <div class="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="120" height="120" class="mx-auto mb-4">
                <defs>
                    <linearGradient id="blockGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#fb923c;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="blockGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#fdba74;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#fb923c;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="blockGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ea580c;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#c2410c;stop-opacity:1" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                <g filter="url(#glow)">
                    <polygon points="100,140 140,120 140,80 100,100" fill="url(#blockGradient1)" stroke="#1f2937" stroke-width="2"/>
                    <polygon points="60,120 100,100 140,120 100,140" fill="url(#blockGradient2)" stroke="#1f2937" stroke-width="2"/>
                    <polygon points="60,120 100,140 100,100 60,80" fill="url(#blockGradient3)" stroke="#1f2937" stroke-width="2"/>
                    <polygon points="90,100 130,80 130,40 90,60" fill="url(#blockGradient1)" stroke="#1f2937" stroke-width="2"/>
                    <polygon points="50,80 90,60 130,80 90,100" fill="url(#blockGradient2)" stroke="#1f2937" stroke-width="2"/>
                    <polygon points="50,80 90,100 90,60 50,40" fill="url(#blockGradient3)" stroke="#1f2937" stroke-width="2"/>
                    <polygon points="105,75 135,60 135,35 105,50" fill="url(#blockGradient1)" stroke="#1f2937" stroke-width="2"/>
                    <polygon points="75,60 105,50 135,60 105,75" fill="url(#blockGradient2)" stroke="#1f2937" stroke-width="2"/>
                    <polygon points="75,60 105,75 105,50 75,35" fill="url(#blockGradient3)" stroke="#1f2937" stroke-width="2"/>
                    <rect x="92" y="102" width="6" height="6" fill="#fdba74" opacity="0.6"/>
                    <rect x="110" y="92" width="6" height="6" fill="#fdba74" opacity="0.6"/>
                    <rect x="102" y="52" width="6" height="6" fill="#fdba74" opacity="0.6"/>
                    <rect x="118" y="45" width="5" height="5" fill="#fdba74" opacity="0.6"/>
                    <rect x="95" y="130" width="6" height="6" fill="#1f2937" opacity="0.4"/>
                    <rect x="68" y="110" width="6" height="6" fill="#1f2937" opacity="0.4"/>
                </g>
            </svg>
            <h1 class="text-3xl font-bold text-white">ChunkBase</h1>
            <p class="text-gray-400 text-sm mt-2">Modpack Manager</p>
        </div>
    </div>
    
    <div class="flex-1 flex items-center justify-center p-8">
        <div class="w-full max-w-md">
            <h2 class="text-5xl font-bold text-white mb-12 text-center">Sign Up</h2>
            
            <form method="POST" action="index.php" class="space-y-6">
                <input type="hidden" name="action" value="signup">
                
                <div>
                    <label class="block text-white text-lg mb-3">Username</label>
                    <input
                        type="text"
                        name="username"
                        required
                        class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-4 text-white text-lg focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Enter username"
                    />
                </div>
                
                <div>
                    <label class="block text-white text-lg mb-3">Email address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-4 text-white text-lg focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Enter email"
                    />
                </div>
                
                <div>
                    <label class="block text-white text-lg mb-3">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-4 text-white text-lg focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Enter password"
                    />
                </div>
                
                <div class="pt-4">
                    <p class="text-gray-400 text-center mb-4">
                        Already have an account? 
                        <a href="index.php?page=login" class="text-orange-500 hover:text-orange-400 font-medium">
                            Log In
                        </a>
                    </p>
                    
                    <button
                        type="submit"
                        class="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded-lg text-xl transition-colors"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>