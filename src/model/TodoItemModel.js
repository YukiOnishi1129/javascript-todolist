/**
 * TodoItemModel
 */

// ユニークなIDを管理する変数 (App.jsでTodoの初期値として2つ設定しているので、idの初期値は3)
let todoIdx = 3;

/**
 * TodoItemModel
 */
export class TodoItemModel {
  constructor({ title, completed }) {
    // idは自動的に連番となり、それぞれのインスタンスごとに異なるものとする
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }
}
