<?php
$issues = checkCompatibility($_SESSION['selectedMods']);
?>

<div class="max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-white mb-8">Compatibility Checker</h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 class="text-2xl font-bold text-white mb-4">Selected Mods (<?php echo count($_SESSION['selectedMods']); ?>)</h3>
            
            <?php if (empty($_SESSION['selectedMods'])): ?>
                <p class="text-gray-400 text-center py-8">
                    No mods selected. Visit the Mod Library to select mods.
                </p>
            <?php else: ?>
                <div class="space-y-3">
                    <?php foreach ($_SESSION['selectedMods'] as $modId): ?>
                        <?php $mod = getModById($modId); ?>
                        <?php if ($mod): ?>
                            <div class="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <h4 class="text-white font-medium"><?php echo htmlspecialchars($mod['name']); ?></h4>
                                    <p class="text-gray-400 text-sm"><?php echo htmlspecialchars($mod['category']); ?></p>
                                </div>
                                <button onclick="toggleMod(<?php echo $mod['id']; ?>)" 
                                        class="text-red-400 hover:text-red-300 transition-colors">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 class="text-2xl font-bold text-white mb-4">Compatibility Report</h3>
            
            <?php if (empty($_SESSION['selectedMods'])): ?>
                <p class="text-gray-400 text-center py-8">
                    Select mods to check compatibility
                </p>
            <?php elseif (empty($issues)): ?>
                <div class="bg-gray-800 rounded-lg p-4 text-center py-8">
                    <i class="fas fa-exclamation-circle text-gray-500 text-5xl mb-3"></i>
                    <p class="text-gray-400">No issues detected</p>
                </div>
            <?php else: ?>
                <div class="space-y-3">
                    <?php foreach ($issues as $issue): ?>
                        <?php
                        $bgClass = $issue['type'] === 'error' ? 'bg-red-900/20 border border-red-800' :
                                  ($issue['type'] === 'warning' ? 'bg-yellow-900/20 border border-yellow-800' :
                                  'bg-green-900/20 border border-green-800');
                        $textClass = $issue['type'] === 'error' ? 'text-red-400' :
                                    ($issue['type'] === 'warning' ? 'text-yellow-400' : 'text-green-400');
                        $iconClass = $issue['type'] === 'error' ? 'fa-exclamation-circle' :
                                    ($issue['type'] === 'warning' ? 'fa-exclamation-triangle' : 'fa-check-circle');
                        ?>
                        <div class="rounded-lg p-4 flex items-start gap-3 <?php echo $bgClass; ?>">
                            <i class="fas <?php echo $iconClass; ?> <?php echo $textClass; ?> text-2xl"></i>
                            <div>
                                <p class="font-medium <?php echo $textClass; ?>">
                                    <?php echo htmlspecialchars($issue['message']); ?>
                                </p>
                                <p class="text-gray-400 text-sm mt-1"><?php echo htmlspecialchars($issue['details']); ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($_SESSION['selectedMods'])): ?>
                <div class="mt-6 pt-6 border-t border-gray-800">
                    <button onclick="alert('Export functionality would be implemented here')" 
                            class="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition-colors">
                        Export Modpack
                    </button>
                </div>
            <?php endif; ?>
        </div>
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
