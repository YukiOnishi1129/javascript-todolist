/**
 * App.js
 */
/* models */
import { TodoListModel } from './model/TodoListModel.js';
import { TodoItemModel } from './model/TodoItemModel.js';
/* views */
import { TodoListView } from './view/TodoListView.js';
import { render } from './utils/html-util.js';

export class App {
  constructor() {
    // 初期化
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  /**
   * Todoを検索した時に呼ばれるリスナー関数
   * @param {string} title
   */
  handleSearch(title) {
    this.todoListModel.searchTodo({ title });
  }

  // 初期マウント
  mount() {
    // id=js-formのformタグのDOM要素取得
    const formElement = document.querySelector('#js-form');
    const searchFormElement = document.querySelector('#js-search-form');
    // inputタグのDOM要素を取得
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');
    // 検索フォームのDOM要素を取得
    const searchInputElement = document.querySelector('#js-search-input');

    // 初期リスナーに保存
    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();
      const todoListElement = this.todoListView.createElement(todoItems, {
        // Appに定義したリスナー関数を呼び出す
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        },
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    this.todoListModel.onSearch(() => {
      const searchedTodoItems = this.todoListModel.getSearchedTodoItems();
      const todoItem =
        searchInputElement.value !== '' ? searchedTodoItems : this.todoListModel.getTodoItems();
      const todoItemCount =
        searchInputElement.value !== ''
          ? this.todoListModel.getSearchedTotalCount()
          : this.todoListModel.getTotalCount();

      const todoListElement = this.todoListView.createElement(todoItem, {
        // Appに定義したリスナー関数を呼び出す
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        },
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
    });

    // Todo追加時の処理
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = '';
    });

    // 検索フォーム入力時の処理
    searchInputElement.addEventListener('input', (event) => {
      this.handleSearch(searchInputElement.value);
    });
  }
}
