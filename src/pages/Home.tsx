import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };
    const exists = tasks.find(task => task.title === newTask.title);
    exists ? '' : setTasks(() => [...tasks, newTask])
    return newTask
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done;
        console.log("🚀 ~ task", task);
      }
    })

  }

  function handleRemoveTask(id: number) {
    const foundIndex = tasks.findIndex(task => task.id === id)
    console.log("🚀 ~ tasks", tasks);
    console.log("🚀 ~ foundIndex", foundIndex);
    tasks.splice(foundIndex, 1)

    setTasks(() => [...tasks])
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})