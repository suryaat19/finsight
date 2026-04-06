"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Lock, Shield, Trash2, Smartphone } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h2>
            <p className="text-slate-500">Manage your app preferences and security.</p>

            <div className="space-y-6">
                
                {/* Security Settings */}
                <Card className="rounded-3xl shadow-sm border-none bg-white dark:bg-slate-900/50">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Lock className="text-indigo-500" size={20} />
                            <CardTitle className="text-xl">Security & Password</CardTitle>
                        </div>
                        <CardDescription>Keep your financial data safe.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">Change Password</h4>
                                <p className="text-sm text-slate-500">Update your password regularly to keep your account secure.</p>
                            </div>
                            <Button variant="outline" className="mt-4 sm:mt-0 rounded-full">Update</Button>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                                <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                            </div>
                            <Button variant="default" className="mt-4 sm:mt-0 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">Enable 2FA</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="rounded-3xl shadow-sm border-none bg-white dark:bg-slate-900/50">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="text-indigo-500" size={20} />
                            <CardTitle className="text-xl">Notifications</CardTitle>
                        </div>
                        <CardDescription>Control how and when we contact you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Using standard HTML checkboxes styled nicely to avoid Shadcn 'switch' install errors */}
                        <label className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">Email Alerts</h4>
                                <p className="text-sm text-slate-500">Receive weekly summaries and security alerts.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-500 rounded cursor-pointer" />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">Push Notifications</h4>
                                <p className="text-sm text-slate-500">Get instant alerts for new transactions over $100.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-500 rounded cursor-pointer" />
                        </label>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="rounded-3xl shadow-sm border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="text-red-500" size={20} />
                            <CardTitle className="text-xl text-red-600 dark:text-red-500">Danger Zone</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">Delete Account & Data</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Permanently remove your account and wipe all transactions. This action cannot be undone.</p>
                            </div>
                            <Button variant="destructive" className="mt-4 sm:mt-0 rounded-full bg-red-500 hover:bg-red-600" onClick={() => {
                                sessionStorage.clear();
                                window.location.href = '/';
                            }}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}