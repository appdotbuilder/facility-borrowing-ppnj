<?php

use App\Models\Building;
use App\Models\BorrowingRequest;
use App\Models\User;

test('welcome page loads correctly', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($assert) => $assert
        ->component('welcome')
    );
});

test('authenticated users can access dashboard', function () {
    $user = User::factory()->create(['role' => 'user']);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200);
    $response->assertInertia(fn ($assert) => $assert
        ->component('dashboard')
        ->has('stats')
        ->where('userRole', 'user')
    );
});

test('buildings index page loads', function () {
    $user = User::factory()->create();
    Building::factory()->count(3)->create();

    $response = $this->actingAs($user)->get('/buildings');

    $response->assertStatus(200);
    $response->assertInertia(fn ($assert) => $assert
        ->component('buildings/index')
        ->has('buildings.data', 3)
    );
});

test('users can view borrowing requests', function () {
    $user = User::factory()->create(['role' => 'user']);
    $building = Building::factory()->create();
    BorrowingRequest::factory()->create([
        'user_id' => $user->id,
        'building_id' => $building->id,
    ]);

    $response = $this->actingAs($user)->get('/borrowing-requests');

    $response->assertStatus(200);
    $response->assertInertia(fn ($assert) => $assert
        ->component('borrowing-requests/index')
        ->has('requests.data', 1)
    );
});

test('schedules index page loads', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/schedules');

    $response->assertStatus(200);
    $response->assertInertia(fn ($assert) => $assert
        ->component('schedules/index')
    );
});

test('users can create borrowing requests', function () {
    $user = User::factory()->create(['role' => 'user']);
    $building = Building::factory()->create();

    $requestData = [
        'building_id' => $building->id,
        'title' => 'Test Event',
        'description' => 'Test event description',
        'organization' => 'Test Organization',
        'contact_person' => 'John Doe',
        'contact_phone' => '+1234567890',
        'request_date' => now()->addDay()->format('Y-m-d'),
        'start_time' => '09:00',
        'end_time' => '17:00',
        'expected_participants' => 50,
    ];

    $response = $this->actingAs($user)->post('/borrowing-requests', $requestData);

    $response->assertRedirect();
    $this->assertDatabaseHas('borrowing_requests', [
        'user_id' => $user->id,
        'title' => 'Test Event',
        'status' => 'pending',
    ]);
});

test('admin1 can approve requests', function () {
    $admin = User::factory()->create(['role' => 'admin1']);
    $user = User::factory()->create(['role' => 'user']);
    $building = Building::factory()->create();
    
    $request = BorrowingRequest::factory()->create([
        'user_id' => $user->id,
        'building_id' => $building->id,
        'status' => 'pending',
    ]);

    $response = $this->actingAs($admin)->patch("/borrowing-requests/{$request->id}/status", [
        'status' => 'approved',
        'admin_notes' => 'Approved for use',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('borrowing_requests', [
        'id' => $request->id,
        'status' => 'approved',
        'approved_by' => $admin->id,
    ]);
});

test('regular users cannot approve requests', function () {
    $user = User::factory()->create(['role' => 'user']);
    $building = Building::factory()->create();
    
    $request = BorrowingRequest::factory()->create([
        'user_id' => $user->id,
        'building_id' => $building->id,
        'status' => 'pending',
    ]);

    $response = $this->actingAs($user)->patch("/borrowing-requests/{$request->id}/status", [
        'status' => 'approved',
    ]);

    $response->assertStatus(403);
});