import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useDispactch } from "./context/context";
export default function SingleTodo({
  todo,
  handleDeletClick,
  handleUpdetClick,
  showTostAlert,
}) {
  const dispatch = useDispactch();
  // handleCheckedClick
  function handleCheckedClick() {
    dispatch({ type: "check", payload: todo });
    if (!todo.check) {
      showTostAlert("تهانينا قد انجزت مهمة ");
    } else {
      showTostAlert("أصبحت المهمة غير منجزة ");
    }
  }
  return (
    <>
      <div className="bg-blue-500 p-2 flex items-center gap-x-3 ">
        {/* start Buttons Actions */}
        <span className=" flex gap-x-3">
          {/* stat delet button */}
          <Button
            onClick={() => {
              handleDeletClick(todo);
            }}
            className="text-xl text-white  px-2 py-4"
            color="red"
            style={{ borderRadius: `50%` }}
          >
            <MdDelete />
          </Button>
          {/* end delet button */}
          {/* start edit button */}
          <Button
            onClick={() => {
              handleUpdetClick(todo);
            }}
            className="text-xl px-2 py-4"
            style={{ borderRadius: `50%` }}
          >
            <FaEdit />
          </Button>
          {/* end edit button */}
          {/* start check button */}
          <Button
            onClick={() => {
              handleCheckedClick();
            }}
            className={
              !todo.check
                ? "text-xl px-2 py-5 bg-white  border-2 border-green-500 text-green-500"
                : "text-xl px-2 py-5 bg-green-500  border-2 borderwhite text-white"
            }
            color=""
            style={{ borderRadius: `50%`, boxShadow: `none` }}
          >
            <FaCheck />
          </Button>
          {/* end check button */}
        </span>
        {/* end Buttons Actions */}
        {/* show data*/}
        <span className="  wrap-anywhere">
          <p
            className={
              !todo.check
                ? "text-white   font-medium "
                : "text-white   font-medium line-through"
            }
          >
            {todo.title}
          </p>
          <p className=" font-medium">{todo.description}</p>
        </span>
      </div>
    </>
  );
}
