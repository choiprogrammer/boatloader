<?php
$filteredMods = filterMods($searchQuery);
?>

<div class="max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-white mb-8">Mod Library</h2>
    
    <div class="mb-6">
        <form method="GET" action="index.php" class="relative">
            <input type="hidden" name="page" value="mods">
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
                type="text"
                name="search"
                placeholder="Search mods..."
                value="<?php echo htmlspecialchars($searchQuery); ?>"
                class="w-full bg-gray-900 border border-gray-800 rounded-lg pl-12 pr-4 py-4 text-white text-lg focus:outline-none focus:border-orange-500 transition-colors"
            />
        </form>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <?php foreach ($filteredMods as $mod): ?>
            <?php $isSelected = in_array($mod['id'], $_SESSION['selectedMods']); ?>
            <div class="bg-gray-900 border-2 rounded-lg p-6 cursor-pointer transition-all <?php echo $isSelected ? 'border-orange-500 bg-gray-800' : 'border-gray-800 hover:border-gray-700'; ?>"
                 onclick="toggleMod(<?php echo $mod['id']; ?>)">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-white mb-1"><?php echo htmlspecialchars($mod['name']); ?></h3>
                        <p class="text-gray-400 text-sm"><?php echo htmlspecialchars($mod['version']); ?></p>
                    </div>
                    <?php if ($isSelected): ?>
                        <i class="fas fa-check-circle text-orange-500 text-2xl ml-2"></i>
                    <?php endif; ?>
                </div>
                
                <p class="text-gray-400 text-sm mb-4"><?php echo htmlspecialchars($mod['description']); ?></p>
                
                <div class="flex items-center justify-between">
                    <span class="bg-gray-800 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
                        <?php echo htmlspecialchars($mod['category']); ?>
                    </span>
                    <div class="flex gap-2">
                        <?php if ($mod['forge']): ?>
                            <span class="bg-gray-800 text-red-400 px-2 py-1 rounded text-xs">Forge</span>
                        <?php endif; ?>
                        <?php if ($mod['fabric']): ?>
                            <span class="bg-gray-800 text-blue-400 px-2 py-1 rounded text-xs">Fabric</span>
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class="mt-3 flex items-center text-gray-500 text-xs">
                    <i class="fas fa-download mr-1"></i>
                    <?php echo htmlspecialchars($mod['downloads']); ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<script>
function toggleMod(modId) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'index.php';
    
    const actionInput = document.createElement('input');
    actionInput.type = 'hidden';
    actionInput.name = 'action';
    actionInput.value = 'toggle_mod';
    
    const modInput = document.createElement('input');
    modInput.type = 'hidden';
    modInput.name = 'mod_id';
    modInput.value = modId;
    
    form.appendChild(actionInput);
    form.appendChild(modInput);
    document.body.appendChild(form);
    form.submit();
}
</script>
