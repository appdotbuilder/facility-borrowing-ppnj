import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Building {
    id: number;
    name: string;
}

interface BorrowingRequest {
    id: number;
    title: string;
    organization: string;
    user: User;
}

interface Schedule {
    id: number;
    title: string;
    scheduled_date: string;
    start_time: string;
    end_time: string;
    building: Building;
    borrowing_request: BorrowingRequest;
    creator: User;
}

interface Props {
    schedules: {
        data: Schedule[];
        links: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
    buildings: Building[];
    filters: {
        building_id?: string;
        date?: string;
        search?: string;
    };
    canCreateSchedule: boolean;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Schedules', href: '/schedules' },
];

export default function Index({ schedules, buildings, filters, canCreateSchedule }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get('/schedules', {
            ...filters,
            [key]: value || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedules" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            📅 Facility Schedules
                        </h1>
                        <p className="text-gray-600">
                            View and manage facility booking schedules
                        </p>
                    </div>
                    
                    {canCreateSchedule && (
                        <Link href="/schedules/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ➕ Create Schedule
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search schedules..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue={filters.search || ''}
                                onChange={(e) => handleFilter('search', e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Building
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.building_id || ''}
                                onChange={(e) => handleFilter('building_id', e.target.value)}
                            >
                                <option value="">All Buildings</option>
                                {buildings.map((building) => (
                                    <option key={building.id} value={building.id}>
                                        {building.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.date || ''}
                                onChange={(e) => handleFilter('date', e.target.value)}
                            />
                        </div>
                        
                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                onClick={() => router.get('/schedules')}
                                className="w-full"
                            >
                                🔄 Reset Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Schedules List */}
                {schedules.data.length > 0 ? (
                    <div className="bg-white rounded-lg shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Schedule Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Building
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Requester
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {schedules.data.map((schedule) => (
                                        <tr key={schedule.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {schedule.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {schedule.borrowing_request.organization}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {schedule.building.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    📅 {new Date(schedule.scheduled_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    🕐 {schedule.start_time} - {schedule.end_time}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {schedule.borrowing_request.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {schedule.borrowing_request.organization}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                <Link
                                                    href={`/schedules/${schedule.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-4xl mb-4">📅</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No schedules found
                        </h3>
                        <p className="text-gray-500">
                            {Object.keys(filters).some(key => filters[key as keyof typeof filters])
                                ? 'Try adjusting your filters to see more results.'
                                : 'No schedules have been created yet.'
                            }
                        </p>
                        {canCreateSchedule && !Object.keys(filters).some(key => filters[key as keyof typeof filters]) && (
                            <Link href="/schedules/create" className="mt-4 inline-block">
                                <Button>Create First Schedule</Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}