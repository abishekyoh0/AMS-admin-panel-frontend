import type {
  Block,
  Period,
} from "../../pages/EntryReports/ResidentEntryReports";
import { FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";

interface Props {
  block: Block;
  setBlock: (b: Block) => void;
  period: Period;
  setPeriod: (p: Period) => void;
  search: string;
  setSearch: (s: string) => void;
}

const FilterSection: React.FC<Props> = ({
  block,
  setBlock,
  period,
  setPeriod,
  search,
  setSearch,
}) => {
  return (
    <div className="bg-[#FFFFFF0D] border border-[#3a3450] rounded-2xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

        {/* 🔍 Search Section */}
        <div className="w-full lg:w-[35%]">
          <p
            style={{ ...FONTWEIGHT[500] }}
            className={`${FONTSIZE[12]} text-[#99A1AF] mb-2`}
          >
            Search Resident
          </p>

          <input
            type="text"
            placeholder="Search by name or flat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...FONTWEIGHT[400] }}
            className={`${FONTSIZE[14]} w-full bg-[#FFFFFF1A] border border-[#FFFFFF33] rounded-xl px-4 py-2 text-gray-200 placeholder-[#6A7282] focus:outline-none focus:border-cyan-500 transition`}
          />
        </div>

        {/* 🏢 Block Filter */}
        <div className="w-full lg:w-[36%]">
          <p
            style={{ ...FONTWEIGHT[500] }}
            className={`${FONTSIZE[12]} text-[#99A1AF] mb-2`}
          >
            Filter by Block
          </p>

          <div className="flex gap-2 flex-wrap">
            {(["All", "Block A", "Block B", "Block C"] as Block[]).map(
              (b) => (
                <button
                  key={b}
                  onClick={() => setBlock(b)}
                  style={{ ...FONTWEIGHT[500] }}
                  className={`${FONTSIZE[14]} px-8 py-2 rounded-xl transition cursor-pointer ${
                    block === b
                      ? "bg-[#00B8DB] text-white shadow-lg"
                      : "bg-[#FFFFFF0D] text-[#99A1AF] hover:bg-[#FFFFFF1A]"
                  }`}
                >
                  {b}
                </button>
              )
            )}
          </div>
        </div>

        {/* 📅 Period Filter */}
        <div className="w-full lg:w-[28%]">
          <p
            style={{ ...FONTWEIGHT[500] }}
            className={`${FONTSIZE[12]} text-[#99A1AF] mb-2`}
          >
            Filter by Period
          </p>

          <div className="flex gap-2 flex-wrap">
            {(["Today", "Week", "Month"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{ ...FONTWEIGHT[500] }}
                className={`${FONTSIZE[14]} px-7 py-2 rounded-xl transition cursor-pointer ${
                  period === p
                    ? "bg-[#00B8DB] text-white shadow-lg"
                    : "bg-[#FFFFFF0D] text-[#99A1AF] hover:bg-[#FFFFFF1A]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterSection;
