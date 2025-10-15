import { useDispatch, useSelector } from "react-redux";
import { updateLeave, deleteLeave } from "./leavesSlice";
import toast from "react-hot-toast";

export default function LeaveItem({ leave }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const canEdit =
    user.role === "employee" &&
    leave.employeeName === user.name &&
    leave.status === "Pending";
  const canAdmin = user.role === "admin";

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{leave.employeeName}</td>
      <td className="px-4 py-2">{leave.fromDate}</td>
      <td className="px-4 py-2">{leave.toDate}</td>
      <td className="px-4 py-2">{leave.reason}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded text-white text-sm ${
            leave.status === "Approved"
              ? "bg-green-500"
              : leave.status === "Rejected"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {leave.status}
        </span>
      </td>
      <td className="px-4 py-2 space-x-2">
        {canEdit && (
          <button
            onClick={async () => {
              try {
                await dispatch(deleteLeave(leave.id)).unwrap();
                toast.success("Leave cancelled");
              } catch {
                toast.error("Failed to cancel");
              }
            }}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
          >
            Cancel
          </button>
        )}
        {canAdmin && leave.status === "Pending" && (
          <>
            <button
              onClick={async () => {
                try {
                  await dispatch(
                    updateLeave({ id: leave.id, data: { status: "Approved" } })
                  ).unwrap();
                  toast.success("Leave approved");
                } catch {
                  toast.error("Failed to approve");
                }
              }}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
            >
              Approve
            </button>
            <button
              onClick={() =>
                dispatch(
                  updateLeave({ id: leave.id, data: { status: "Rejected" } })
                )
              }
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
            >
              Reject
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
