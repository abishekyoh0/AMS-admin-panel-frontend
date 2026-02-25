import React, { useState } from "react";

import StatsSection from "../../components/AccessManagement/StatsSection";
import ActionBar from "../../components/AccessManagement/ActionBar";
import FilterTabs from "../../components/AccessManagement/FilterTabs";
import FormCard from "../../components/AccessManagement/FormCard";
import MoveInDetailsModal from "../../components/AccessManagement/MoveInDetailsModal";

import MoveOutCard, {
  type MoveOutData,
} from "../../components/AccessManagement/MoveOutCard";
import MoveOutDetailsModal from "../../components/AccessManagement/MoveOutDetailsModal";

import AccessRequestCard, {
  type AccessRequestData,
} from "../../components/AccessManagement/AccessRequestCard";
import AccessRequestModal from "../../components/AccessManagement/AccessRequestModal";

import {
  COLORS,
  FONTSIZE,
  FONTWEIGHT,
} from "../../constent/uiconstent";


export type StatusType =
  | "Pending"
  | "Approved"
  | "Completed"
  | "Inspected";

export interface FormData {
  id: number;
  name: string;
  status: StatusType;
  property: string;
  moveInDate: string;
  deposit: string;
  submitted: string;
}



export const formList: FormData[] = [
  {
    id: 1,
    name: "John Smith",
    status: "Pending",
    property: "Tower-C-205",
    moveInDate: "2024-03-15",
    deposit: "$5,000",
    submitted: "2/10/2024",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    status: "Approved",
    property: "Tower-A-205",
    moveInDate: "2024-03-20",
    deposit: "$7,500",
    submitted: "2/12/2024",
  },
  {
    id: 3,
    name: "Michael Brown",
    status: "Pending",
    property: "Tower-B-102",
    moveInDate: "2024-01-10",
    deposit: "$6,000",
    submitted: "1/05/2024",
  },
  {
    id: 4,
    name: "Emma Davis",
    status: "Approved",
    property: "Tower-D-404",
    moveInDate: "2024-02-12",
    deposit: "$4,500",
    submitted: "2/01/2024",
  },
];



const moveOutData: MoveOutData[] = [
  {
    id: 1,
    name: "Robert",
    status: "Pending",
    property: "Tower-A-301",
    moveOutDate: "2024-03-31",
    original: "$5,000",
    deductions: "-$800",
    refund: "$4,200",
  },
  {
    id: 2,
    name: "Amanda Thompson",
    status: "Inspected",
    property: "Tower-B-302",
    moveOutDate: "2024-04-05",
    original: "$7,500",
    deductions: "-$150",
    refund: "$7,350",
  },
  {
    id: 3,
    name: "Thomas Anderson",
    status: "Completed",
    property: "Tower-C-204",
    moveOutDate: "2024-02-28",
    original: "$6,000",
    deductions: "-$1,250",
    refund: "$4,750",
  },
];



const accessData: AccessRequestData[] = [
  {
    id: 1,
    type: "Access Card",
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    unit: "Tower-A-201",
    submitted: "2/20/2024",
    status: "Pending",
  },
  {
    id: 2,
    type: "Fingerprint Access",
    name: "Rachel Green",
    email: "rachel.g@email.com",
    unit: "8C",
    submitted: "2/18/2024",
    status: "Approved",
  },
  {
    id: 3,
    type: "Phone/Call Access",
    name: "Mark Davis",
    email: "mark.d@email.com",
    unit: "12A",
    submitted: "2/15/2024",
    status: "Active",
  },
];



