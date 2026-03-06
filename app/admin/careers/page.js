/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Download, CheckCircle2, Circle } from "lucide-react";
import PageHeader from "@/app/components/admin/PageHeader";
import DataTable from "@/app/components/admin/DataTable";

export default function CareersPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Selection state
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchCareers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/careers?page=${page}&limit=${pagination.limit}`,
      );
      const data = await res.json();
      if (data.success) {
        setCareers(data.data);
        setPagination(data.pagination);
        setSelectedItems([]);
      }
    } catch (error) {
      console.error("Error fetching careers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers(pagination.page);
  }, [pagination.page]);

  // Read toggle logic
  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/careers`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCareers(pagination.page);
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Error updating status");
    }
  };

  // Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(careers.map((c) => c._id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedItems.length} applicants?`,
      )
    )
      return;

    try {
      const res = await fetch(`/api/admin/careers`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedItems }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCareers(pagination.page);
        setSelectedItems([]);
      } else {
        alert("Failed to delete applicants");
      }
    } catch (error) {
      alert("Error deleting applicants");
    }
  };

  const handleDownloadResume = (resumeUrl) => {
    if (!resumeUrl) {
      alert("No resume attached for this applicant.");
      return;
    }
    window.open(resumeUrl, "_blank");
  };

  const columns = [
    {
      header: "Applicant",
      accessor: "fullName",
      render: (row) => (
        <div>
          <div className="text-sm font-bold text-gray-900">{row.fullName}</div>
          <div className="text-xs text-brand-primary mt-0.5">{row.email}</div>
        </div>
      ),
    },
    {
      header: "Applying For",
      accessor: "applyingFor",
      render: (row) => (
        <div className="text-sm text-gray-700 font-medium whitespace-nowrap">
          {row.applyingFor || "Not Specified"}
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: "contactNumber",
      render: (row) => (
        <div className="text-sm text-gray-600">
          {row.contactNumber || "N/A"}
        </div>
      ),
    },
    {
      header: "Date Applied",
      render: (row) => (
        <div className="text-sm text-gray-500">
          {new Date(row.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      header: "Resume",
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownloadResume(row.resume);
          }}
          disabled={!row.resume}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition ${
            row.resume
              ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20"
              : "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed hidden md:flex"
          }`}
          title={row.resume ? "Download Resume" : "No resume found"}
        >
          <Download size={14} />
          {row.resume ? "Download" : "None"}
        </button>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleRead(row._id, row.isRead);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all border-2 ${
            row.isRead
              ? "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100 opacity-60 hover:opacity-100"
              : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
          }`}
        >
          {row.isRead ? (
            <>
              <CheckCircle2 size={14} /> Viewed
            </>
          ) : (
            <>
              <Circle size={14} className="fill-red-500/20 text-red-500" /> New
            </>
          )}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto w-full">
      <PageHeader
        title="Careers Submissions"
        actions={
          selectedItems.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition shadow-sm uppercase"
            >
              <Trash2 size={16} />
              Delete ({selectedItems.length})
            </button>
          )
        }
      />

      <DataTable
        columns={columns}
        data={careers}
        loading={loading}
        pagination={pagination}
        onPageChange={(newPage) =>
          setPagination((prev) => ({ ...prev, page: newPage }))
        }
        selection={{
          selectedItems,
          onSelectAll: handleSelectAll,
          onSelectItem: handleSelectItem,
        }}
      />
    </div>
  );
}
