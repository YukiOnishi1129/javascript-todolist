import {TodoListModel} from "../model/TodoListModel.js"
import { TodoItemModel } from "../model/TodoItemModel.js"

// 新しいTodoリストを作成する
const todoListModel = new TodoListModel()
// 現在のTodoアイテム数は0
console.log(todoListModel.getTotalCount())
// Todoリストが変更されたら、呼ばれるイベントリスナーを登録する
todoListModel.onChange(() => {
    console.log('TodoListの状態が変わりました。')
})

// 新しいTodoアイテムを追加する
// => `onChange`で登録したイベントリスナーが呼び出される
todoListModel.addTodo(new TodoItemModel({
    title: '新しいTodoアイテム',
    completed: false
}))

// Todoリストにアイテムが増える
console.log(todoListModel.getTotalCount())