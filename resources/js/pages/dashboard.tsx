import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';

interface Stats {
    pending_requests?: number;
    approved_requests?: number;
    total_requests?: number;
    unread_notifications?: number;
    pending_approvals?: number;
    approved_today?: number;
    available_buildings?: number;
    scheduled_today?: number;
    total_schedules?: number;
}

interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentNotifications: Notification[];
    userRole: string;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentNotifications, userRole }: Props) {
    const getStatsCards = () => {
        if (userRole === 'user') {
            return [
                {
                    title: 'Pending Requests',
                    value: stats.pending_requests || 0,
                    icon: '⏳',
                    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                    href: '/borrowing-requests?status=pending'
                },
                {
                    title: 'Approved Requests',
                    value: stats.approved_requests || 0,
                    icon: '✅',
                    color: 'bg-green-50 border-green-200 text-green-800',
                    href: '/borrowing-requests?status=approved'
                },
                {
                    title: 'Total Requests',
                    value: stats.total_requests || 0,
                    icon: '📋',
                    color: 'bg-blue-50 border-blue-200 text-blue-800',
                    href: '/borrowing-requests'
                },
                {
                    title: 'Notifications',
                    value: stats.unread_notifications || 0,
                    icon: '🔔',
                    color: 'bg-purple-50 border-purple-200 text-purple-800',
                    href: '/notifications'
                }
            ];
        } else if (userRole === 'admin1') {
            return [
                {
                    title: 'Pending Approvals',
                    value: stats.pending_approvals || 0,
                    icon: '⏳',
                    color: 'bg-red-50 border-red-200 text-red-800',
                    href: '/borrowing-requests?status=pending'
                },
                {
                    title: 'Approved Today',
                    value: stats.approved_today || 0,
                    icon: '✅',
                    color: 'bg-green-50 border-green-200 text-green-800',
                    href: '/borrowing-requests?status=approved'
                },
                {
                    title: 'Total Requests',
                    value: stats.total_requests || 0,
                    icon: '📊',
                    color: 'bg-blue-50 border-blue-200 text-blue-800',
                    href: '/borrowing-requests'
                },
                {
                    title: 'Available Buildings',
                    value: stats.available_buildings || 0,
                    icon: '🏢',
                    color: 'bg-gray-50 border-gray-200 text-gray-800',
                    href: '/buildings'
                }
            ];
        } else if (userRole === 'admin2') {
            return [
                {
                    title: 'Need Scheduling',
                    value: stats.approved_requests || 0,
                    icon: '📅',
                    color: 'bg-orange-50 border-orange-200 text-orange-800',
                    href: '/schedules/create'
                },
                {
                    title: 'Scheduled Today',
                    value: stats.scheduled_today || 0,
                    icon: '📋',
                    color: 'bg-green-50 border-green-200 text-green-800',
                    href: '/schedules'
                },
                {
                    title: 'Total Schedules',
                    value: stats.total_schedules || 0,
                    icon: '📊',
                    color: 'bg-blue-50 border-blue-200 text-blue-800',
                    href: '/schedules'
                },
                {
                    title: 'Available Buildings',
                    value: stats.available_buildings || 0,
                    icon: '🏢',
                    color: 'bg-gray-50 border-gray-200 text-gray-800',
                    href: '/buildings'
                }
            ];
        }
        return [];
    };

    const getQuickActions = () => {
        if (userRole === 'user') {
            return [
                {
                    title: 'Submit New Request',
                    description: 'Create a new facility borrowing request',
                    icon: '➕',
                    href: '/borrowing-requests/create',
                    color: 'bg-blue-600 hover:bg-blue-700'
                },
                {
                    title: 'View My Requests',
                    description: 'Check status of your submitted requests',
                    icon: '📋',
                    href: '/borrowing-requests',
                    color: 'bg-green-600 hover:bg-green-700'
                },
                {
                    title: 'Browse Buildings',
                    description: 'View available facilities and their specifications',
                    icon: '🏢',
                    href: '/buildings',
                    color: 'bg-purple-600 hover:bg-purple-700'
                }
            ];
        } else if (userRole === 'admin1') {
            return [
                {
                    title: 'Review Requests',
                    description: 'Approve or reject pending requests',
                    icon: '✅',
                    href: '/borrowing-requests?status=pending',
                    color: 'bg-red-600 hover:bg-red-700'
                },
                {
                    title: 'View All Requests',
                    description: 'See all borrowing requests in the system',
                    icon: '📊',
                    href: '/borrowing-requests',
                    color: 'bg-blue-600 hover:bg-blue-700'
                },
                {
                    title: 'Manage Buildings',
                    description: 'View and manage facility information',
                    icon: '🏢',
                    href: '/buildings',
                    color: 'bg-gray-600 hover:bg-gray-700'
                }
            ];
        } else if (userRole === 'admin2') {
            return [
                {
                    title: 'Create Schedule',
                    description: 'Schedule approved requests',
                    icon: '📅',
                    href: '/schedules/create',
                    color: 'bg-orange-600 hover:bg-orange-700'
                },
                {
                    title: 'View Schedules',
                    description: 'Manage all facility schedules',
                    icon: '📋',
                    href: '/schedules',
                    color: 'bg-green-600 hover:bg-green-700'
                },
                {
                    title: 'View Buildings',
                    description: 'Check facility availability and details',
                    icon: '🏢',
                    href: '/buildings',
                    color: 'bg-purple-600 hover:bg-purple-700'
                }
            ];
        }
        return [];
    };

    const statsCards = getStatsCards();
    const quickActions = getQuickActions();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        🎯 Welcome to Facility Booking System
                    </h1>
                    <p className="text-blue-100">
                        {userRole === 'user' && 'Submit and track your facility borrowing requests'}
                        {userRole === 'admin1' && 'Review and approve facility borrowing requests'}
                        {userRole === 'admin2' && 'Schedule approved requests and manage facility calendars'}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((card, index) => (
                        <Link
                            key={index}
                            href={card.href}
                            className={`rounded-lg border-2 p-6 transition-all hover:shadow-lg ${card.color}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-80">{card.title}</p>
                                    <p className="text-3xl font-bold">{card.value}</p>
                                </div>
                                <div className="text-3xl">{card.icon}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            ⚡ Quick Actions
                        </h2>
                        <div className="space-y-3">
                            {quickActions.map((action, index) => (
                                <Link
                                    key={index}
                                    href={action.href}
                                    className="block group"
                                >
                                    <div className="flex items-center p-3 rounded-lg border-2 border-gray-200 group-hover:border-gray-300 transition-colors">
                                        <div className="text-2xl mr-3">{action.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {action.description}
                                            </p>
                                        </div>
                                        <div className="text-gray-400 group-hover:text-blue-600">
                                            →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Notifications */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                🔔 Recent Notifications
                            </h2>
                            <Link
                                href="/notifications"
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                View All
                            </Link>
                        </div>
                        
                        {recentNotifications.length > 0 ? (
                            <div className="space-y-3">
                                {recentNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-3 rounded-lg border ${
                                            notification.is_read
                                                ? 'bg-gray-50 border-gray-200'
                                                : 'bg-blue-50 border-blue-200'
                                        }`}
                                    >
                                        <h4 className="font-medium text-sm text-gray-900">
                                            {notification.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            {new Date(notification.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <div className="text-4xl mb-2">📭</div>
                                <p>No notifications yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}