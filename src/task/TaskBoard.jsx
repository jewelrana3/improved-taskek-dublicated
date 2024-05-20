import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import TaskAction from "./TaskAction";
import SerachItem from "./SerachItem";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  // on close btn add modal
  function handleClose() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  // all handle delete
  function handleDeleteAll() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  // favoriate button
  function handleFavoriate(taskId) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else {
          return task;
        }
      })
    );
  }

  function handleSave(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }
    handleClose();
  }

  function handleDelete(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }
  function handleSearch(search) {
    setTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  return (
    <>
      {showAddModal && (
        <AddTask
          onClose={handleClose}
          onSave={handleSave}
          taskToUpdate={taskToUpdate}
        />
      )}
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="p-2 flex justify-end">
            <form>
              <div className="flex">
                <SerachItem onSearch={handleSearch} />
              </div>
            </form>
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onAddClick={() => setShowAddModal(true)}
              onDeleteAllClick={handleDeleteAll}
            />
            <TaskList
              tasks={tasks}
              onFavoriate={handleFavoriate}
              onDelete={handleDelete}
              onEdit={handleEditTask}
            />
          </div>
        </div>
      </section>
    </>
  );
}
