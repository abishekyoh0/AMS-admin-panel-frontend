import { useMemo, useState } from "react";
import InvoiceTable from "../../components/Invoices/InvoiceTable";
import CreateInvoiceModal from "../../components/Invoices/CreateInvoiceModal";
import InvoiceDetailsModal from "../../components/Invoices/InvoiceDetailsModal";
import invoice from "../../assets/invoice/invoice.png";
import graph from "../../assets/invoice/graph.png";
import { Search } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FONTSIZE as $styles, FONTWEIGHT } from "../../constent/uiconstent";

export type Status = "PAID" | "PENDING" | "OVERDUE" | "CANCELLED";

export interface Invoice {
  id: string;
  resident: string;
  unit: string;
  type: string;
  amount: number;
  dueDate: string;
  status: Status;
  issueDate: string;
  paidDate?: string;
}

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-1001",
      resident: "Sarah Johnson",
      unit: "A-304",
      type: "Monthly Rent",
      amount: 1200,
      issueDate: "2026-01-01",
      dueDate: "2026-02-01",
      paidDate: "2026-01-20",
      status: "PAID",
    },
    {
      id: "INV-1002",
      resident: "Mike Wilson",
      unit: "B-205",
      type: "Monthly Rent",
      amount: 1500,
      issueDate: "2026-02-01",
      dueDate: "2026-03-01",
      status: "PENDING",
    },
    {
      id: "INV-1003",
      resident: "Emily Davis",
      unit: "C-108",
      type: "Maintenance Fee",
      amount: 150,
      issueDate: "2026-01-01",
      dueDate: "2026-01-25",
      status: "OVERDUE",
    },
    {
      id: "INV-1004",
      resident: "Emily Davis",
      unit: "C-108",
      type: "Maintenance Fee",
      amount: 150,
      issueDate: "2026-01-01",
      dueDate: "2026-01-25",
      status: "CANCELLED",
    },
  ]);

  const [activeTab, setActiveTab] = useState<Status | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchStatus = activeTab === "ALL" || invoice.status === activeTab;

      const matchSearch =
        invoice.resident.toLowerCase().includes(search.toLowerCase()) ||
        invoice.id.toLowerCase().includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [invoices, activeTab, search]);

  const statusCount = {
    ALL: invoices.length,
    PAID: invoices.filter((i) => i.status === "PAID").length,
    PENDING: invoices.filter((i) => i.status === "PENDING").length,
    OVERDUE: invoices.filter((i) => i.status === "OVERDUE").length,
    CANCELLED: invoices.filter((i) => i.status === "CANCELLED").length,
  };

  const totalRevenue = invoices
    .filter((i) => i.status === "PAID")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPending = invoices
    .filter((i) => i.status === "PENDING")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalOverdue = invoices
    .filter((i) => i.status === "OVERDUE")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalInvoices = invoices.length;

  return (
    <div className="text-white ">
      <div className="mb-7">
        <h1
          style={{ ...FONTWEIGHT[700] }}
          className={`flex items-center gap-2 text-[#FFFFFF] ${$styles[34]}`}
        >
          Invoice Management
        </h1>

        <p
          style={{ ...FONTWEIGHT[400] }}
          className={`text-[#99A1AF] mt-1 ${$styles[16]}`}
        >
          Manage billing and track payments
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Total Revenue"
          value={`$${totalRevenue}`}
          color="green"
        />

        <SummaryCard
          title="Pending"
          value={`$${totalPending}`}
          color="yellow"
        />

        <SummaryCard title="Overdue" value={`$${totalOverdue}`} color="red" />

        <SummaryCard
          title="Total Invoices"
          value={totalInvoices.toString()}
          color="purple"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full">
        {/* Buttons Wrapper */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Create Invoice */}
          <button
            onClick={() => setShowCreate(true)}
            style={{ ...FONTWEIGHT[700] }}
            className={`w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#00C950] to-[#009966] hover:bg-green-700 rounded-full flex justify-center items-center gap-3 cursor-pointer text-[#0A0A0A] ${$styles[16]}`}
          >
            <img
              src={invoice}
              alt="create"
              className="w-5 h-5 object-contain"
            />
            Create Invoice
          </button>

          {/* Export Report */}
          <button
            onClick={() => {
              toast.success("Report exported successfully!");
            }}
            style={{ ...FONTWEIGHT[700] }}
            className={`w-full sm:w-auto px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-full flex justify-center items-center gap-3 cursor-pointer ${$styles[16]}`}
          >
            <img src={graph} alt="export" className="w-5 h-5 object-contain" />
            Export Report
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full lg:flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...FONTWEIGHT[400] }}
            className={`w-full pl-12 pr-5 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500 text-white ${$styles[16]}`}
          />
        </div>
      </div>

      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {["ALL", "PAID", "PENDING", "OVERDUE", "CANCELLED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{ ...FONTWEIGHT[400] }}
              className={`px-6 py-2 whitespace-nowrap rounded-full border transition cursor-pointer ${$styles[14]} ${
                activeTab === tab
                  ? "bg-[#00B8DB] border-blue-600 text-white"
                  : "bg-[#FFFFFF0D] border-white/20 text-[#99A1AF] hover:bg-white/20"
              }`}
            >
              {tab} ({statusCount[tab as keyof typeof statusCount]})
            </button>
          ))}
        </div>
      </div>

      <InvoiceTable
        invoices={filteredInvoices}
        setInvoices={setInvoices}
        onView={setSelectedInvoice}
      />

      {showCreate && (
        <CreateInvoiceModal
          setInvoices={setInvoices}
          onClose={() => setShowCreate(false)}
        />
      )}

      {selectedInvoice && (
        <InvoiceDetailsModal
          invoice={selectedInvoice}
          setInvoices={setInvoices}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default Invoices;

const SummaryCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => {
  const colorMap: any = {
    green: "bg-[#00C95033] border-[#05DF724D] text-[#FFFFFF]",
    yellow: "bg-[#F0B10033] border-[#FDC7004D] text-[#FFFFFF]",
    red: "bg-[#FB2C3633] border-[#FF64674D] text-[#FFFFFF]",
    purple: "bg-[#AD46FF33] border-[#C27AFF4D] text-[#FFFFFF]",
  };

  return (
    <div className={`p-4 rounded-xl border ${colorMap[color]}`}>
      <p style={{ ...FONTWEIGHT[700] }} className={`${$styles[24]} mt-2`}>
        {value}
      </p>

      <p
        style={{ ...FONTWEIGHT[400] }}
        className={`text-[#D1D5DC] ${$styles[14]}`}
      >
        {title}
      </p>
    </div>
  );
};
