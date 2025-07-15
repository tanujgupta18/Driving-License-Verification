import React from "react";
import {
  FaIdCard,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";

import { MdDateRange, MdNumbers } from "react-icons/md";

const InfoRow = ({ icon, label, value }) => (
  <div className="grid grid-cols-[24px_1fr] gap-3 items-start">
    <div className="text-blue-600 text-lg mt-1">{icon}</div>
    <div>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-gray-800 font-medium">{value}</div>
    </div>
  </div>
);

const ExtractedInfoCard = ({ info }) => {
  if (!info || typeof info !== "object") return null;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
        <FaIdCard className="text-blue-600" /> Driver's License Info
      </h2>

      <div className="space-y-5">
        <InfoRow icon={<FaUser />} label="Full Name" value={info.full_name} />
        <InfoRow
          icon={<FaCalendarAlt />}
          label="Date of Birth"
          value={info.dob}
        />
        <InfoRow
          icon={<MdNumbers />}
          label="License Number"
          value={info.license_number}
        />
        <InfoRow
          icon={<MdDateRange />}
          label="Expiry Date"
          value={info.expiry_date}
        />
        <InfoRow
          icon={<FaMapMarkerAlt />}
          label="Address"
          value={info.address}
        />
        <InfoRow
          icon={<FaBuilding />}
          label="Issuing Authority"
          value={info.issuing_authority}
        />
      </div>
    </div>
  );
};

export default ExtractedInfoCard;
