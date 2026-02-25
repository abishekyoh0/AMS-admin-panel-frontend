import { useNavigate } from "react-router-dom";
import car from "../../assets/parking/car.png"
import clock from "../../assets/parking/clock.png"
import map from "../../assets/parking/map.png"


type Props = {
  pending: number;
};

export default function Header({ pending }: Props) {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
    <div className="flex items-start gap-3">
  <div className="p-2 rounded-lg
                  bg-linear-to-r from-[#AD46FF33] to-[#F6339A33]
                  border border-[#C27AFF4D]">
    <img src={car} alt="parking" className="w-6 h-6" />
  </div>

  <div>
    <h1 className="text-2xl font-bold text-white">
      Parking Management
    </h1>
    <p className="text-gray-400 text-sm">
      Manage parking requests and slot assignments
    </p>
  </div>
</div>

     <div className="flex items-center gap-3 flex-wrap">

 <button
 onClick={() => navigate("/parkingslots")}
  className="w-45.25 h-12.75
             bg-[#FFFFFF0D] border border-[#FFFFFF33]
             text-white rounded-[14px]
             font-medium
             flex items-center justify-center gap-2
             cursor-pointer
             hover:bg-white/10 transition"
>
  <img src={map} alt="icon" className="w-5 h-5" />
  Manage Slots
</button>

  <button
  className="w-38.25 h-12.75
            bg-[#FFFFFF0D] border border-[#FFFFFF33]
             text-white rounded-[14px]
             cursor-pointer
             font-medium
             flex items-center justify-center gap-2
             hover:bg-white/10 transition"
>
  <img src={clock} alt="icon" className="w-5 h-5" />
  Audit Log
</button>

  <div
    className="w-41 h-16
               rounded-[14px]
               border-[1.75px] border-[#C27AFF4D]
               bg-linear-to-r from-[#AD46FF1A] to-[#F6339A1A]
               flex flex-col items-center justify-center text-center"
  >
    <div className="text-2xl font-bold text-white leading-none">
      {pending}
    </div>

    <div className="text-xs text-[#C27AFF] mt-1">
      Pending
    </div>
  </div>

</div>
    </div>
  );
}