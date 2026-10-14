import { Card, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import { Button, ButtonGroup } from "flowbite-react";
import { useState, useEffect, useMemo } from "react";
import SingleTodo from "./singleTodo";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useTodos, useDispactch } from "./context/context";
import Toasts from "./toasts";
export default function TodosBox() {
  // useReducer
  const todos = useTodos();
  const dispatch = useDispactch();
  // filde Title state
  const [fildeTitle, setFildeTitle] = useState("");
  const [toggleTodoId, setToggleTodoId] = useState("");
  const [updateFildes, setUpdeteFilde] = useState({
    title: "",
    description: "",
  });
  const [openDeletModal, setOpenDeletModal] = useState(false);
  const [openUpdatModal, setOpenUpdatModal] = useState(false);
  const [displayTodo, setDisplayTodo] = useState("all");
  // const [showTostAleart, setSowTostAleart] = useState("");

  // showTost State
  const [showTost, setShowTost] = useState("");

  function showTostAlert(message) {
    setShowTost(message);
    setTimeout(() => {
      setShowTost("");
    }, 3000);
  }
  // useEffect
  useEffect(() => {
    dispatch({ type: "geting" });
  }, []);
  // useMemo
  //   Start CompletedTodos with UseMemo
  const CompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.check;
    });
  }, [todos]);

  //   Start NotCompletedTodos with UseMemo
  const NotCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.check;
    });
  }, [todos]);
  //   Check todos status;
  let typeTodos;
  if (displayTodo === "all") {
    typeTodos = todos;
  } else if (displayTodo === "completed") {
    typeTodos = CompletedTodos;
  } else {
    typeTodos = NotCompletedTodos;
  }

  //   ^Start Changeing Display Toogel Buttons Grop
  //   handleAllBtnClicked
  function handleAllBtnClicked() {
    setDisplayTodo("all");
  }
  //   handleCompletedBtnClicked
  function handleCompletedBtnClicked() {
    setDisplayTodo("completed");
  }
  //   handleNotCompletedBtnClicked
  function handleNotCompletedBtnClicked() {
    setDisplayTodo("NotCompleted");
  }
  //   ^End Changeing Display Toogel Buttons Grop

  // handleDeletClick
  const handleDeletClick = (todo) => {
    setToggleTodoId(todo);
    setOpenDeletModal(true);
  };
  //   handleDeletConferm
  function handleDeletConferm() {
    dispatch({ type: "delet", payload: { toggleTodoId: toggleTodoId.id } });
    setOpenDeletModal(false);
    showTostAlert("تم الحذف بنجاح");
  }

  //   handleUpdetClick
  const handleUpdetClick = (todo) => {
    setToggleTodoId(todo);
    setUpdeteFilde({
      ...updateFildes,
      title: todo.title,
      description: todo.description,
    });

    setOpenUpdatModal(true);
  };
  //   handleUpdetConferm
  function handleUpdetConferm() {
    dispatch({
      type: "updat",
      payload: { toggleTodoId: toggleTodoId, updateFildes: updateFildes },
    });
    setOpenUpdatModal(false);
    showTostAlert("تمت التعديل بنجاح ");
  }
  //    handleAddClick
  function handleAddClick() {
    dispatch({ type: "add", payload: fildeTitle });
    setFildeTitle("");
    showTostAlert("تمت الاضافة بنجاح");
  }
  //  return  SingleTodo for Sho Data
  let todoJsx = typeTodos.map((t) => {
    return (
      <SingleTodo
        key={t.id}
        todo={t}
        handleDeletClick={handleDeletClick}
        handleUpdetClick={handleUpdetClick}
        showTostAlert={showTostAlert}
      />
    );
  });
  return (
    <>
      {/* Show Todos && card */}
      <Card className="max-w-sm overflow-y-auto " style={{ maxHeight: `80vh` }}>
        {/* crud title */}
        <div>
          <h1 className="underline underline-offset-4">مهامي</h1>
        </div>
        {/*Start  ButtonGroup*/}
        <div>
          <ButtonGroup>
            <Button color="cyan" onClick={handleNotCompletedBtnClicked}>
              غير المنجز
            </Button>
            <Button color="cyan" onClick={handleCompletedBtnClicked}>
              المنجز
            </Button>
            <Button color="cyan" onClick={handleAllBtnClicked}>
              الكل
            </Button>
          </ButtonGroup>
        </div>
        {/* End ButtonGroup */}

        {todoJsx}
        {/*STARt ADDED TODO SECTION */}
        <div className="flex gap-x-5 ">
          {/* Add BTN */}
          <Button
            disabled={!fildeTitle.length}
            onClick={handleAddClick}
            color="green"
            className="mt-1"
          >
            Add
          </Button>
          {/* Title filde */}
          <FloatingLabel
            value={fildeTitle}
            onChange={(e) => {
              setFildeTitle(e.target.value);
            }}
            variant="filled"
            label="Add title"
          />
        </div>
        {/*END ADDED TODO SECTION */}
      </Card>
      {/* Show modals*/}
      <div>
        {/* start DeletModal */}
        <Modal show={openDeletModal} size="md" popup>
          <ModalHeader />
          <ModalBody>
            <div className="text-center ">
              <HiOutlineExclamationCircle
                color="red"
                className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
              />
              <h2 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                هل تريد حذف المهمة
              </h2>
              <h5 className="my-4"> سيتم حذف بيانات المهمة نهائياَ</h5>
              <div className="flex justify-center gap-4">
                {/* conferm Deleted Button*/}
                <Button color="red" onClick={handleDeletConferm}>
                  نعم قم بالحذف
                </Button>
                {/* cancel deleted Button */}
                <Button
                  color="alternative"
                  onClick={() => setOpenDeletModal(false)}
                >
                  الغاء
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* end start DeletModal*/}
        {/* start Update Model  */}
        <Modal show={openUpdatModal} size="md" popup>
          <ModalHeader />
          <ModalBody>
            <div className="text-center ">
              <div className="flex flex-col gap-y-2 m-8">
                <FloatingLabel
                  value={updateFildes.title}
                  onChange={(e) => {
                    setUpdeteFilde({ ...updateFildes, title: e.target.value });
                  }}
                  variant="filled"
                  label="Edit title now"
                />
                <FloatingLabel
                  value={updateFildes.description}
                  onChange={(e) => {
                    setUpdeteFilde({
                      ...updateFildes,
                      description: e.target.value,
                    });
                  }}
                  variant="filled"
                  label="Edit description now"
                />
              </div>
              <div className="flex justify-center gap-4">
                {/* conferm Deleted Button*/}
                <Button color="green" onClick={handleUpdetConferm}>
                  {" "}
                  حفظ{" "}
                </Button>
                {/* cancel deleted Button */}
                <Button
                  color="alternative"
                  onClick={() => {
                    setOpenUpdatModal(false);
                  }}
                >
                  الغاء
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* end Update Model  */}
      </div>
      {/* Toasts */}
      {showTost !== "" && (
        <div className="w-full">
          <Toasts message={showTost} />
        </div>
      )}
    </>
  );
}
