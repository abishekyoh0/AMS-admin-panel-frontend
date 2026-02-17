

type Props = {
  name: string;
  code: string;
  address: string;
  floors: number;
  units: number;
  occupied: number;
     onViewUnits: () => void;
     onEdit: () => void; 
      onDelete: () => void;
};

export default function BuildingCard({
  name,
  code,
  address,
  floors,
  units,
  occupied,
  onViewUnits,
  onEdit,
  onDelete,
}: Props) {
  const percent = Math.round((occupied / units) * 100);



  return (
    
    <div className="bg-[#FFFFFF0D] backdrop-blur-md border border-[#FFFFFF33] rounded-2xl p-6 text-white shadow-lg">
      
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className="text-xs bg-[#00B8DB33] px-3 py-1 rounded-full">
          {code}
        </span>
      </div>

      <p className="text-sm opacity-70 mb-4">{address}</p>

      <div className="flex justify-between text-sm mb-4">
        <div>
          <p className="opacity-70">Total Floors</p>
          <p className="font-semibold text-lg">{floors}</p>
        </div>
        <div>
          <p className="opacity-70">Total Units</p>
          <p className="font-semibold text-lg">{units}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Occupancy</span>
          <span>
            {occupied}/{units} ({percent}%)
          </span>
        </div>

       <div className="w-full bg-gray-700 rounded-full h-2">
  <div
    className="h-2 rounded-full bg-linear-to-r from-[#00C950] to-[#00BC7D]"
    style={{ width: `${percent}%` }}
  />
</div>

      </div>

     <div className="grid grid-cols-3 gap-2">

  <button
    onClick={onViewUnits}
    className="h-14 flex items-center justify-center bg-[#2B7FFF33] rounded-[10px] text-sm cursor-pointer"
  >
    View Units
  </button>

  <button
    onClick={onEdit}
    className="h-14 flex items-center justify-center bg-[#00B8DB33] rounded-[10px] text-sm cursor-pointer"
  >
    Edit
  </button>

  <button
  onClick={onDelete}
    className="h-14 flex items-center justify-center bg-[#FB2C3633] rounded-[10px] text-sm cursor-pointer"
  >
    Delete
  </button>

</div>




    </div>
  );
}
