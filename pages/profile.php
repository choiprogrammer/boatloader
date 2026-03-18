<?php
$editMode = isset($_GET['edit']) && $_GET['edit'] === '1';
$updated = isset($_GET['updated']) && $_GET['updated'] === '1';
?>

<div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h2 class="text-4xl font-bold text-white">Profile Settings</h2>
        <?php if (!$editMode): ?>
            <a href="index.php?page=profile&edit=1" 
               class="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <i class="fas fa-edit"></i>
                Edit Profile
            </a>
        <?php endif; ?>
    </div>
    
    <?php if ($updated): ?>
        <div class="bg-green-900/20 border border-green-800 rounded-lg p-4 mb-6 flex items-center gap-3">
            <i class="fas fa-check-circle text-green-400 text-2xl"></i>
            <p class="text-green-400">Profile updated successfully!</p>
        </div>
    <?php endif; ?>
    
    <div class="bg-gray-900 border border-gray-800 rounded-lg p-8">
        <form method="POST" action="index.php" class="space-y-6">
            <input type="hidden" name="action" value="update_profile">
            
            <div>
                <label class="block text-white text-lg mb-3">Username</label>
                <input
                    type="text"
                    name="username"
                    value="<?php echo htmlspecialchars($_SESSION['profile']['username']); ?>"
                    <?php echo !$editMode ? 'disabled' : ''; ?>
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg <?php echo $editMode ? 'focus:outline-none focus:border-orange-500' : 'opacity-75 cursor-not-allowed'; ?>"
                />
            </div>
            
            <div>
                <label class="block text-white text-lg mb-3">Email</label>
                <input
                    type="email"
                    name="email"
                    value="<?php echo htmlspecialchars($_SESSION['profile']['email']); ?>"
                    <?php echo !$editMode ? 'disabled' : ''; ?>
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg <?php echo $editMode ? 'focus:outline-none focus:border-orange-500' : 'opacity-75 cursor-not-allowed'; ?>"
                />
            </div>
            
            <div>
                <label class="block text-white text-lg mb-3">Minecraft Version</label>
                <select
                    name="minecraftVersion"
                    <?php echo !$editMode ? 'disabled' : ''; ?>
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg <?php echo $editMode ? 'focus:outline-none focus:border-orange-500' : 'opacity-75 cursor-not-allowed'; ?>"
                >
                    <option value="1.20.1" <?php echo $_SESSION['profile']['minecraftVersion'] === '1.20.1' ? 'selected' : ''; ?>>1.20.1</option>
                    <option value="1.19.4" <?php echo $_SESSION['profile']['minecraftVersion'] === '1.19.4' ? 'selected' : ''; ?>>1.19.4</option>
                    <option value="1.18.2" <?php echo $_SESSION['profile']['minecraftVersion'] === '1.18.2' ? 'selected' : ''; ?>>1.18.2</option>
                    <option value="1.16.5" <?php echo $_SESSION['profile']['minecraftVersion'] === '1.16.5' ? 'selected' : ''; ?>>1.16.5</option>
                </select>
            </div>
            
            <div>
                <label class="block text-white text-lg mb-3">Preferred Mod Loader</label>
                <select
                    name="preferredLoader"
                    <?php echo !$editMode ? 'disabled' : ''; ?>
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg <?php echo $editMode ? 'focus:outline-none focus:border-orange-500' : 'opacity-75 cursor-not-allowed'; ?>"
                >
                    <option value="Forge" <?php echo $_SESSION['profile']['preferredLoader'] === 'Forge' ? 'selected' : ''; ?>>Forge</option>
                    <option value="Fabric" <?php echo $_SESSION['profile']['preferredLoader'] === 'Fabric' ? 'selected' : ''; ?>>Fabric</option>
                    <option value="NeoForge" <?php echo $_SESSION['profile']['preferredLoader'] === 'NeoForge' ? 'selected' : ''; ?>>NeoForge</option>
                </select>
            </div>
            
            <div>
                <label class="block text-white text-lg mb-3">Favorite Category</label>
                <select
                    name="favoriteCategory"
                    <?php echo !$editMode ? 'disabled' : ''; ?>
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg <?php echo $editMode ? 'focus:outline-none focus:border-orange-500' : 'opacity-75 cursor-not-allowed'; ?>"
                >
                    <option value="Tech" <?php echo $_SESSION['profile']['favoriteCategory'] === 'Tech' ? 'selected' : ''; ?>>Tech</option>
                    <option value="Adventure" <?php echo $_SESSION['profile']['favoriteCategory'] === 'Adventure' ? 'selected' : ''; ?>>Adventure</option>
                    <option value="Magic" <?php echo $_SESSION['profile']['favoriteCategory'] === 'Magic' ? 'selected' : ''; ?>>Magic</option>
                    <option value="Performance" <?php echo $_SESSION['profile']['favoriteCategory'] === 'Performance' ? 'selected' : ''; ?>>Performance</option>
                    <option value="Utility" <?php echo $_SESSION['profile']['favoriteCategory'] === 'Utility' ? 'selected' : ''; ?>>Utility</option>
                </select>
            </div>
            
            <div>
                <label class="block text-white text-lg mb-3">Bio</label>
                <textarea
                    name="bio"
                    rows="4"
                    <?php echo !$editMode ? 'disabled' : ''; ?>
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg resize-none <?php echo $editMode ? 'focus:outline-none focus:border-orange-500' : 'opacity-75 cursor-not-allowed'; ?>"
                ><?php echo htmlspecialchars($_SESSION['profile']['bio']); ?></textarea>
            </div>
            
            <?php if ($editMode): ?>
                <div class="flex gap-4">
                    <button
                        type="submit"
                        class="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <i class="fas fa-check"></i>
                        Save Changes
                    </button>
                    <a
                        href="index.php?page=profile"
                        class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <i class="fas fa-times"></i>
                        Cancel
                    </a>
                </div>
            <?php endif; ?>
        </form>
    </div>
</div>
