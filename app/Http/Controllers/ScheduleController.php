<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScheduleRequest;
use App\Models\BorrowingRequest;
use App\Models\Building;
use App\Models\Notification;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Schedule::with(['borrowingRequest.user', 'building', 'creator']);

        if ($request->filled('building_id')) {
            $query->where('building_id', $request->building_id);
        }

        if ($request->filled('date')) {
            $query->whereDate('scheduled_date', $request->date);
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $schedules = $query->orderBy('scheduled_date', 'desc')
            ->orderBy('start_time')
            ->paginate(15);

        $buildings = Building::select('id', 'name')->get();

        return Inertia::render('schedules/index', [
            'schedules' => $schedules,
            'buildings' => $buildings,
            'filters' => $request->only(['building_id', 'date', 'search']),
            'canCreateSchedule' => auth()->user()->isAdmin2(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if (!auth()->user()->isAdmin2()) {
            abort(403);
        }

        $approvedRequests = BorrowingRequest::approved()
            ->whereDoesntHave('schedule')
            ->with(['user', 'building'])
            ->get();

        $preselectedRequest = null;
        if ($request->filled('request_id')) {
            $preselectedRequest = BorrowingRequest::find($request->request_id);
        }

        return Inertia::render('schedules/create', [
            'approvedRequests' => $approvedRequests,
            'preselectedRequest' => $preselectedRequest,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();

        $borrowingRequest = BorrowingRequest::find($data['borrowing_request_id']);
        $data['building_id'] = $borrowingRequest->building_id;

        $schedule = Schedule::create($data);

        // Update the borrowing request status to scheduled
        $borrowingRequest->update(['status' => 'scheduled']);

        // Notify the requester
        Notification::create([
            'user_id' => $borrowingRequest->user_id,
            'title' => 'Request Scheduled',
            'message' => "Your request '{$borrowingRequest->title}' has been scheduled for " . \Carbon\Carbon::parse($schedule->scheduled_date)->format('M d, Y') . " at {$schedule->start_time}.",
            'type' => 'schedule_update',
            'data' => [
                'request_id' => $borrowingRequest->id,
                'schedule_id' => $schedule->id,
            ],
        ]);

        return redirect()->route('schedules.show', $schedule)
            ->with('success', 'Schedule created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        $schedule->load(['borrowingRequest.user', 'building', 'creator']);

        return Inertia::render('schedules/show', [
            'schedule' => $schedule,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        if (!auth()->user()->isAdmin2()) {
            abort(403);
        }

        return Inertia::render('schedules/edit', [
            'schedule' => $schedule->load('borrowingRequest'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        if (!auth()->user()->isAdmin2()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'scheduled_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'notes' => 'nullable|string',
        ]);

        $schedule->update($validated);

        // Notify the requester about the update
        Notification::create([
            'user_id' => $schedule->borrowingRequest->user_id,
            'title' => 'Schedule Updated',
            'message' => "The schedule for your request '{$schedule->borrowingRequest->title}' has been updated.",
            'type' => 'schedule_update',
            'data' => [
                'request_id' => $schedule->borrowing_request_id,
                'schedule_id' => $schedule->id,
            ],
        ]);

        return redirect()->route('schedules.show', $schedule)
            ->with('success', 'Schedule updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        if (!auth()->user()->isAdmin2()) {
            abort(403);
        }

        // Reset the borrowing request status to approved
        $schedule->borrowingRequest->update(['status' => 'approved']);

        $schedule->delete();

        return redirect()->route('schedules.index')
            ->with('success', 'Schedule deleted successfully.');
    }
}