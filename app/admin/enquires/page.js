/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { Trash2, CheckCircle2, Circle, Download } from "lucide-react";
import * as XLSX from "xlsx";
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

  // Read toggle logic
  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/enquires`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchEnquires(pagination.page);
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

  const handleExportExcel = async () => {
    try {
      const res = await fetch("/api/admin/enquires?all=true");
      const data = await res.json();
      if (data.success && data.data) {
        // Format data for Excel
        const excelData = data.data.map((item) => ({
          "Full Name": item.fullName,
          "Email": item.email,
          "Phone Number": item.phoneNumber,
          "Company Name": item.companyName || "N/A",
          "Requirement": item.selectSolution || "General",
          "Selected City": item.selectCity || "N/A",
          "Selected Property": item.selectProperty || "N/A",
          "Desks": item.deskRequirement || "N/A",
          "Message": item.message || "N/A",
          "Status": item.isRead ? "Viewed" : "New",
          "Date Received": new Date(item.createdAt).toLocaleDateString("en-GB"),
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
        XLSX.writeFile(workbook, `Enquiries_${new Date().getTime()}.xlsx`);
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Failed to export data to Excel");
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
            <span>{row.selectProperty || "No Property"}</span>
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
        title="Enquiries"
        actions={
          <div className="flex gap-3">
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition shadow-sm uppercase"
            >
              <Download size={16} />
              Export
            </button>
            {selectedItems.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition shadow-sm uppercase"
              >
                <Trash2 size={16} />
                Delete ({selectedItems.length})
              </button>
            )}
          </div>
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
