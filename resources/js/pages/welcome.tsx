import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Facility Booking System - PP. Nurul Jadid" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        🏢 Facility Booking System
                                    </h1>
                                    <p className="text-sm text-gray-600">PP. Nurul Jadid</p>
                                </div>
                            </div>
                            
                            <nav className="flex items-center gap-4">
                                {auth?.user ? (
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-600">
                                            Welcome, {auth.user.name}
                                        </span>
                                        <Link
                                            href="/dashboard"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href="/login"
                                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            🏛️ Manage Facility Bookings
                            <span className="block text-blue-600">Effortlessly</span>
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                            Streamline your facility borrowing requests for PP. Nurul Jadid buildings and facilities. 
                            Submit requests, track approvals, and manage schedules all in one place.
                        </p>
                        
                        {!auth?.user && (
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link href="/register">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        Get Started 🚀
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg">
                                        Sign In →
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
                            🌟 Key Features
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-3xl mb-4">📝</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Submit Requests
                                </h4>
                                <p className="text-gray-600">
                                    Easily submit facility borrowing requests with detailed information, 
                                    contact details, and optional PDF attachments.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-3xl mb-4">✅</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Approval Workflow
                                </h4>
                                <p className="text-gray-600">
                                    Streamlined approval process with Admin 1 (Kepala Kerumahtanggaan) 
                                    reviewing and approving/rejecting requests.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-3xl mb-4">📅</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Schedule Management
                                </h4>
                                <p className="text-gray-600">
                                    Admin 2 (Sekretariat) can schedule approved requests and manage 
                                    facility calendars with detailed scheduling.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-3xl mb-4">🏢</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Building Specifications
                                </h4>
                                <p className="text-gray-600">
                                    View detailed building specifications, capacity information, 
                                    and facility images before making requests.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-3xl mb-4">🔔</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Smart Notifications
                                </h4>
                                <p className="text-gray-600">
                                    Receive real-time notifications about request status updates, 
                                    approvals, rejections, and scheduling changes.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-3xl mb-4">📊</div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    Dashboard & Analytics
                                </h4>
                                <p className="text-gray-600">
                                    Comprehensive dashboard with statistics, request tracking, 
                                    and role-based views for different user types.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* User Roles Section */}
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
                            👥 User Roles & Permissions
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Regular Users */}
                            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                                <div className="text-3xl mb-4">👤</div>
                                <h4 className="text-xl font-semibold text-green-800 mb-2">
                                    Regular Users
                                </h4>
                                <ul className="text-green-700 space-y-2">
                                    <li>• Submit borrowing requests</li>
                                    <li>• Track request status</li>
                                    <li>• View personal notifications</li>
                                    <li>• Edit pending requests</li>
                                </ul>
                            </div>

                            {/* Admin 1 */}
                            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                                <div className="text-3xl mb-4">👨‍💼</div>
                                <h4 className="text-xl font-semibold text-blue-800 mb-2">
                                    Admin 1 (Kepala)
                                </h4>
                                <ul className="text-blue-700 space-y-2">
                                    <li>• Review all requests</li>
                                    <li>• Approve/reject requests</li>
                                    <li>• Add approval notes</li>
                                    <li>• View system statistics</li>
                                </ul>
                            </div>

                            {/* Admin 2 */}
                            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                                <div className="text-3xl mb-4">📋</div>
                                <h4 className="text-xl font-semibold text-purple-800 mb-2">
                                    Admin 2 (Sekretariat)
                                </h4>
                                <ul className="text-purple-700 space-y-2">
                                    <li>• Schedule approved requests</li>
                                    <li>• Manage facility calendars</li>
                                    <li>• Input schedule details</li>
                                    <li>• Update scheduling notes</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth?.user && (
                        <div className="mt-20 bg-blue-600 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Ready to Get Started? 🎯
                            </h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                Join PP. Nurul Jadid's facility booking system today and streamline 
                                your facility borrowing process with our comprehensive management solution.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Link href="/register">
                                    <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                                        Create Account 🚀
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <p className="text-gray-300">
                                © 2024 PP. Nurul Jadid Facility Booking System. 
                                Streamlining facility management for better organization.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}