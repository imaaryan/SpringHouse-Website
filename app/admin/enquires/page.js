/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import PageHeader from "@/app/components/admin/PageHeader";
import DataTable from "@/app/components/admin/DataTable";

export default function EnquiresPage() {
  const [enquires, setEnquires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Selection state
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchEnquires = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/enquires?page=${page}&limit=${pagination.limit}`,
      );
      const data = await res.json();
      if (data.success) {
        setEnquires(data.data);
        setPagination(data.pagination);
        setSelectedItems([]);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquires(pagination.page);
  }, [pagination.page]);

  // Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(enquires.map((e) => e._id));
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
        `Are you sure you want to delete ${selectedItems.length} enquiries?`,
      )
    )
      return;

    try {
      const res = await fetch(`/api/admin/enquires`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedItems }),
      });
      const data = await res.json();
      if (data.success) {
        fetchEnquires(pagination.page);
        setSelectedItems([]);
      } else {
        alert("Failed to delete enquiries");
      }
    } catch (error) {
      alert("Error deleting enquiries");
    }
  };

  const columns = [
    {
      header: "Lead Info",
      accessor: "fullName",
      render: (row) => (
        <div>
          <div className="text-sm font-bold text-gray-900">{row.fullName}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {row.companyName || "N/A"}
          </div>
        </div>
      ),
    },
    {
      header: "Contact Details",
      render: (row) => (
        <div>
          <div className="text-sm text-brand-primary">{row.email}</div>
          <div className="text-xs text-gray-600 mt-0.5">
            {row.phoneNumber || "No Phone"}
          </div>
        </div>
      ),
    },
    {
      header: "Requirements",
      render: (row) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-800">
            {row.selectSolution || "General Enquiry"}
          </span>
          <div className="flex gap-2 text-xs text-gray-500">
            <span>{row.selectCity || "No City"}</span>
            <span>&bull;</span>
            <span>
              {row.deskRequirement
                ? `${row.deskRequirement} Desks`
                : "N/A Desks"}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Date Received",
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
  ];

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto w-full">
      <PageHeader
        title="Enquiries"
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
        data={enquires}
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
