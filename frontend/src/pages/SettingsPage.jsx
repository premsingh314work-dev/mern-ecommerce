import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";

function SettingsPage() {
  const {
    authUser,
    updateProfile,
    updatePassword,
    isUpdatingProfile,
    isUpdatingPassword,
  } = useAuthStore();

  const [name, setName] = useState(authUser?.name || "");
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [avatar, setAvatar] = useState(authUser?.avatar || "");
  const [address, setAddress] = useState({
    street: authUser?.address?.street || "",
    city: authUser?.address?.city || "",
    state: authUser?.address?.state || "",
    zipCode: authUser?.address?.zipCode || "",
    country: authUser?.address?.country || "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOpenAvatarWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "db2lak2ea", // same cloud name used elsewhere in your app
        uploadPreset: "product_unsigned",
        sources: ["local"],
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ["png", "jpg", "jpeg"],
        cropping: true,
        croppingAspectRatio: 1,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setAvatar(result.info.secure_url);
        }
      },
    );
    myWidget.open();
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ name, phone, avatar, address });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match");
      return;
    }

    try {
      await updatePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      // error toast already handled in the store
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAF9] mx-auto max-w-3xl px-6 py-14 sm:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Settings
        </h1>

        {/* Profile section */}
        <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-neutral-900">Profile</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Update your personal details and shipping address.
          </p>

          <form onSubmit={handleProfileSubmit} className="mt-6 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-5">
              <img
                src={avatar || "/default-avatar.png"}
                alt="Avatar"
                className="h-16 w-16 rounded-full border border-neutral-200 object-cover"
              />
              <button
                type="button"
                onClick={handleOpenAvatarWidget}
                className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-900 transition hover:border-neutral-900"
              >
                Change photo
              </button>
            </div>

            {/* Name & phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-1.5 text-sm font-medium text-neutral-700">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1.5 text-sm font-medium text-neutral-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                type="email"
                value={authUser?.email || ""}
                disabled
                className="cursor-not-allowed rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 text-sm text-neutral-500"
              />
              <p className="mt-1 text-xs text-neutral-400">
                Email can't be changed here. Contact support if you need this
                updated.
              </p>
            </div>

            {/* Address */}
            <div>
              <p className="mb-1.5 text-sm font-medium text-neutral-700">
                Shipping address
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, street: e.target.value }))
                  }
                  placeholder="Street address"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 sm:col-span-2"
                />
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="City"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, state: e.target.value }))
                  }
                  placeholder="State"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  value={address.zipCode}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, zipCode: e.target.value }))
                  }
                  placeholder="ZIP / postal code"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, country: e.target.value }))
                  }
                  placeholder="Country"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdatingProfile}
              className={`w-full rounded-full py-3 text-sm font-semibold text-white transition sm:w-auto sm:px-8 ${
                isUpdatingProfile
                  ? "cursor-not-allowed bg-neutral-300"
                  : "bg-neutral-900 hover:bg-neutral-800"
              }`}
            >
              {isUpdatingProfile ? "Saving…" : "Save changes"}
            </button>
          </form>
        </section>

        {/* Password section */}
        <section className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-neutral-900">Password</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Choose a new password for your account.
          </p>

          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-medium text-neutral-700">
                Current password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-1.5 text-sm font-medium text-neutral-700">
                  New password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1.5 text-sm font-medium text-neutral-700">
                  Confirm new password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className={`w-full rounded-full py-3 text-sm font-semibold text-white transition sm:w-auto sm:px-8 ${
                isUpdatingPassword
                  ? "cursor-not-allowed bg-neutral-300"
                  : "bg-neutral-900 hover:bg-neutral-800"
              }`}
            >
              {isUpdatingPassword ? "Updating…" : "Update password"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SettingsPage;
