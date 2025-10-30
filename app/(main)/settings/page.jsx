"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const router = useRouter();
  const {user} = useUser();
  const [userData, setUser] = useState({
    name: user?.name,
    email: user?.email,
  });
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear auth token
    router.push("/login"); // Redirect to login page
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate profile update
    setTimeout(() => {
      alert("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate password change
    setTimeout(() => {
      alert("Password changed successfully!");
      setNewPassword("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screenpy-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Profile Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">Profile</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={(e) => setUser({ ...userData, name: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={(e) => setUser({ ...userData, email: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Password Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* Logout Section */}
        <div className="w-full text-center">
          <Button
            variant="destructive"
            className={'w-full'}
            onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}