const AccessManagement: React.FC = () => {
  const [activeType, setActiveType] = useState<
    "moveIn" | "moveOut" | "access"
  >("moveIn");


  const [activeTab, setActiveTab] =
    useState<"All" | StatusType>("All");

  const [selectedForm, setSelectedForm] =
    useState<FormData | null>(null);

  const [isMoveInModalOpen, setIsMoveInModalOpen] =
    useState(false);

  const filteredForms =
    activeTab === "All"
      ? formList
      : formList.filter((f) => f.status === activeTab);


  const [moveOutStatus, setMoveOutStatus] =
    useState<"All" | "Pending" | "Inspected" | "Completed">("All");

  const [selectedMoveOut, setSelectedMoveOut] =
    useState<MoveOutData | null>(null);

  const [isMoveOutModalOpen, setIsMoveOutModalOpen] =
    useState(false);

  const filteredMoveOut =
    moveOutStatus === "All"
      ? moveOutData
      : moveOutData.filter(
          (item) => item.status === moveOutStatus
        );


  const [accessStatus, setAccessStatus] =
    useState<"All" | "Pending" | "Approved" | "Active">("All");

  const [selectedAccess, setSelectedAccess] =
    useState<AccessRequestData | null>(null);

  const [isAccessModalOpen, setIsAccessModalOpen] =
    useState(false);

  const filteredAccess =
    accessStatus === "All"
      ? accessData
      : accessData.filter(
          (item) => item.status === accessStatus
        );


  const handleMoveInView = (form: FormData) => {
    setSelectedForm(form);
    setIsMoveInModalOpen(true);
  };

  const handleMoveOutView = (data: MoveOutData) => {
    setSelectedMoveOut(data);
    setIsMoveOutModalOpen(true);
  };

  const handleAccessView = (data: AccessRequestData) => {
    setSelectedAccess(data);
    setIsAccessModalOpen(true);
  };


  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: COLORS.primary_black,
        color: COLORS.primary_white,
        ...FONTWEIGHT[400],
      }}
    >
      <div className="max-w-7xl mx-auto space-y-6">

        <div>
          <h1
            className={FONTSIZE[28]}
            style={{
              ...FONTWEIGHT[700],
              color: COLORS.primary_white,
            }}
          >
            Access Management
          </h1>

          <p
            className={`${FONTSIZE[14]} mt-2`}
            style={{
              ...FONTWEIGHT[400],
              color: COLORS.secoundy_gray,
            }}
          >
            Manage Resident move-in and out applications
          </p>
        </div>

        <StatsSection
          totalCount={
            formList.length +
            moveOutData.length +
            accessData.length
          }
          moveInCount={formList.length}
          moveOutCount={moveOutData.length}
          accessCount={accessData.length}
        />

        <ActionBar
          activeType={activeType}
          setActiveType={setActiveType}
        />

        {activeType === "moveIn" && (
          <FilterTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={["All", "Pending", "Approved"]}
          />
        )}

        {activeType === "moveOut" && (
          <FilterTabs
            activeTab={moveOutStatus}
            setActiveTab={setMoveOutStatus}
            tabs={["All", "Pending", "Inspected", "Completed"]}
          />
        )}

        {activeType === "access" && (
          <FilterTabs
            activeTab={accessStatus}
            setActiveTab={setAccessStatus}
            tabs={["All", "Pending", "Approved", "Active"]}
          />
        )}

        <div className="space-y-4">
          {activeType === "moveIn" &&
            filteredForms.map((form) => (
              <FormCard
                key={form.id}
                form={form}
                onView={handleMoveInView}
              />
            ))}

          {activeType === "moveOut" &&
            filteredMoveOut.map((item) => (
              <MoveOutCard
                key={item.id}
                data={item}
                onView={handleMoveOutView}
              />
            ))}

          {activeType === "access" &&
            filteredAccess.map((item) => (
              <AccessRequestCard
                key={item.id}
                data={item}
                onView={handleAccessView}
              />
            ))}
        </div>
      </div>

      <MoveInDetailsModal
        isOpen={isMoveInModalOpen}
        onClose={() => setIsMoveInModalOpen(false)}
        form={selectedForm}
      />

      <MoveOutDetailsModal
        isOpen={isMoveOutModalOpen}
        onClose={() => setIsMoveOutModalOpen(false)}
        data={selectedMoveOut}
      />

      <AccessRequestModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        data={selectedAccess}
      />
    </div>
  );
};

export default AccessManagement;
