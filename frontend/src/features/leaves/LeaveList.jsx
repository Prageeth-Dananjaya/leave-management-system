import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "./leavesSlice";
import LeaveItem from "./LeaveItem";

export default function LeaveList() {
  const { list, loading } = useSelector((state) => state.leaves);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const filteredLeaves = list.filter((leave) =>
    [leave.employeeName, leave.reason].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Leave Requests</h3>
        <input
          type="text"
          placeholder="Search by name or reason"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 w-[210px] "
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Employee
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                From
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                To
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Reason
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <LeaveItem key={leave.id} leave={leave} />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  {loading ? "Loading..." : "No leaves found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
