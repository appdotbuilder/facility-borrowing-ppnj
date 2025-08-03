import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    organization?: string;
}

interface Building {
    id: number;
    name: string;
}

interface BorrowingRequest {
    id: number;
    title: string;
    organization: string;
    request_date: string;
    start_time: string;
    end_time: string;
    status: string;
    user: User;
    building: Building;
    created_at: string;
}

interface Props {
    requests: {
        data: BorrowingRequest[];
        links: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
    buildings: Building[];
    filters: {
        status?: string;
        building_id?: string;
        search?: string;
    };
    canApprove: boolean;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Borrowing Requests', href: '/borrowing-requests' },
];

const getStatusBadge = (status: string) => {
    const badges = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        approved: 'bg-green-100 text-green-800 border-green-200',
        rejected: 'bg-red-100 text-red-800 border-red-200',
        scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    
    const emojis = {
        pending: '⏳',
        approved: '✅',
        rejected: '❌',
        scheduled: '📅',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
            <span className="mr-1">{emojis[status as keyof typeof emojis] || '📋'}</span>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default function Index({ requests, buildings, filters, canApprove }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get('/borrowing-requests', {
            ...filters,
            [key]: value || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Borrowing Requests" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            📋 Borrowing Requests
                        </h1>
                        <p className="text-gray-600">
                            Manage facility borrowing requests and approvals
                        </p>
                    </div>
                    
                    <Link href="/borrowing-requests/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ New Request
                        </Button>
                    </Link>
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
                                placeholder="Search by title or organization..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue={filters.search || ''}
                                onChange={(e) => handleFilter('search', e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.status || ''}
                                onChange={(e) => handleFilter('status', e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="scheduled">Scheduled</option>
                            </select>
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
                        
                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                onClick={() => router.get('/borrowing-requests')}
                                className="w-full"
                            >
                                🔄 Reset Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Requests List */}
                <div className="bg-white rounded-lg shadow">
                    {requests.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Request Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Building
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {requests.data.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {request.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {request.organization}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        by {request.user.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {request.building.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(request.request_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {request.start_time} - {request.end_time}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(request.status)}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium space-x-2">
                                                <Link
                                                    href={`/borrowing-requests/${request.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    View
                                                </Link>
                                                {canApprove && request.status === 'pending' && (
                                                    <Link
                                                        href={`/borrowing-requests/${request.id}`}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        Review
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">📭</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No requests found
                            </h3>
                            <p className="text-gray-500">
                                {Object.keys(filters).some(key => filters[key as keyof typeof filters])
                                    ? 'Try adjusting your filters to see more results.'
                                    : 'Get started by creating your first borrowing request.'
                                }
                            </p>
                            {!Object.keys(filters).some(key => filters[key as keyof typeof filters]) && (
                                <Link href="/borrowing-requests/create" className="mt-4 inline-block">
                                    <Button>Create First Request</Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}