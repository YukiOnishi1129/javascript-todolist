import { TodoItemModel } from "../model/TodoItemModel.js"

const item = {
    title: "未完了のTodoアイテム",
    completed: false
}

const completedItem = new TodoItemModel({
    title: '完了済みのTodoアイテム',
    completed: true
})

// それぞれのidは異なる
console.log(item.id !== completedItem.id)