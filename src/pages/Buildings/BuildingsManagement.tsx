import SummaryCard from "../../components/Buildings/buildingcard";
import BuildingCard from "../../components/Buildings/summarycard";
import { useState } from "react";
import AddBuildingModal from "../../components/Buildings/addbuilding";
import UnitsModal from "../../components/Buildings/unitsmodel";
import EditBuildingModal from "../../components/Buildings/editnewbuilding";
import DeleteModal from "../../components/Buildings/deletemodel";

export default function BuildingsManagement() {
  const [openModal, setOpenModal] = useState(false);
  const [openUnits, setOpenUnits] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEdit = (building: any) => {
    setSelectedBuilding(building);
    setOpenEdit(true);
  };

  const handleDeleteClick = (buildingName: string) => {
    setSelectedBuilding(buildingName);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted:", selectedBuilding);
    setDeleteOpen(false);
    setSelectedBuilding(null);
  };

  const handleCancelDelete = () => {
    setDeleteOpen(false);
    setSelectedBuilding(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Building Management</h1>
      <p className="opacity-70 mb-6">
        Manage buildings, units, and infrastructure
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <SummaryCard
          title="Total Buildings"
          value={3}
          bgColor="bg-[#2B7FFF33]"
          borderColor="border-[#51A2FF4D]"
        />
        <SummaryCard
          title="Total Units"
          value={120}
          bgColor="bg-[#AD46FF33]"
          borderColor="border-[#C27AFF4D]"
        />
        <SummaryCard
          title="Occupied Units"
          value={114}
          bgColor="bg-[#00C95033]"
          borderColor="border-[#05DF724D]"
        />
        <SummaryCard
          title="Vacant Units"
          value={6}
          bgColor="bg-[#FF690033]"
          borderColor="border-[#FF89044D]"
        />
      </div>

      <button
        onClick={() => setOpenModal(true)}
        className="mb-8 flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full font-semibold text-black shadow-lg hover:scale-105 transition bg-linear-to-r from-[#2B7FFF] to-[#0092B8]"
      >
        🏢 Add New Building
      </button>

      <AddBuildingModal open={openModal} onClose={() => setOpenModal(false)} />
      <UnitsModal open={openUnits} onClose={() => setOpenUnits(false)} />

      {selectedBuilding && (
        <EditBuildingModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          building={selectedBuilding}
        />
      )}

      <DeleteModal
        open={deleteOpen}
        buildingName={selectedBuilding}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <BuildingCard
          name="Tower A"
          code="TWR-A"
          address="123 Main St, NYC"
          floors={15}
          units={45}
          occupied={43}
          onViewUnits={() => setOpenUnits(true)}
          onEdit={() =>
            handleEdit({
              name: "Tower A",
              code: "TWR-A",
              address: "123 Main St, NYC",
              floors: 15,
              units: 45,
            })
          }
          onDelete={() => handleDeleteClick("Tower A")}
        />

        <BuildingCard
          name="Tower B"
          code="TWR-B"
          address="125 Main St, NYC"
          floors={12}
          units={42}
          occupied={40}
          onViewUnits={() => setOpenUnits(true)}
          onEdit={() =>
            handleEdit({
              name: "Tower B",
              code: "TWR-B",
              address: "125 Main St, NYC",
              floors: 12,
              units: 42,
            })
          }
          onDelete={() => handleDeleteClick("Tower B")}
        />

        <BuildingCard
          name="Tower C"
          code="TWR-C"
          address="127 Main St, NYC"
          floors={10}
          units={33}
          occupied={31}
          onViewUnits={() => setOpenUnits(true)}
          onEdit={() =>
            handleEdit({
              name: "Tower C",
              code: "TWR-C",
              address: "127 Main St, NYC",
              floors: 10,
              units: 33,
            })
          }
          onDelete={() => handleDeleteClick("Tower C")}
        />
      </div>
    </div>
  );
}
