import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "./leavesSlice";
import LeaveItem from "./LeaveItem";

export default function LeaveList() {
  const { list } = useSelector((state) => state.leaves);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto bg-white rounded shadow-md">
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
          {list.map((leave) => (
            <LeaveItem key={leave.id} leave={leave} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
