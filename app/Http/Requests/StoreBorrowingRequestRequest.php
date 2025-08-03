<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBorrowingRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'building_id' => 'required|exists:buildings,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'organization' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'request_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'expected_participants' => 'required|integer|min:1',
            'equipment_needed' => 'nullable|string',
            'pdf_attachment' => 'nullable|file|mimes:pdf|max:5120',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'building_id.required' => 'Please select a building.',
            'building_id.exists' => 'The selected building is invalid.',
            'title.required' => 'Event title is required.',
            'description.required' => 'Event description is required.',
            'organization.required' => 'Organization name is required.',
            'contact_person.required' => 'Contact person name is required.',
            'contact_phone.required' => 'Contact phone number is required.',
            'request_date.required' => 'Event date is required.',
            'request_date.after_or_equal' => 'Event date must be today or in the future.',
            'start_time.required' => 'Start time is required.',
            'end_time.required' => 'End time is required.',
            'end_time.after' => 'End time must be after start time.',
            'expected_participants.required' => 'Number of participants is required.',
            'expected_participants.min' => 'At least 1 participant is required.',
            'pdf_attachment.mimes' => 'Attachment must be a PDF file.',
            'pdf_attachment.max' => 'Attachment must not exceed 5MB.',
        ];
    }
}