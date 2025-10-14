import { useDispatch, useSelector } from "react-redux";
import { updateLeave, deleteLeave } from "./leavesSlice";

export default function LeaveItem({ leave }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const canEdit =
    (user.role === "employee") & (leave.employeeName === user.name) &&
    leave.status === "Pending";
  const canAdmin = user.role === "admin";

  return (
    <tr>
      <td>{leave.employeeName}</td>
      <td>{leave.fromDate}</td>
      <td>{leave.toDate}</td>
      <td>{leave.reason}</td>
      <td>{leave.status}</td>
      <td>
        {canEdit && (
          <button onClick={() => dispatch(deleteLeave(leave.id))}>
            Cancel
          </button>
        )}
        {canAdmin && leave.status === "Pending" && (
          <>
            <button
              onClick={() =>
                dispatch(
                  updateLeave({ id: leave.id, data: { status: "Approved" } })
                )
              }
            >
              Approve
            </button>
            <button
              onClick={() =>
                dispatch(
                  updateLeave({ id: leave.id, data: { status: "Rejected" } })
                )
              }
            >
              Reject
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
