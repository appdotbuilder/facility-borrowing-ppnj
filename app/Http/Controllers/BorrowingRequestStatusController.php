<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateBorrowingRequestStatusRequest;
use App\Models\BorrowingRequest;
use App\Models\Notification;
use Illuminate\Http\Request;

class BorrowingRequestStatusController extends Controller
{
    /**
     * Update the status of a borrowing request.
     */
    public function update(UpdateBorrowingRequestStatusRequest $request, BorrowingRequest $borrowingRequest)
    {
        $data = $request->validated();
        $data['approved_by'] = auth()->id();
        $data['approved_at'] = now();

        $borrowingRequest->update($data);

        // Notify the requester
        Notification::create([
            'user_id' => $borrowingRequest->user_id,
            'title' => 'Request Status Update',
            'message' => $data['status'] === 'approved' 
                ? "Your request '{$borrowingRequest->title}' has been approved."
                : "Your request '{$borrowingRequest->title}' has been rejected.",
            'type' => 'request_status',
            'data' => ['request_id' => $borrowingRequest->id],
        ]);

        // If approved, notify Admin 2 users
        if ($data['status'] === 'approved') {
            $admin2Users = \App\Models\User::where('role', 'admin2')->get();
            foreach ($admin2Users as $admin) {
                Notification::create([
                    'user_id' => $admin->id,
                    'title' => 'Request Approved - Needs Scheduling',
                    'message' => "Approved request '{$borrowingRequest->title}' needs to be scheduled.",
                    'type' => 'schedule_update',
                    'data' => ['request_id' => $borrowingRequest->id],
                ]);
            }
        }

        return redirect()->route('borrowing-requests.show', $borrowingRequest)
            ->with('success', 'Request status updated successfully.');
    }
}