// import { ITodo } from '../../mirage/fixtures/todos'
import { useSWRConfig } from 'swr'
import { swrKeys } from '../constants/swrKeys'

export const useUpdateTodo = async (todo: ITodo) => {
  const { cache, mutate } = useSWRConfig()
  const todos = cache.get(swrKeys.todos)

  // Optimistic UI update
  const changedIndex = todos.findIndex((t) => t.id === todo.id)

  mutate(
    swrKeys.todos,
    todos.map((oldTodo, index) => (index === changedIndex ? todo : oldTodo)),
    false
  )

  // update the todo
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(todo),
  })

  // rollback in the event of any errors
  if (!response.ok) {
    mutate(swrKeys.todos, todos, true)
    // throw new Error(response.statusText)
  }
}
