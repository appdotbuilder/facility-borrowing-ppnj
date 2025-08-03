<?php

namespace App\Http\Controllers;

use App\Models\BorrowingRequest;
use App\Models\Building;
use App\Models\Notification;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $stats = [];

        if ($user->isUser()) {
            $stats = [
                'pending_requests' => $user->borrowingRequests()->where('status', 'pending')->count(),
                'approved_requests' => $user->borrowingRequests()->where('status', 'approved')->count(),
                'total_requests' => $user->borrowingRequests()->count(),
                'unread_notifications' => $user->notifications()->where('is_read', false)->count(),
            ];
        } elseif ($user->isAdmin1()) {
            $stats = [
                'pending_approvals' => BorrowingRequest::pending()->count(),
                'approved_today' => BorrowingRequest::approved()
                    ->whereDate('approved_at', today())
                    ->count(),
                'total_requests' => BorrowingRequest::count(),
                'available_buildings' => Building::available()->count(),
            ];
        } elseif ($user->isAdmin2()) {
            $stats = [
                'approved_requests' => BorrowingRequest::approved()
                    ->whereDoesntHave('schedule')
                    ->count(),
                'scheduled_today' => Schedule::whereDate('scheduled_date', today())->count(),
                'total_schedules' => Schedule::count(),
                'available_buildings' => Building::available()->count(),
            ];
        }

        $recentNotifications = $user->notifications()
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentNotifications' => $recentNotifications,
            'userRole' => $user->role,
        ]);
    }
}