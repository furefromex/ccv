<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    switch ($action) {
        case 'initiate':
            // Simulate processing time
            sleep(2);
            echo json_encode(['success' => true, 'message' => 'Purchase initiated']);
            break;

        case 'confirm':
            $plan = $_POST['plan'] ?? '';
            // Here you would implement the actual purchase logic with Binance USDT
            // For this example, we'll just return a success message
            echo json_encode(['success' => true, 'message' => "Purchase confirmed for plan: $plan"]);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}