<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$token = 'ТВОЙ_FOOTBALL_DATA_TOKEN';
$baseUrl = 'https://api.football-data.org/v4';

$type = $_GET['type'] ?? 'matches';
$season = $_GET['season'] ?? '2026';

$routes = [
  'matches' => "/competitions/WC/matches?season={$season}",
  'standings' => "/competitions/WC/standings?season={$season}",
  'teams' => "/competitions/WC/teams?season={$season}",
  'scorers' => "/competitions/WC/scorers?season={$season}&limit=10"
];

if (!isset($routes[$type])) {
  http_response_code(400);
  echo json_encode(['error' => 'Unknown request type']);
  exit;
}

$url = $baseUrl . $routes[$type];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "X-Auth-Token: {$token}"
]);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

if ($response === false || !$response) {
  http_response_code(500);
  echo json_encode([
    'error' => 'Proxy request failed',
    'details' => $error
  ]);
  exit;
}

http_response_code($status ?: 200);
echo $response;
