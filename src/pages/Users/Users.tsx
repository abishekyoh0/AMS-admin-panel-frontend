import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";

type Role = "RESIDENT" | "SECURITY" | "MAINTENANCE" | "ACCOUNTS" | "ADMIN";
type Status = "ACTIVE" | "INACTIVE";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  unit?: string;
  phone?: string;
  status: Status;
}
const roleStyles: Record<Role, string> = {
    RESIDENT:
        "bg-blue-500/10 text-blue-400 border border-blue-500/30 curor-pointer",

  SECURITY: "bg-green-500/10 text-green-400 border border-green-500/30",

  MAINTENANCE: "bg-orange-500/10 text-orange-400 border border-orange-500/30",

  ACCOUNTS: "bg-violet-500/10 text-violet-400 border border-violet-500/30",

  ADMIN: "bg-red-500/10 text-red-400 border border-red-500/30",
};

const dummyUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "RESIDENT",
    unit: "A-304",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Mike Wilson",
    email: "mike@example.com",
    role: "MAINTENANCE",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@example.com",
    role: "MAINTENANCE",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "David Chen",
    email: "david@example.com",
    role: "SECURITY",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    role: "ACCOUNTS",
    status: "ACTIVE",
  },
  {
    id: "6",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "RESIDENT",
    unit: "A-102",
    status: "ACTIVE",
  },
  {
    id: "7",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "RESIDENT",
    unit: "B-205",
    status: "ACTIVE",
  },
  {
    id: "8",
    name: "James Miller",
    email: "james@example.com",
    role: "SECURITY",
    status: "INACTIVE",
  },
];
const roles: Role[] = [
  "RESIDENT",
  "SECURITY",
  "MAINTENANCE",
  "ACCOUNTS",
  "ADMIN",
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | "ALL">("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [confirmUser, setConfirmUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "RESIDENT" as Role,
    phone: "",
    unit: "",
    password: "",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = selectedRole === "ALL" || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [users, search, selectedRole]);

  const getRoleCount = (role: Role) =>
    users.filter((u) => u.role === role).length;

  const activeCount = users.filter((u) => u.status === "ACTIVE").length;

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
            }
          : user,
      ),
    );
  };

  const handleCreateUser = () => {
    if (!formData.name || !formData.email) return;

    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      unit: formData.unit,
      status: "ACTIVE",
    };

    setUsers((prev) => [newUser, ...prev]);

    setIsModalOpen(false);
    setEditingUserId(null); 

    setFormData({
      name: "",
      email: "",
      role: "RESIDENT",
      phone: "",
      unit: "",
      password: "", 
    });
  };

  const handleUpdateUser = () => {
    if (!editingUserId) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingUserId
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              phone: formData.phone,
              unit: formData.unit,
            }
          : user,
      ),
    );

    setIsModalOpen(false);
    setEditingUserId(null);
  };

  return (
    <div className="min-h-screen  text-white">
      <div className="mb-6">
        <h1
          style={{ ...FONTWEIGHT[700] }}
          className={` ${FONTSIZE[36]}text-2xl sm:text-3xl font-bold`}
        >
          User Management
        </h1>
        <p
          className={`${FONTSIZE[16]} text-[#99A1AF]`}
          style={{
            ...FONTWEIGHT[400],
          }}
        >
          Manage system users and their roles
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="Residents"
          count={getRoleCount("RESIDENT")}
          color="lightblue"
        />
        <StatCard
          title="Security"
          count={getRoleCount("SECURITY")}
          color="green"
        />
        <StatCard
          title="Maintenance"
          count={getRoleCount("MAINTENANCE")}
          color="brown"
        />
        <StatCard
          title="Accounts"
          count={getRoleCount("ACCOUNTS")}
          color="violet"
        />
        <StatCard title="Active Users" count={activeCount} color="blue" />
      </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">

\                <div className="flex gap-3 shrink-0 ">
                    <button
                        onClick={() => {
                            setEditingUserId(null);
                            setFormData({
                                name: "",
                                email: "",
                                role: "RESIDENT",
                                phone: "",
                                unit: "",
                                password: "",
                            });
                            setIsModalOpen(true);
                        }}
                        className="px-10 py-3 rounded-full 
      bg-linear-to-r from-[#AD46FF] to-[#E60076]
      text-black text-sm transition duration-300 cursor-pointer"
                    >
                        Add New User
                    </button>

                    <button
                        onClick={() => {
                            
                            toast.success("CSV exported successfully!");
                        }}
                        className="px-10 py-3 rounded-full cursor-pointer bg-[#FFFFFF1A] border border-[#FFFFFF33] hover:bg-gray-600 text-black text-sm"
                    >
                        Export to CSV
                    </button>

                </div>

                <div className="flex-1 lg:ml-auto">
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="w-full px-6 py-3 rounded-full bg-[#1e293b] border border-gray-600 
      focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

            </div>

      <div className="flex flex-wrap gap-2 mb-4 cursor-pointer ">
        <FilterTab
          label="All Users"
          active={selectedRole === "ALL"}
          onClick={() => setSelectedRole("ALL")}
        />
        {roles.map((role) => (
          <FilterTab
            key={role}
            label={`${role} (${getRoleCount(role)})`}
            active={selectedRole === role}
            onClick={() => setSelectedRole(role)}
          />
        ))}
      </div>

            <div className="overflow-x-auto bg-[#FFFFFF0D] rounded-xl shadow-lg">
  <table className="min-w-full">

  <thead className="bg-[#FFFFFF0D] border border-[#FFFFFF1A]">
  <tr>
    {["NAME", "EMAIL", "ROLE", "UNIT", "STATUS", "ACTIONS"].map((head, index) => (
      <th
        key={head}
        style={{ ...FONTWEIGHT[500] }}
        className={`${FONTSIZE[12]} px-4 py-3 text-[#99A1AF] ${
          index === 5 ? "text-center pl-8" : "text-left"
        }`}
      >
        {head}
      </th>
    ))}
  </tr>
</thead>


    <tbody>
      {filteredUsers.map((user) => (
        <tr
          key={user.id}
          className="border-b border-[#FFFFFF1A] hover:bg-[#273449]"
        >
          <td
            style={{ ...FONTWEIGHT[500] }}
            className={`${FONTSIZE[14]} px-4 py-3 text-white`}
          >
            {user.name}
          </td>

          <td
            style={{ ...FONTWEIGHT[400] }}
            className={`${FONTSIZE[14]} px-4 py-3 text-[#99A1AF]`}
          >
            {user.email}
          </td>

          <td className="px-4 py-3">
            <span
              style={{ ...FONTWEIGHT[500] }}
              className={`${FONTSIZE[12]} px-3 py-1 rounded-full ${roleStyles[user.role]}`}
            >
              {user.role}
            </span>
          </td>

          <td
            style={{ ...FONTWEIGHT[400] }}
            className={`${FONTSIZE[14]} px-4 py-3 text-white`}
          >
            {user.unit ?? "-"}
          </td>

          <td className="px-4 py-3">
            <span
              style={{ ...FONTWEIGHT[500] }}
              className={`${FONTSIZE[12]} px-3 py-1 rounded-full ${
                user.status === "ACTIVE"
                  ? "bg-[#00C95033] text-[#05DF72]"
                  : "bg-[#FB2C3633] text-[#FF6467]"
              }`}
            >
              {user.status}
            </span>
          </td>

          <td className="px-4 py-3 flex justify-center gap-2 flex-wrap">

            <button
              onClick={() => setViewUser(user)}
              style={{ ...FONTWEIGHT[500] }}
              className={`${FONTSIZE[12]} px-3 py-1 rounded-lg 
                bg-[#2B7FFF33] text-[#51A2FF] 
                hover:bg-blue-700 cursor-pointer`}
            >
              View
            </button>

            <button
              onClick={() => {
                setFormData({
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  phone: user.phone || "",
                  unit: user.unit || "",
                  password: "",
                });
                setEditingUserId(user.id);
                setIsModalOpen(true);
              }}
              style={{ ...FONTWEIGHT[500] }}
              className={`${FONTSIZE[12]} px-3 py-1 rounded-lg 
                bg-[#FFFFFF1A] text-white 
                hover:bg-gray-700 cursor-pointer`}
            >
              Edit
            </button>

            <button
              onClick={() => setConfirmUser(user)}
              style={{ ...FONTWEIGHT[500] }}
              className={`${FONTSIZE[12]} px-3 py-1 rounded-lg transition duration-300 cursor-pointer
                ${
                  user.status === "ACTIVE"
                    ? "bg-[#FF690033] text-[#FF8904] hover:bg-yellow-700/40"
                    : "bg-[#00C95033] text-[#05DF72] hover:bg-[#00C95055]"
                }`}
            >
              {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
            </button>

            <button
              onClick={() => setDeleteUser(user)}
              style={{ ...FONTWEIGHT[500] }}
              className={`${FONTSIZE[12]} px-3 py-1 rounded-lg 
                bg-[#FB2C3633] text-[#FF6467] 
                hover:bg-red-700 cursor-pointer`}
            >
              Delete
            </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>




      {isModalOpen && (
        <Modal
          formData={formData}
          setFormData={setFormData}
          roles={roles}
          isEdit={!!editingUserId}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUserId(null);
          }}
          onSubmit={editingUserId ? handleUpdateUser : handleCreateUser}
        />
      )}

      {viewUser && (
        <ViewUserModal
          user={viewUser}
          onClose={() => setViewUser(null)}
          onToggleStatus={() => {
            toggleStatus(viewUser.id);
            setViewUser(null);
          }}
          onEdit={() => {
            setFormData({
              name: viewUser.name,
              email: viewUser.email,
              role: viewUser.role,
              phone: viewUser.phone || "",
              unit: viewUser.unit || "",
              password: "",
            });
            setEditingUserId(viewUser.id);
            setViewUser(null);
            setIsModalOpen(true);
          }}
        />
      )}

      {confirmUser && (
        <ConfirmStatusModal
          user={confirmUser}
          onCancel={() => setConfirmUser(null)}
          onConfirm={() => {
            toggleStatus(confirmUser.id);
            setConfirmUser(null);
          }}
        />
      )}

      {deleteUser && (
        <DeleteConfirmModal
          user={deleteUser}
          onCancel={() => setDeleteUser(null)}
          onConfirm={() => {
            setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
            setDeleteUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;


interface StatCardProps {
  title: string;
  count: number;
  color: "lightblue" | "green" | "brown" | "violet" | "blue";
}

const colorStyles = {
  lightblue: "bg-[#2B7FFF33] border border-[#51A2FF4D] text-[#FFFFFF]",
  green: "bg-[#00C95033] border border-[#05DF724D] text-[#FFFFFF]",
  brown: "bg-[#FF690033] border border-[#FF89044D] text-[#FFFFFF]",
  violet:
    "bg-[#AD46FF33] backdrop-blur-md border border-[#C27AFF4D] text-[#FFFFFF]",
  blue: "bg-[#00B8DB33] backdrop-blur-md border border-[#00D3F34D] text-[#FFFFFF]",
};

const StatCard = ({ title, count, color }: StatCardProps) => (
    <div
        className={`p-4 rounded-2xl shadow-lg hover:scale-105 transition duration-300 ${colorStyles[color]}`}
    >
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{count}</h2>
    </div>
);

const FilterTab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
    <button
  onClick={onClick}
  style={{ ...FONTWEIGHT[500] }}
  className={`${FONTSIZE[12]} 
    px-4 py-1.5 
    rounded-full 
    transition 
    cursor-pointer 
    ${
      active
        ? "bg-[#00B8DB] text-white"
        : "bg-[#FFFFFF0D] text-[#99A1AF] hover:bg-gray-600"
    }`}
>
  {label}
</button>

);

const Modal = ({
  formData,
  setFormData,
  roles,
  onClose,
  onSubmit,
  isEdit,
}: any) => (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-6">
    <div className="w-full max-h-[95vh] overflow-y-auto">
      <div
        className="w-full max-w-md sm:max-w-xl md:max-w-2xl 
                    mx-auto
                    bg-linear-to-br from-[#0f172a] to-[#1e293b] 
                    border border-[#FFFFFF33]
                    rounded-2xl shadow-xl"
      >
        <div
          className="flex items-center justify-between 
                      px-4 sm:px-6 py-4 
                      border-b border-white/10"
        >
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            {isEdit ? "✏️ Edit User" : "Add New User"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <Input
              label="Email *"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <div>
              <label className="text-sm text-gray-400">Role *</label>
              <select
                className="w-full mt-1 px-3 py-2 rounded-lg 
                         bg-[#1e293b] border border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                {roles.map((role: string) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </div>

            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <Input
              label="Unit (for residents)"
              className="sm:col-span-2"
              value={formData.unit}
              onChange={(e) =>
                setFormData({ ...formData, unit: e.target.value })
              }
            />

            {!isEdit && (
              <Input
                label="Password *"
                type="password"
                className="sm:col-span-2"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            )}
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-3 
                      px-4 sm:px-6 py-4 
                      border-t border-white/10"
        >
          <button
            onClick={onClose}
            className="w-full sm:w-1/2 py-2.5 
                     rounded-full bg-gray-700 
                     hover:bg-gray-600 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="w-full sm:w-1/2 py-2.5 
                     rounded-full 
                     bg-linear-to-r from-[#AD46FF] to-[#E60076] 
                     transition cursor-pointer"
          >
            {isEdit ? "Update User" : "Create User"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ViewUserModal = ({
  user,
  onClose,
  onToggleStatus,
  onEdit,
}: {
  user: User;
  onClose: () => void;
  onToggleStatus: () => void;
  onEdit: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-linear-to-br from-[#0f172a] to-[#1e293b] border border-gray-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-3">
          <h2 className="text-lg font-semibold">User Details</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <Detail label="Full Name" value={user.name} />
          <Detail label="Email" value={user.email} />
          <Detail label="Phone" value={user.phone || "-"} />
          <Detail
            label="Role"
            value={
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${roleStyles[user.role]}`}
              >
                {user.role}
              </span>
            }
          />
          <Detail label="Unit" value={user.unit || "-"} />
          <Detail
            label="Status"
            value={
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "ACTIVE"
                    ? "bg-[#00C95033] text-[#05DF72]"
                    : "bg-[#FB2C3633] text-[#FF6467]"
                }`}
              >
                {user.status}
              </span>
            }
          />
          <Detail label="User ID" value={`#${user.id}`} />
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 mb-3">Quick Actions</p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={onEdit}
              className="flex-1 px-4 py-2 rounded-xl cursor-pointer bg-[#00B8DB33] border border-[#00D3F34D] text-[#00D3F3] text-sm"
            >
              Edit User
            </button>

            <button
              onClick={onToggleStatus}
              className="flex-1 px-4 py-2 cursor-pointer rounded-xl bg-[#FF690033] border border-[#FF89044D] text-[#FF8904]  text-sm"
            >
              Toggle Status
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 cursor-pointer rounded-full text-[#0A0A0A] bg-[#FFFFFF1A] border border-[#FFFFFF33] hover:bg-gray-600 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className={className}>
    <label className="text-sm text-gray-400">{label}</label>
    <input
      {...props}
      className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e293b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);
const Detail = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-gray-400 text-xs">{label}</p>

    <div className="mt-1">{value}</div>
  </div>
);

const ConfirmStatusModal = ({
  user,
  onCancel,
  onConfirm,
}: {
  user: User;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const isActive = user.status === "ACTIVE";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-[#1e293b] border border-gray-700 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Confirm Action</h2>

          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-6">
          Do you want to {isActive ? "deactivate" : "activate"} this account?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-sm cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-sm ${
              isActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            Yes, {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
};
const DeleteConfirmModal = ({
  user,
  onCancel,
  onConfirm,
}: {
  user: User;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-[#1e293b] border border-gray-700 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-lg font-semibold text-red-500">Delete Account</h2>

          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{user.name}</span>'s account?
          <br />
          <span className="text-red-400 text-xs">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-sm cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-sm cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};
