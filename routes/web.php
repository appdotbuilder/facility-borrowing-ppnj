<?php

use App\Http\Controllers\BuildingController;
use App\Http\Controllers\BorrowingRequestController;
use App\Http\Controllers\BorrowingRequestStatusController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ScheduleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Borrowing Requests
    Route::resource('borrowing-requests', BorrowingRequestController::class);
    Route::patch('borrowing-requests/{borrowingRequest}/status', [BorrowingRequestStatusController::class, 'update'])
        ->name('borrowing-requests.status.update');
    
    // Schedules
    Route::resource('schedules', ScheduleController::class);
    
    // Buildings
    Route::resource('buildings', BuildingController::class)->only(['index', 'show']);
    
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{notification}', [NotificationController::class, 'update'])->name('notifications.update');
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'store'])->name('notifications.mark-all-read');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';