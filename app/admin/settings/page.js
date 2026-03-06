"use client";
import React, { useState, useEffect } from "react";
import { Save, Phone, MessageCircle } from "lucide-react";
import PageHeader from "@/app/components/admin/PageHeader";
import { FormInput } from "@/app/components/admin/FormElements";

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    phoneNumber: "+91",
    whatsappNumber: "+91",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.success && data.data) {
          setFormData({
            phoneNumber: data.data.phoneNumber || "+91",
            whatsappNumber: data.data.whatsappNumber || "+91",
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Settings saved successfully!");
      } else {
        alert("Error saving settings");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto w-full pb-20">
      <PageHeader
        title="Settings"
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-medium text-white transition shadow-sm uppercase ${
              saving ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-600"
            }`}
          >
            {saving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save size={16} />
            )}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        }
      />

      {/* Global Information Form */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-base font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
          Global Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex flex-row items-center gap-2">
              <Phone size={16} className="text-gray-400" /> Primary Phone Number
            </label>
            <FormInput
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+91"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex flex-row items-center gap-2">
              <MessageCircle size={16} className="text-[#25D366]" /> Official
              WhatsApp Number
            </label>
            <FormInput
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              placeholder="+91"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
