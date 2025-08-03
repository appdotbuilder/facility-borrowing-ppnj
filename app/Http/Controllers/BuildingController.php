<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BuildingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Building::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $buildings = $query->latest()->paginate(12);

        return Inertia::render('buildings/index', [
            'buildings' => $buildings,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Building $building)
    {
        $building->load(['schedules' => function ($query) {
            $query->where('scheduled_date', '>=', today())
                  ->orderBy('scheduled_date')
                  ->orderBy('start_time')
                  ->with('borrowingRequest.user');
        }]);

        return Inertia::render('buildings/show', [
            'building' => $building,
        ]);
    }
}