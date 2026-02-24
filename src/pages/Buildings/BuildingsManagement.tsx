import SummaryCard from "../../components/Buildings/buildingcard";
import BuildingCard from "../../components/Buildings/summarycard";
import { useState } from "react";
import AddBuildingModal from "../../components/Buildings/addbuilding";
import UnitsModal from "../../components/Buildings/unitsmodel";
import EditBuildingModal from "../../components/Buildings/editnewbuilding";
import DeleteModal from "../../components/Buildings/deletemodel";
import buildingIcon from "../../assets/Dashboard/building.png"
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";

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

  const buildings = [
  {
    name: "Tower A",
    code: "TWR-A",
    address: "123 Main St, NYC",
    floors: 15,
    units: 45,
    occupied: 43,
  },
  {
    name: "Tower B",
    code: "TWR-B",
    address: "125 Main St, NYC",
    floors: 12,
    units: 42,
    occupied: 40,
  },
  {
    name: "Tower C",
    code: "TWR-C",
    address: "127 Main St, NYC",
    floors: 10,
    units: 33,
    occupied: 31,
  },
];

  return (
    <div>
      <h1 className={`text-3xl font-bold mb-1 ${FONTSIZE[36]}`}
      style={{fontWeight:WEIGHT.seven,color:COLORS.primary_white}}>Building Management</h1>
      <p className={`opacity-70 mb-6 ${FONTSIZE[16]}`} style={{fontWeight:WEIGHT.four,color:COLORS.grey}}>
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
        className="mb-8 flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition bg-linear-to-r from-[#2B7FFF] to-[#0092B8]"
      >
        <img src={buildingIcon} alt="building" className="w-5 h-5" />
         Add New Building
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
  {buildings.map((building, index) => (
    <BuildingCard
      key={index}
      name={building.name}
      code={building.code}
      address={building.address}
      floors={building.floors}
      units={building.units}
      occupied={building.occupied}
      onViewUnits={() => setOpenUnits(true)}
      onEdit={() => handleEdit(building)}
      onDelete={() => handleDeleteClick(building.name)}
    />
  ))}
</div>
    </div>
  );
}
