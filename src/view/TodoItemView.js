/**
 * TodoItemView
 * @package views
 */
/* utils */
import { element } from '../utils/html-util.js';

/**
 * TodoItemView
 */
export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li class="todo"><input type="checkbox" class="checkbox" checked>
                                    <p class="todo-task-delete">${todoItem.title}</p>
                                    <button class="delete">x</button>
                                </li>`
      : element`<li class="todo"><input type="checkbox" class="checkbox">
                                    <p class="todo-task">${todoItem.title}</p>
                                    <button class="delete">x</button>
                                </li>`;

    const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
    inputCheckboxElement.addEventListener('change', () => {
      // コールバック関数に変更
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
      });
    });
    const deleteButtonElement = todoItemElement.querySelector('.delete');
    deleteButtonElement.addEventListener('click', () => {
      // コールバック関数に変更
      onDeleteTodo({
        id: todoItem.id,
      });
    });
    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
