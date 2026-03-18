<?php
session_start();

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $_SESSION['user'] = [
        'username' => $_POST['email'] === 'steve@minecraft.com' ? 'Steve_Builder' : 'User',
        'email' => $_POST['email']
    ];
    header('Location: index.php?page=dashboard');
    exit;
}

// Handle signup
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'signup') {
    $_SESSION['user'] = [
        'username' => $_POST['username'],
        'email' => $_POST['email']
    ];
    header('Location: index.php?page=dashboard');
    exit;
}

// Handle profile update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_profile') {
    $_SESSION['profile'] = [
        'username' => $_POST['username'],
        'email' => $_POST['email'],
        'minecraftVersion' => $_POST['minecraftVersion'],
        'preferredLoader' => $_POST['preferredLoader'],
        'favoriteCategory' => $_POST['favoriteCategory'],
        'bio' => $_POST['bio']
    ];
    header('Location: index.php?page=profile&updated=1');
    exit;
}

// Handle mod selection
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'toggle_mod') {
    if (!isset($_SESSION['selectedMods'])) {
        $_SESSION['selectedMods'] = [];
    }
    
    $modId = (int)$_POST['mod_id'];
    $key = array_search($modId, $_SESSION['selectedMods']);
    
    if ($key !== false) {
        unset($_SESSION['selectedMods'][$key]);
        $_SESSION['selectedMods'] = array_values($_SESSION['selectedMods']); // Reindex
    } else {
        $_SESSION['selectedMods'][] = $modId;
    }
    
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;
}

// Initialize profile if not set
if (!isset($_SESSION['profile'])) {
    $_SESSION['profile'] = [
        'username' => 'Steve_Builder',
        'email' => 'steve@minecraft.com',
        'minecraftVersion' => '1.20.1',
        'preferredLoader' => 'Forge',
        'bio' => 'Love building tech modpacks!',
        'favoriteCategory' => 'Tech'
    ];
}

// Initialize selected mods if not set
if (!isset($_SESSION['selectedMods'])) {
    $_SESSION['selectedMods'] = [];
}

$page = isset($_GET['page']) ? $_GET['page'] : 'signup';
$searchQuery = isset($_GET['search']) ? $_GET['search'] : '';

// Include data file
require_once 'data.php';

// Check if user is logged in
$isLoggedIn = isset($_SESSION['user']);

// Redirect to signup if not logged in and trying to access protected pages
if (!$isLoggedIn && !in_array($page, ['signup', 'login'])) {
    header('Location: index.php?page=signup');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChunkBase - Minecraft Modpack Manager</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-950">
    <?php
    // Include appropriate page
    if (!$isLoggedIn) {
        if ($page === 'login') {
            include 'pages/login.php';
        } else {
            include 'pages/signup.php';
        }
    } else {
        include 'components/layout.php';
    }
    ?>
</body>
</html>
