<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\BorrowingRequest
 *
 * @property int $id
 * @property int $user_id
 * @property int $building_id
 * @property string $title
 * @property string $description
 * @property string $organization
 * @property string $contact_person
 * @property string $contact_phone
 * @property string $request_date
 * @property string $start_time
 * @property string $end_time
 * @property int $expected_participants
 * @property string|null $equipment_needed
 * @property string|null $pdf_attachment
 * @property string $status
 * @property string|null $admin_notes
 * @property string|null $rejection_reason
 * @property int|null $approved_by
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Building $building
 * @property-read \App\Models\User|null $approver
 * @property-read \App\Models\Schedule|null $schedule
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereBuildingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereContactPerson($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereContactPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereEquipmentNeeded($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereExpectedParticipants($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereOrganization($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest wherePdfAttachment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereRejectionReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereRequestDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest approved()
 * @method static \Database\Factories\BorrowingRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BorrowingRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'building_id',
        'title',
        'description',
        'organization',
        'contact_person',
        'contact_phone',
        'request_date',
        'start_time',
        'end_time',
        'expected_participants',
        'equipment_needed',
        'pdf_attachment',
        'status',
        'admin_notes',
        'rejection_reason',
        'approved_by',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'request_date' => 'date',
        'approved_at' => 'datetime',
        'expected_participants' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the borrowing request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the building for the borrowing request.
     */
    public function building(): BelongsTo
    {
        return $this->belongsTo(Building::class);
    }

    /**
     * Get the user who approved the request.
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get the schedule for the borrowing request.
     */
    public function schedule(): HasOne
    {
        return $this->hasOne(Schedule::class);
    }

    /**
     * Scope a query to only include pending requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}