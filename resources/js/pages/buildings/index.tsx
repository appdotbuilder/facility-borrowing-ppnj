import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Building {
    id: number;
    name: string;
    description?: string;
    capacity: number;
    status: string;
    images?: string[];
}

interface Props {
    buildings: {
        data: Building[];
        links: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Buildings', href: '/buildings' },
];

const getStatusBadge = (status: string) => {
    const badges = {
        available: 'bg-green-100 text-green-800 border-green-200',
        maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        unavailable: 'bg-red-100 text-red-800 border-red-200',
    };
    
    const emojis = {
        available: '✅',
        maintenance: '🔧',
        unavailable: '❌',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
            <span className="mr-1">{emojis[status as keyof typeof emojis] || '🏢'}</span>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default function Index({ buildings, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get('/buildings', {
            ...filters,
            [key]: value || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buildings & Facilities" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            🏢 Buildings & Facilities
                        </h1>
                        <p className="text-gray-600">
                            Browse available facilities and their specifications
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search buildings..."
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
                                <option value="available">Available</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>
                        
                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                onClick={() => router.get('/buildings')}
                                className="w-full"
                            >
                                🔄 Reset Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Buildings Grid */}
                {buildings.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {buildings.data.map((building) => (
                            <div key={building.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                                {/* Building Image */}
                                <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                                    {building.images && building.images.length > 0 ? (
                                        <img
                                            src={building.images[0]}
                                            alt={building.name}
                                            className="w-full h-full object-cover rounded-t-lg"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                    ) : null}
                                    <div className={`text-4xl ${building.images && building.images.length > 0 ? 'hidden' : ''}`}>
                                        🏢
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {building.name}
                                        </h3>
                                        {getStatusBadge(building.status)}
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {building.description || 'No description available'}
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            👥 Capacity: {building.capacity} people
                                        </div>
                                        
                                        <Link
                                            href={`/buildings/${building.id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-4xl mb-4">🏢</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No buildings found
                        </h3>
                        <p className="text-gray-500">
                            {Object.keys(filters).some(key => filters[key as keyof typeof filters])
                                ? 'Try adjusting your filters to see more results.'
                                : 'No buildings are currently available in the system.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}