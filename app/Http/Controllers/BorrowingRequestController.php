<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBorrowingRequestRequest;
use App\Http\Requests\UpdateBorrowingRequestStatusRequest;
use App\Models\BorrowingRequest;
use App\Models\Building;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BorrowingRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = BorrowingRequest::with(['user', 'building', 'approver']);

        if ($user->isUser()) {
            $query->where('user_id', $user->id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('building_id')) {
            $query->where('building_id', $request->building_id);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('organization', 'like', '%' . $request->search . '%');
            });
        }

        $requests = $query->latest()->paginate(10);
        $buildings = Building::select('id', 'name')->get();

        return Inertia::render('borrowing-requests/index', [
            'requests' => $requests,
            'buildings' => $buildings,
            'filters' => $request->only(['status', 'building_id', 'search']),
            'canApprove' => $user->isAdmin1(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $buildings = Building::available()->get();

        return Inertia::render('borrowing-requests/create', [
            'buildings' => $buildings,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBorrowingRequestRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        if ($request->hasFile('pdf_attachment')) {
            $data['pdf_attachment'] = $request->file('pdf_attachment')
                ->store('borrowing-requests', 'public');
        }

        $borrowingRequest = BorrowingRequest::create($data);

        // Notify Admin 1 users
        $admin1Users = \App\Models\User::where('role', 'admin1')->get();
        foreach ($admin1Users as $admin) {
            Notification::create([
                'user_id' => $admin->id,
                'title' => 'New Borrowing Request',
                'message' => "New request: {$borrowingRequest->title} from {$borrowingRequest->organization}",
                'type' => 'request_status',
                'data' => ['request_id' => $borrowingRequest->id],
            ]);
        }

        return redirect()->route('borrowing-requests.show', $borrowingRequest)
            ->with('success', 'Borrowing request submitted successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BorrowingRequest $borrowingRequest)
    {
        $borrowingRequest->load(['user', 'building', 'approver', 'schedule']);

        return Inertia::render('borrowing-requests/show', [
            'request' => $borrowingRequest,
            'canApprove' => auth()->user()->isAdmin1() && $borrowingRequest->status === 'pending',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BorrowingRequest $borrowingRequest)
    {
        if ($borrowingRequest->user_id !== auth()->id() || $borrowingRequest->status !== 'pending') {
            abort(403);
        }

        $buildings = Building::available()->get();

        return Inertia::render('borrowing-requests/edit', [
            'request' => $borrowingRequest,
            'buildings' => $buildings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreBorrowingRequestRequest $request, BorrowingRequest $borrowingRequest)
    {
        if ($borrowingRequest->user_id !== auth()->id() || $borrowingRequest->status !== 'pending') {
            abort(403);
        }

        $data = $request->validated();

        if ($request->hasFile('pdf_attachment')) {
            if ($borrowingRequest->pdf_attachment) {
                Storage::disk('public')->delete($borrowingRequest->pdf_attachment);
            }
            $data['pdf_attachment'] = $request->file('pdf_attachment')
                ->store('borrowing-requests', 'public');
        }

        $borrowingRequest->update($data);

        return redirect()->route('borrowing-requests.show', $borrowingRequest)
            ->with('success', 'Request updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BorrowingRequest $borrowingRequest)
    {
        if ($borrowingRequest->user_id !== auth()->id() || $borrowingRequest->status !== 'pending') {
            abort(403);
        }

        if ($borrowingRequest->pdf_attachment) {
            Storage::disk('public')->delete($borrowingRequest->pdf_attachment);
        }

        $borrowingRequest->delete();

        return redirect()->route('borrowing-requests.index')
            ->with('success', 'Request deleted successfully.');
    }


}