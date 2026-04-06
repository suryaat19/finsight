"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Camera, Save } from "lucide-react";

export default function ProfilePage() {
    const [mounted, setMounted] = useState(false);
    
    const [firstName, setFirstName] = useState("Guest");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("guest@example.com");
    const [phone, setPhone] = useState("+1 (555) 000-0000");

    useEffect(() => {
        setMounted(true);
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
        
        if (currentUser.firstName) setFirstName(currentUser.firstName);
        if (currentUser.lastName) setLastName(currentUser.lastName);
        if (currentUser.email) setEmail(currentUser.email);
        if (currentUser.phone) setPhone(currentUser.phone); 
    }, []);

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = { firstName, lastName, email, phone };
        sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
        
        alert("Profile updated successfully!"); 
    };

    if (!mounted) return null; 

    const initials = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`.toUpperCase();

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">My Profile</h2>
            <p className="text-slate-500">Manage your personal information and account details.</p>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-1 rounded-3xl shadow-sm border-none bg-white dark:bg-slate-900/50">
                    <CardContent className="flex flex-col items-center justify-center pt-6 text-center">
                        <div className="relative mb-4">
                            <div className="w-24 h-24 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 p-1 shadow-md">
                                <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-indigo-500">{initials}</span>
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-indigo-500 rounded-full text-white hover:bg-indigo-600 transition-colors shadow-sm">
                                <Camera size={14} />
                            </button>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {firstName} {lastName}
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">Pro Member</p>
                        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-4"></div>
                        <div className="w-full space-y-3 text-sm text-left">
                            <div className="flex items-center text-slate-600 dark:text-slate-400">
                                <Mail size={16} className="mr-3 text-indigo-500 shrink-0" /> 
                                <span className="truncate">{email}</span>
                            </div>
                            <div className="flex items-center text-slate-600 dark:text-slate-400">
                                <Phone size={16} className="mr-3 text-indigo-500 shrink-0" /> 
                                <span>{phone}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2 rounded-3xl shadow-sm border-none bg-white dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="text-xl">Edit Details</CardTitle>
                        <CardDescription>Update your personal information here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSaveChanges}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input 
                                        id="firstName" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="rounded-xl dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input 
                                        id="lastName" 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="rounded-xl dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-xl dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input 
                                    id="phone" 
                                    type="tel" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="rounded-xl dark:bg-slate-800 border-slate-200 dark:border-slate-700" 
                                />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <Button type="submit" className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white px-8 shadow-md">
                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}