<div class="min-h-screen bg-gray-950 flex">
    <?php include 'components/sidebar.php'; ?>
    
    <div class="flex-1 p-8 overflow-auto">
        <?php
        switch($page) {
            case 'dashboard':
                include 'pages/dashboard.php';
                break;
            case 'mods':
                include 'pages/mods.php';
                break;
            case 'modpacks':
                include 'pages/modpacks.php';
                break;
            case 'compatibility':
                include 'pages/compatibility.php';
                break;
            case 'profile':
                include 'pages/profile.php';
                break;
            default:
                include 'pages/dashboard.php';
        }
        ?>
    </div>
</div>
