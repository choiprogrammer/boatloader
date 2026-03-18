<?php
// Mods database
$mods = [
    ['id' => 1, 'name' => 'JEI (Just Enough Items)', 'version' => '1.20.1', 'category' => 'Utility', 'forge' => true, 'fabric' => false, 'downloads' => '100M+', 'dependencies' => [], 'incompatibleWith' => ['REI'], 'description' => 'View recipes and item information'],
    ['id' => 2, 'name' => 'Optifine', 'version' => '1.20.1', 'category' => 'Performance', 'forge' => true, 'fabric' => false, 'downloads' => '500M+', 'dependencies' => [], 'incompatibleWith' => ['Sodium', 'Rubidium'], 'description' => 'Performance optimization and HD textures'],
    ['id' => 3, 'name' => 'Biomes O\' Plenty', 'version' => '1.20.1', 'category' => 'World Gen', 'forge' => true, 'fabric' => false, 'downloads' => '80M+', 'dependencies' => [], 'incompatibleWith' => ['Terralith'], 'description' => 'Adds 80+ new biomes'],
    ['id' => 4, 'name' => 'Create', 'version' => '1.20.1', 'category' => 'Tech', 'forge' => true, 'fabric' => false, 'downloads' => '50M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Technology and automation mod'],
    ['id' => 5, 'name' => 'Applied Energistics 2', 'version' => '1.20.1', 'category' => 'Tech', 'forge' => true, 'fabric' => false, 'downloads' => '60M+', 'dependencies' => [], 'incompatibleWith' => ['Refined Storage'], 'description' => 'Storage and automation system'],
    ['id' => 6, 'name' => 'Tinkers Construct', 'version' => '1.20.1', 'category' => 'Tools', 'forge' => true, 'fabric' => false, 'downloads' => '90M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Customizable tool crafting'],
    ['id' => 7, 'name' => 'Sodium', 'version' => '1.20.1', 'category' => 'Performance', 'forge' => false, 'fabric' => true, 'downloads' => '70M+', 'dependencies' => [], 'incompatibleWith' => ['Optifine'], 'description' => 'Modern rendering engine'],
    ['id' => 8, 'name' => 'Iris Shaders', 'version' => '1.20.1', 'category' => 'Graphics', 'forge' => false, 'fabric' => true, 'downloads' => '45M+', 'dependencies' => ['Sodium'], 'incompatibleWith' => ['Optifine'], 'description' => 'Shader support for Fabric'],
    ['id' => 9, 'name' => 'Twilight Forest', 'version' => '1.20.1', 'category' => 'Adventure', 'forge' => true, 'fabric' => false, 'downloads' => '55M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'New dimension with bosses'],
    ['id' => 10, 'name' => 'Mekanism', 'version' => '1.20.1', 'category' => 'Tech', 'forge' => true, 'fabric' => false, 'downloads' => '65M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Advanced tech and machinery'],
    ['id' => 11, 'name' => 'Pam\'s HarvestCraft', 'version' => '1.20.1', 'category' => 'Food', 'forge' => true, 'fabric' => false, 'downloads' => '40M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => '1600+ new foods and crops'],
    ['id' => 12, 'name' => 'JourneyMap', 'version' => '1.20.1', 'category' => 'Utility', 'forge' => true, 'fabric' => true, 'downloads' => '75M+', 'dependencies' => [], 'incompatibleWith' => ['Xaero\'s Minimap'], 'description' => 'Real-time mapping mod'],
    ['id' => 13, 'name' => 'Rubidium', 'version' => '1.20.1', 'category' => 'Performance', 'forge' => true, 'fabric' => false, 'downloads' => '35M+', 'dependencies' => [], 'incompatibleWith' => ['Optifine'], 'description' => 'Sodium port for Forge'],
    ['id' => 14, 'name' => 'REI (Roughly Enough Items)', 'version' => '1.20.1', 'category' => 'Utility', 'forge' => false, 'fabric' => true, 'downloads' => '45M+', 'dependencies' => [], 'incompatibleWith' => ['JEI'], 'description' => 'Recipe viewer for Fabric'],
    ['id' => 15, 'name' => 'Terralith', 'version' => '1.20.1', 'category' => 'World Gen', 'forge' => true, 'fabric' => true, 'downloads' => '30M+', 'dependencies' => [], 'incompatibleWith' => ['Biomes O\' Plenty'], 'description' => 'Vanilla-style biome overhaul'],
    ['id' => 16, 'name' => 'Refined Storage', 'version' => '1.20.1', 'category' => 'Tech', 'forge' => true, 'fabric' => false, 'downloads' => '55M+', 'dependencies' => [], 'incompatibleWith' => ['Applied Energistics 2'], 'description' => 'Simple storage network system'],
    ['id' => 17, 'name' => 'Xaero\'s Minimap', 'version' => '1.20.1', 'category' => 'Utility', 'forge' => true, 'fabric' => true, 'downloads' => '80M+', 'dependencies' => [], 'incompatibleWith' => ['JourneyMap'], 'description' => 'Fair-play minimap mod'],
    ['id' => 18, 'name' => 'Oculus', 'version' => '1.20.1', 'category' => 'Graphics', 'forge' => true, 'fabric' => false, 'downloads' => '25M+', 'dependencies' => ['Rubidium'], 'incompatibleWith' => ['Optifine'], 'description' => 'Iris port for Forge - shader support'],
    ['id' => 19, 'name' => 'Lithium', 'version' => '1.20.1', 'category' => 'Performance', 'forge' => false, 'fabric' => true, 'downloads' => '50M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Server optimization mod'],
    ['id' => 20, 'name' => 'Phosphor', 'version' => '1.20.1', 'category' => 'Performance', 'forge' => false, 'fabric' => true, 'downloads' => '40M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Lighting engine optimization'],
    ['id' => 21, 'name' => 'Botania', 'version' => '1.20.1', 'category' => 'Magic', 'forge' => true, 'fabric' => false, 'downloads' => '70M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Tech-themed magic mod'],
    ['id' => 22, 'name' => 'Thaumcraft', 'version' => '1.20.1', 'category' => 'Magic', 'forge' => true, 'fabric' => false, 'downloads' => '85M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Research-based magic mod'],
    ['id' => 23, 'name' => 'Ice and Fire', 'version' => '1.20.1', 'category' => 'Adventure', 'forge' => true, 'fabric' => false, 'downloads' => '45M+', 'dependencies' => ['Citadel'], 'incompatibleWith' => [], 'description' => 'Dragons and mythical creatures'],
    ['id' => 24, 'name' => 'Citadel', 'version' => '1.20.1', 'category' => 'Library', 'forge' => true, 'fabric' => false, 'downloads' => '60M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Library mod for animation'],
    ['id' => 25, 'name' => 'Farmer\'s Delight', 'version' => '1.20.1', 'category' => 'Food', 'forge' => true, 'fabric' => true, 'downloads' => '40M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Farming and cooking expansion'],
    ['id' => 26, 'name' => 'The Aether', 'version' => '1.20.1', 'category' => 'Adventure', 'forge' => true, 'fabric' => false, 'downloads' => '50M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Celestial dimension mod'],
    ['id' => 27, 'name' => 'Immersive Engineering', 'version' => '1.20.1', 'category' => 'Tech', 'forge' => true, 'fabric' => false, 'downloads' => '65M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Industrial-themed tech mod'],
    ['id' => 28, 'name' => 'Modular Routers', 'version' => '1.20.1', 'category' => 'Tech', 'forge' => true, 'fabric' => false, 'downloads' => '20M+', 'dependencies' => [], 'incompatibleWith' => [], 'description' => 'Item routing and automation'],
];

// Helper function to get mod by ID
function getModById($id) {
    global $mods;
    foreach ($mods as $mod) {
        if ($mod['id'] == $id) {
            return $mod;
        }
    }
    return null;
}

// Helper function to filter mods
function filterMods($searchQuery) {
    global $mods;
    if (empty($searchQuery)) {
        return $mods;
    }
    
    $filtered = [];
    foreach ($mods as $mod) {
        if (stripos($mod['name'], $searchQuery) !== false || 
            stripos($mod['category'], $searchQuery) !== false) {
            $filtered[] = $mod;
        }
    }
    return $filtered;
}

// Check compatibility function
function checkCompatibility($selectedMods) {
    global $mods;
    $issues = [];
    
    if (empty($selectedMods)) {
        return $issues;
    }
    
    $forgeCount = 0;
    $fabricCount = 0;
    
    // Count forge and fabric mods
    foreach ($selectedMods as $modId) {
        $mod = getModById($modId);
        if ($mod) {
            if ($mod['forge']) {
                $forgeCount++;
            }
            if ($mod['fabric'] && !$mod['forge']) {
                $fabricCount++;
            }
        }
    }
    
    // Check for Forge/Fabric mixing
    if ($forgeCount > 0 && $fabricCount > 0) {
        $issues[] = [
            'type' => 'error',
            'message' => 'Cannot mix Forge and Fabric mods',
            'details' => 'Forge and Fabric are incompatible mod loaders'
        ];
    }
    
    // Check for mod incompatibilities and dependencies
    foreach ($selectedMods as $modId) {
        $mod = getModById($modId);
        if (!$mod) continue;
        
        // Check dependencies
        if (!empty($mod['dependencies'])) {
            foreach ($mod['dependencies'] as $dep) {
                $depMod = null;
                foreach ($mods as $m) {
                    if ($m['name'] === $dep) {
                        $depMod = $m;
                        break;
                    }
                }
                
                if ($depMod && !in_array($depMod['id'], $selectedMods)) {
                    $issues[] = [
                        'type' => 'warning',
                        'message' => $mod['name'] . ' requires ' . $dep,
                        'details' => 'Missing dependency - mod may not work properly'
                    ];
                }
            }
        }
        
        // Check incompatibilities
        if (!empty($mod['incompatibleWith'])) {
            foreach ($mod['incompatibleWith'] as $incompatName) {
                $incompatMod = null;
                foreach ($mods as $m) {
                    if ($m['name'] === $incompatName) {
                        $incompatMod = $m;
                        break;
                    }
                }
                
                if ($incompatMod && in_array($incompatMod['id'], $selectedMods)) {
                    $issues[] = [
                        'type' => 'error',
                        'message' => $mod['name'] . ' is incompatible with ' . $incompatName,
                        'details' => 'These mods cannot be used together - remove one'
                    ];
                }
            }
        }
    }
    
    if (empty($issues) && count($selectedMods) > 0) {
        $issues[] = [
            'type' => 'success',
            'message' => 'All mods are compatible!',
            'details' => 'No conflicts detected - ready to export'
        ];
    }
    
    return $issues;
}
?>
