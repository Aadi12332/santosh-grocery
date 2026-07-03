import { useEffect, useRef, useState, useCallback, type ChangeEvent } from "react";
import {
  User,
  Mail,
  Phone,
  Camera,
  Bell,
  Globe,
  Moon,
  Smartphone,
  MapPin,
  Home,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  membershipTier: string;
  walletBalance: number;
  fullName: string;
};

type AddressForm = {
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
};

const EMPTY_ADDRESS_FORM: AddressForm = {
  label: "",
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  isDefault: false,
};

const API_BASE = "https://mr-santosh-grocery-backend.onrender.com/api/v1";

export default function AccountSettings() {
  const [tab, setTab] = useState("Profile");
  const navigate = useNavigate();
  const [toggles, setToggles] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: true,
  });
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: null,
    membershipTier: "Free",
    walletBalance: 0,
    fullName: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [addressError, setAddressError] = useState("");
  const [addressSaving, setAddressSaving] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [addressForm, setAddressForm] = useState<AddressForm>(EMPTY_ADDRESS_FORM);

  const [preferences, setPreferences] = useState({
    language: "",
    currency: "",
    darkMode: false,
  });

  const [preferencesLoading, setPreferencesLoading] = useState(false);
  const [preferencesError, setPreferencesError] = useState("");
  const [preferencesSuccess, setPreferencesSuccess] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteAddressLoading, setDeleteAddressLoading] = useState(false);
  const [deleteAddressError, setDeleteAddressError] = useState("");
  const [showPasswordSuccessModal, setShowPasswordSuccessModal] =
    useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  useEffect(() => {
    setProfileImage(profile.avatar || null);
  }, [profile.avatar]);

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const fetchProfile = useCallback(async () => {
    setLoadingProfile(true);
    setProfileError("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setProfileError("No auth token found.");
      setLoadingProfile(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to load profile.");
      }

      const fetchedUser = data?.data?.user;
      if (fetchedUser) {
        setProfile({
          firstName: fetchedUser.firstName || "",
          lastName: fetchedUser.lastName || "",
          email: fetchedUser.email || "",
          phone: fetchedUser.phone || "",
          avatar: fetchedUser.avatar || null,
          membershipTier: fetchedUser.membershipTier || "Free",
          walletBalance: fetchedUser.walletBalance || 0,
          fullName:
            fetchedUser.fullName ||
            `${fetchedUser.firstName || ""} ${fetchedUser.lastName || ""}`,
        });
        setAddresses(fetchedUser.addresses || []);
      }
    } catch (fetchError) {
      setProfileError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load profile.",
      );
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  const handleAddAddress = () => {
    setAddressError("");
    setIsEditingAddress(false);
    setEditingIndex(null);
    setAddressForm(EMPTY_ADDRESS_FORM);
    setShowAddressModal(true);
  };

  const handleEditAddress = (index: number) => {
    const address = addresses[index];

    setEditingIndex(index);

    setAddressForm({
      label: address.label || "",
      fullName: address.fullName || "",
      phone: address.phone || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
      country: address.country || "",
      isDefault: !!address.isDefault,
    });

    setIsEditingAddress(true);
    setAddressError("");
    setShowAddressModal(true);
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") ||
            data.message ||
            "Failed to update profile.",
        );
      }

      // API may return updated user or just success
      const updatedUser = data.data?.user ?? {
        ...profile,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
      };

      setProfile((prev) => ({
        ...prev,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
      }));

      // Update localStorage user
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          phone: updatedUser.phone,
        }),
      );

      setIsEditing(false);

      alert(data.message || "Profile updated successfully.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);

      reader.onerror = reject;
    });
  };

  const uploadProfileImage = async (file: File) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Authentication token not found.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);

      const response = await fetch(`${API_BASE}/users/profile/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: base64,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Image upload failed.");
      }

      const avatar = data.data?.user?.avatar ?? data.data?.avatar ?? base64;

      setProfile((prev) => ({
        ...prev,
        avatar,
      }));

      setProfileImage(avatar);

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          avatar,
        }),
      );

      alert(data.message || "Profile image updated.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional client-side validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    await uploadProfileImage(file);
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword.trim()) {
      setPasswordError("Current password is required.");
      return;
    }

    if (!newPassword.trim()) {
      setPasswordError("New password is required.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters and contain uppercase, lowercase, number and special character.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from current password.");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      setPasswordError("Authentication token not found.");
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch(`${API_BASE}/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") ||
            data.message ||
            "Unable to update password.",
        );
      }

      setPasswordSuccess(data.message || "Password updated successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowPasswordSuccessModal(true);

      setTimeout(() => {
        setShowPasswordSuccessModal(false);

        localStorage.clear();

        navigate("/role-wise-sign-in?role=customer");
      }, 2000);
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setDeleteError("Authentication token not found.");
      return;
    }

    setDeleteLoading(true);
    setDeleteError("");

    try {
      const response = await fetch(`${API_BASE}/users/account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") ||
            data.message ||
            "Unable to delete account.",
        );
      }

      localStorage.clear();

      navigate("/role-wise-sign-in?role=customer");
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setDeleteLoading(false);
      setShowDeleteAccountModal(false);
    }
  };

  const validateAddressForm = () => {
    if (!addressForm.fullName.trim()) {
      setAddressError("Full name is required.");
      return false;
    }

    if (!addressForm.phone.trim()) {
      setAddressError("Phone is required.");
      return false;
    }

    if (!addressForm.street.trim()) {
      setAddressError("Street is required.");
      return false;
    }

    if (!addressForm.city.trim()) {
      setAddressError("City is required.");
      return false;
    }

    if (!addressForm.zipCode.trim()) {
      setAddressError("zipCode is required.");
      return false;
    }

    if (!/^\d{6}$/.test(addressForm.zipCode)) {
      setAddressError("zipCode must be exactly 6 digits.");
      return false;
    }

    return true;
  };

  const handleSaveAddress = async () => {
    setAddressError("");

    if (!validateAddressForm()) return;

    const token = localStorage.getItem("authToken");

    if (!token) {
      setAddressError("Authentication token not found.");
      return;
    }

    const payload = {
      label: addressForm.label || "Home",
      fullName: addressForm.fullName,
      phone: addressForm.phone,
      street: addressForm.street,
      city: addressForm.city,
      state: addressForm.state,
      zipCode: addressForm.zipCode,
      country: addressForm.country,
      isDefault: addressForm.isDefault || addresses.length === 0,
    };

    setAddressSaving(true);

    try {
      if (isEditingAddress) {
        if (editingIndex === null) {
          throw new Error("No address selected to edit.");
        }

        const id = addresses[editingIndex]?._id;

        if (!id) {
          throw new Error("Address id not found.");
        }

        const response = await fetch(`${API_BASE}/users/addresses/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.join(", ") ||
              data.message ||
              "Unable to update address.",
          );
        }

        // Refresh from server so isDefault flags across addresses stay in sync
        await fetchProfile();
      } else {
        const response = await fetch(`${API_BASE}/users/addresses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors?.join(", ") ||
              data.message ||
              "Unable to add address.",
          );
        }

        if (data.data?.address) {
          setAddresses((prev) => [...prev, data.data.address]);
        } else {
          // Fallback: refresh from server to get canonical data (including _id)
          await fetchProfile();
        }
      }

      setAddressForm(EMPTY_ADDRESS_FORM);
      setEditingIndex(null);
      setIsEditingAddress(false);
      setShowAddressModal(false);
    } catch (err) {
      setAddressError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setAddressSaving(false);
    }
  };

  const handleUpdatePreferences = async () => {
    setPreferencesError("");
    setPreferencesSuccess("");

    const token = localStorage.getItem("authToken");

    if (!token) {
      setPreferencesError("Authentication token not found.");
      return;
    }

    setPreferencesLoading(true);

    try {
      const response = await fetch(`${API_BASE}/users/preferences`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(", ") ||
            data.message ||
            "Unable to update preferences.",
        );
      }

      setPreferencesSuccess(
        data.message || "Preferences updated successfully.",
      );
    } catch (err) {
      setPreferencesError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setPreferencesLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (deleteIndex === null) return;

    const token = localStorage.getItem("authToken");

    if (!token) {
      setDeleteAddressError("Authentication token not found.");
      return;
    }

    const id = addresses[deleteIndex]?._id;

    if (!id) {
      setDeleteAddressError("Address id not found.");
      return;
    }

    setDeleteAddressLoading(true);
    setDeleteAddressError("");

    try {
      const response = await fetch(`${API_BASE}/users/addresses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete address.");
      }

      await fetchProfile();

      setShowDeleteModal(false);
      setDeleteIndex(null);
    } catch (err) {
      setDeleteAddressError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setDeleteAddressLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="lg:text-[34px] text-[24px] font-playfair font-medium text-[#0F172A]">
          Account Settings
        </h1>
        <p className="text-[#6A7282] mt-1 lg:text-lg text-base">
          Manage your profile, security, and preferences.
        </p>
      </div>

      <div className="flex lg:gap-2 gap-1 bg-[#F1F5F9] p-1 rounded-lg lg:rounded-xl w-fit">
        {["Profile", "Security", "Preferences", "Addresses"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`sm:px-4 px-2 py-2 rounded-lg text-sm ${
              tab === t ? "bg-white shadow-sm" : "text-[#475569]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Profile" && (
        <div className="border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-8">
          <div>
            <h2 className="font-playfair text-xl text-[#0F172A]">
              Personal Information
            </h2>
            <p className="text-[#6A7282]">Update your personal details here.</p>
          </div>
          {loadingProfile ? (
            <p className="text-[#6A7282]">Loading profile...</p>
          ) : profileError ? (
            <p className="text-[#F87171]">{profileError}</p>
          ) : null}

          <div className="flex items-center lg:gap-6 gap-3">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="md:min-w-24 md:w-24 md:h-24 w-16 h-16 min-w-16 rounded-full object-cover"
                />
              ) : (
                <div className="md:min-w-24 md:w-24 md:h-24 w-16 h-16 min-w-16 rounded-full bg-gray-100 text-black flex items-center justify-center font-semibold md:text-3xl text-xl">
                  {initials || "U"}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 md:w-8 md:h-8 w-5 h-5 bg-[#009966] text-white rounded-full flex items-center justify-center shadow"
              >
                <Camera className="md:w-4 w-3" />
              </button>
            </div>

            <div>
              <p className="font-playfair text-lg text-[#0F172A]">
                Profile Picture
              </p>

              <p className="text-[#6A7282] lg:text-sm text-xs">
                JPG, GIF or PNG. Max size of 2MB.
              </p>

              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={!profileImage}
                className={`mt-2 border rounded-lg px-4 py-1 text-sm transition ${
                  profileImage
                    ? "border-[#E5E7EB] hover:bg-gray-50 text-[#0F172A]"
                    : "border-[#E5E7EB] text-gray-400 bg-gray-100 cursor-not-allowed"
                }`}
              >
                Remove
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-[#475569]">First Name</label>
              <div className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center gap-1">
                <User size={16} className="text-[#94A3B8]" />
                <input
                  value={profile.firstName}
                  disabled={!isEditing}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setProfile((prev) => ({
                      ...prev,
                      firstName: event.target.value,
                    }))
                  }
                  className={`ml-2 flex-1 outline-none ${
                    !isEditing
                      ? "bg-transparent cursor-not-allowed text-gray-500"
                      : ""
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#475569]">Last Name</label>
              <div className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center gap-1">
                <User size={16} className="text-[#94A3B8]" />
                <input
                  value={profile.lastName}
                  disabled={!isEditing}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setProfile((prev) => ({
                      ...prev,
                      lastName: event.target.value,
                    }))
                  }
                  className={`ml-2 flex-1 outline-none ${
                    !isEditing
                      ? "bg-transparent cursor-not-allowed text-gray-500"
                      : ""
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#475569]">Email Address</label>
              <div className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center gap-1 bg-gray-50">
                <Mail size={16} className="text-[#94A3B8]" />
                <input
                  value={profile.email}
                  disabled
                  className="ml-2 flex-1 outline-none bg-transparent cursor-not-allowed text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#475569]">Phone Number</label>
              <div className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center gap-1">
                <Phone size={16} className="text-[#94A3B8]" />
                <input
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setProfile((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                  className={`ml-2 flex-1 outline-none ${
                    !isEditing
                      ? "bg-transparent cursor-not-allowed text-gray-500"
                      : ""
                  }`}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  void handleUpdateProfile();
                } else {
                  setIsEditing(true);
                }
              }}
              className="border border-[#E5E7EB] px-5 py-2 rounded-lg bg-white shadow-sm w-fit"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      )}

      {tab === "Security" && (
        <div className="border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-8">
          <div>
            <h2 className="font-playfair text-xl">Password & Security</h2>
            <p className="text-[#6A7282]">
              Manage your password and security settings.
            </p>
          </div>

          <div className="space-y-4 max-w-xl">
            <p className="font-playfair text-lg">Change Password</p>

            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 pr-12 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 pr-12 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 pr-12 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}

            {passwordSuccess && (
              <p className="text-green-600 text-sm">{passwordSuccess}</p>
            )}

            <button
              onClick={handleChangePassword}
              disabled={passwordLoading}
              className="bg-[#009966] text-white px-6 py-3 rounded-lg disabled:opacity-60"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>

          <div className="border-t pt-6 flex items-center justify-between">
            <div>
              <h3 className="font-playfair text-lg">
                Two-Factor Authentication
              </h3>
              <p className="text-[#6A7282] text-sm">
                Add an extra layer of security to your account.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-red-500 text-sm border px-3 py-1 rounded-full border-red-200">
                Disabled
              </span>
            </div>
          </div>
          <button className="border border-[#E5E7EB] px-4 py-2 rounded-lg">
            Enable 2FA
          </button>
        </div>
      )}

      {tab === "Preferences" && (
        <div className="space-y-6">
          <div className="border border-[#E5E7EB] rounded-lg lg:rounded-xl lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-6">
            <div className="flex items-center gap-3">
              <Bell className="text-[#009966]" size={20} />
              <h3 className="font-playfair text-lg">Notifications</h3>
            </div>

            {["Order Updates", "Promotions & Offers", "Driver Messages"].map(
              (n, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-[#0F172A]">{n}</p>
                    <p className="text-sm text-[#6A7282]">
                      Receive updates about your order.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setToggles((prev) => ({
                        ...prev,
                        [i]: !prev[i],
                      }))
                    }
                    className={`w-12 p-0.5 flex items-center rounded-full transition ${
                      toggles[i]
                        ? "bg-[#009966] justify-end"
                        : "bg-[#CBD5E1] justify-start"
                    }`}
                  >
                    <span className="w-5 h-5 bg-white rounded-full shadow" />
                  </button>
                </div>
              ),
            )}
          </div>

          <div className="border border-[#E5E7EB] rounded-xl lg:p-8 p-4 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-blue-500" size={20} />
              <h3 className="font-playfair text-lg">Preferences</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-[#475569]">Language</label>

                <select
                  value={preferences.language}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-[#475569]">Currency</label>

                <select
                  value={preferences.currency}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div className="border-t border-[#E5E7EB] my-6"></div>

            <div className="flex items-center gap-3">
              <Moon className="text-purple-500" />
              <h3 className="font-playfair text-lg">Appearance</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-5">
              <label
                className={`border-2 rounded-lg lg:rounded-xl p-6 text-center cursor-pointer transition ${
                  preferences.darkMode
                    ? "border-[#009966] bg-[#F0FDF4]"
                    : "border-[#E5E7EB]"
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  checked={preferences.darkMode}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      darkMode: true,
                    }))
                  }
                  className="hidden"
                />
                <Moon
                  className={`mx-auto mb-2 ${
                    preferences.darkMode ? "text-[#009966]" : ""
                  }`}
                />
                Dark Mode
              </label>
              <label
                className={`border-2 rounded-lg lg:rounded-xl p-6 text-center cursor-pointer transition ${
                  !preferences.darkMode
                    ? "border-[#009966] bg-[#F0FDF4]"
                    : "border-[#E5E7EB]"
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  checked={!preferences.darkMode}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      darkMode: false,
                    }))
                  }
                  className="hidden"
                />
                <Smartphone
                  className={`mx-auto mb-2 ${
                    !preferences.darkMode ? "text-[#009966]" : ""
                  }`}
                />
                Light Mode
              </label>
            </div>

            {preferencesError && (
              <p className="text-red-500 text-sm mt-5">{preferencesError}</p>
            )}

            {preferencesSuccess && (
              <p className="text-green-600 text-sm mt-5">
                {preferencesSuccess}
              </p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUpdatePreferences}
                disabled={preferencesLoading}
                className="bg-[#009966] text-white px-6 py-3 rounded-lg disabled:opacity-60"
              >
                {preferencesLoading ? "Updating..." : "Update Preferences"}
              </button>
            </div>
          </div>

          <div className="border border-red-200 bg-red-50 rounded-lg lg:rounded-xl lg:p-6 p-3">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="text-[#E7000B]" />
              <h3 className="font-playfair text-lg text-[#E7000B]">
                Danger Zone
              </h3>
            </div>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="text-red-600 font-playfair">Delete Account</h3>
                <p className="text-red-500 text-sm">
                  Permanently remove your account and data.
                </p>
              </div>

              <button
                onClick={() => {
                  setDeleteError("");
                  setShowDeleteAccountModal(true);
                }}
                className="border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "Addresses" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div
            onClick={handleAddAddress}
            className="border cursor-pointer border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-6 p-3 flex flex-col items-center justify-center text-[#6A7282] bg-[#fff]"
          >
            <span className="bg-[#F3F4F6] rounded-full w-[54px] h-[54px] flex justify-center items-center">
              <MapPin size={28} />
            </span>
            <p className="mt-3">Add New Address</p>
          </div>

          {addresses.map((address, index) => (
            <div
              key={address._id || index}
              className="border border-[#34D399] lg:rounded-xl rounded-lg lg:p-6 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Home size={18} className="text-[#009966]" />

                  <div>
                    <h3 className="font-playfair text-lg">
                      {address.label || `Address ${index + 1}`}
                    </h3>

                    <p className="text-xs text-[#6A7282]">{address.fullName}</p>
                  </div>
                </div>

                {address.isDefault && (
                  <span className="bg-[#009966] text-white text-xs px-3 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>

              <div className="space-y-1 text-sm text-[#6A7282]">
                <p>
                  <span className="font-medium text-[#0F172A]">Phone:</span>{" "}
                  {address.phone}
                </p>

                <p>
                  <span className="font-medium text-[#0F172A]">Street:</span>{" "}
                  {address.street}
                </p>

                <p>
                  <span className="font-medium text-[#0F172A]">City:</span>{" "}
                  {address.city}
                </p>

                <p>
                  <span className="font-medium text-[#0F172A]">State:</span>{" "}
                  {address.state}
                </p>

                <p>
                  <span className="font-medium text-[#0F172A]">Zip Code:</span>{" "}
                  {address.zipCode}
                </p>

                <p>
                  <span className="font-medium text-[#0F172A]">Country:</span>{" "}
                  {address.country}
                </p>
              </div>

              <div className="flex gap-4 mt-5 text-sm">
                <button
                  onClick={() => handleEditAddress(index)}
                  className="text-[#6A7282]"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setDeleteIndex(index);
                    setDeleteAddressError("");
                    setShowDeleteModal(true);
                  }}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 !mt-0">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-5">
              {isEditingAddress ? "Edit Address" : "Add Address"}
            </h2>

            <input
              placeholder="Label (Home/Office)"
              value={addressForm.label}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, label: e.target.value }))
              }
              className="w-full border rounded-lg p-3 mb-2.5"
            />

            <input
              placeholder="Full Name"
              value={addressForm.fullName}
              onChange={(e) =>
                setAddressForm((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              className="w-full border rounded-lg p-3 mb-2.5"
            />

            <input
              placeholder="Phone"
              value={addressForm.phone}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full border rounded-lg p-3 mb-2.5"
            />

            <input
              placeholder="Street"
              value={addressForm.street}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, street: e.target.value }))
              }
              className="w-full border rounded-lg p-3 !text-black mb-2.5"
            />

            <input
              placeholder="City"
              value={addressForm.city}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, city: e.target.value }))
              }
              className="w-full border rounded-lg p-3 !text-black mb-2.5"
            />

            <input
              placeholder="zipCode"
              value={addressForm.zipCode}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, zipCode: e.target.value }))
              }
              className="w-full border rounded-lg p-3 !text-black mb-2.5"
            />

            <input
              placeholder="State"
              value={addressForm.state}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, state: e.target.value }))
              }
              className="w-full border rounded-lg p-3 mb-2.5"
            />

            <input
              placeholder="Country"
              value={addressForm.country}
              onChange={(e) =>
                setAddressForm((prev) => ({ ...prev, country: e.target.value }))
              }
              className="w-full border rounded-lg p-3 mb-2.5"
            />

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={addressForm.isDefault}
                className="w-4 h-4 accent-[#009966]"
                onChange={(e) =>
                  setAddressForm((prev) => ({
                    ...prev,
                    isDefault: e.target.checked,
                  }))
                }
              />
              Set as default address
            </label>

            {addressError && (
              <p className="mt-3 text-sm text-red-500">{addressError}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddressModal(false);
                  setAddressError("");
                  setEditingIndex(null);
                  setIsEditingAddress(false);
                  setAddressForm(EMPTY_ADDRESS_FORM);
                }}
                className="border px-4 py-2 rounded-lg"
                disabled={addressSaving}
              >
                Cancel
              </button>

              <button
                onClick={handleSaveAddress}
                disabled={addressSaving}
                className="bg-[#009966] text-white px-5 py-2 rounded-lg disabled:opacity-60"
              >
                {addressSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 !mt-0">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold">Delete Address</h2>

            <p className="mt-3 text-[#6A7282]">
              Are you sure you want to delete this address?
            </p>

            {deleteAddressError && (
              <p className="mt-3 text-sm text-red-500">{deleteAddressError}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteAddressError("");
                }}
                disabled={deleteAddressLoading}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAddress}
                disabled={deleteAddressLoading}
                className="bg-red-500 text-white px-5 py-2 rounded-lg disabled:opacity-60"
              >
                {deleteAddressLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 !mt-0">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#0F172A]">
              Password Updated
            </h2>

            <p className="mt-2 text-sm text-[#6A7282]">
              Your password has been changed successfully.
              <br />
              Please sign in again.
            </p>

            <button
              onClick={() => {
                setShowPasswordSuccessModal(false);
                localStorage.clear();
                navigate("/role-wise-sign-in?role=customer");
              }}
              className="mt-6 w-full rounded-lg bg-[#009966] py-3 text-white hover:opacity-90"
            >
              Continue to Login
            </button>
          </div>
        </div>
      )}

      {showDeleteAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 !mt-0">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={24} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0F172A]">
                  Delete Account
                </h2>

                <p className="text-sm text-[#6A7282] mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="mt-5 text-[#475569]">
              Are you sure you want to permanently delete your account and all
              associated data?
            </p>

            {deleteError && (
              <p className="mt-4 text-sm text-red-500">{deleteError}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteAccountModal(false)}
                disabled={deleteLoading}
                className="border border-[#E5E7EB] rounded-lg px-5 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-5 py-2 disabled:opacity-60"
              >
                {deleteLoading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}