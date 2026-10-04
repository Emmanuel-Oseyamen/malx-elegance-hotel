"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LogOut,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setEmail(user.email ?? "");
      setNewEmail(user.email ?? "");
      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleEmailChange() {
    setEmailError("");
    setEmailSuccess("");

    const trimmedEmail = newEmail.trim();

    if (!trimmedEmail) {
      setEmailError("Please enter an email address.");
      return;
    }

    if (trimmedEmail === email) {
      setEmailError("This is already your current email address.");
      return;
    }

    setSavingEmail(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email: trimmedEmail,
      });

      if (error) {
        console.error("Failed to update email:", error);
        setEmailError(error.message);
        return;
      }

      setEmailSuccess(
        "Email change requested. Please check the relevant email inboxes for the confirmation link."
      );
    } catch (error) {
      console.error("Unexpected email update error:", error);
      setEmailError("Unable to update your email. Please try again.");
    } finally {
      setSavingEmail(false);
    }
  }

  async function handlePasswordChange() {
    setPasswordError("");
    setPasswordSuccess("");

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("The passwords do not match.");
      return;
    }

    setSavingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Failed to update password:", error);
        setPasswordError(error.message);
        return;
      }

      setNewPassword("");
      setConfirmPassword("");

      setPasswordSuccess("Your password has been changed successfully.");
    } catch (error) {
      console.error("Unexpected password update error:", error);
      setPasswordError("Unable to change your password. Please try again.");
    } finally {
      setSavingPassword(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await supabase.auth.signOut();
      router.replace("/admin/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
      setSigningOut(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b] text-white">
        <Loader2 className="h-6 w-6 animate-spin text-[#D4A373]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[#D4A373]">
            Admin Account
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Account Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Manage the login credentials used to access the MALX Elegance Hotel
            administration panel.
          </p>
        </div>

        <div className="space-y-6">
          {/* Current account */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D4A373]/10 text-[#D4A373]">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-medium">Current account</h2>
                <p className="mt-1 text-sm text-white/45">
                  This is the account currently signed into the dashboard.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="mb-1 text-xs uppercase tracking-wider text-white/35">
                Login email
              </p>

              <p className="break-all text-sm text-white/85">{email}</p>
            </div>
          </section>

          {/* Email */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D4A373]/10 text-[#D4A373]">
                <Mail className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-medium">Change email</h2>
                <p className="mt-1 text-sm text-white/45">
                  Update the email address used to sign in to the admin panel.
                </p>
              </div>
            </div>

            <div className="max-w-xl">
              <label className="mb-2 block text-sm text-white/70">
                New email address
              </label>

              <input
                type="email"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setEmailError("");
                  setEmailSuccess("");
                }}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D4A373]/60"
                placeholder="admin@example.com"
              />

              {emailError && (
                <p className="mt-3 text-sm text-red-400">{emailError}</p>
              )}

              {emailSuccess && (
                <div className="mt-3 flex items-start gap-2 text-sm text-emerald-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{emailSuccess}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleEmailChange}
                disabled={savingEmail}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#D4A373] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e0b17e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    Update Email
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Password */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D4A373]/10 text-[#D4A373]">
                <KeyRound className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-medium">Change password</h2>
                <p className="mt-1 text-sm text-white/45">
                  Choose a strong password of at least 8 characters.
                </p>
              </div>
            </div>

            <div className="max-w-xl space-y-5">
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  New password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError("");
                      setPasswordSuccess("");
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D4A373]/60"
                    placeholder="Enter new password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/40 transition hover:text-white"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Confirm new password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                      setPasswordSuccess("");
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D4A373]/60"
                    placeholder="Confirm new password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/40 transition hover:text-white"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {passwordError && (
                <p className="text-sm text-red-400">{passwordError}</p>
              )}

              {passwordSuccess && (
                <div className="flex items-start gap-2 text-sm text-emerald-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handlePasswordChange}
                disabled={savingPassword}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#D4A373] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e0b17e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    Change Password
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Sign out */}
          <section className="rounded-3xl border border-red-500/10 bg-red-500/[0.03] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-medium">Sign out</h2>
                <p className="mt-1 text-sm text-white/45">
                  Sign out of the current MALX administration session.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {signingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}