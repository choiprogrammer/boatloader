<div class="max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-white mb-8">Dashboard</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
                <i class="fas fa-folder-open text-orange-500 text-3xl"></i>
                <span class="text-3xl font-bold text-white"><?php echo count($mods); ?></span>
            </div>
            <h3 class="text-gray-400 text-lg">Available Mods</h3>
        </div>
        
        <div class="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
                <i class="fas fa-check-circle text-green-500 text-3xl"></i>
                <span class="text-3xl font-bold text-white"><?php echo count($_SESSION['selectedMods']); ?></span>
            </div>
            <h3 class="text-gray-400 text-lg">Selected Mods</h3>
        </div>
        
        <div class="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
                <i class="fas fa-boxes text-blue-500 text-3xl"></i>
                <span class="text-3xl font-bold text-white">3</span>
            </div>
            <h3 class="text-gray-400 text-lg">My Modpacks</h3>
        </div>
    </div>
    
    <div class="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h3 class="text-2xl font-bold text-white mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="index.php?page=mods" class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg text-left transition-colors block">
                <i class="fas fa-folder-open mr-3"></i>
                Browse Mod Library
            </a>
            <a href="index.php?page=compatibility" class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg text-left transition-colors block">
                <i class="fas fa-gauge mr-3"></i>
                Check Compatibility
            </a>
            <a href="index.php?page=modpacks" class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg text-left transition-colors block">
                <i class="fas fa-plus mr-3"></i>
                Create New Modpack
            </a>
            <a href="index.php?page=profile" class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg text-left transition-colors block">
                <i class="fas fa-cog mr-3"></i>
                Edit Profile
            </a>
        </div>
    </div>
</div>
