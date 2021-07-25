/**
 * TodoListModel
 * @package model
 */
/* models */
import { EventEmitterModel } from './EventEmitterModel.js';
/* utils */
import { searchResult } from '../utils/common.js';

/**
 * TodoListModel
 */
export class TodoListModel extends EventEmitterModel {
  constructor(items = [], searchedItems = []) {
    super();
    this.items = items;
    this.searchedItems = searchedItems;
  }

  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns
   */
  getTodoItems() {
    return this.items;
  }
  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getSearchedTotalCount() {
    return this.searchedItems.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns
   */
  getSearchedTodoItems() {
    return this.searchedItems;
  }

  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener('change', listener);
  }

  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange() {
    this.emit('change');
  }

  /**
   * 検索された時に呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
  onSearch(listener) {
    this.addEventListener('search', listener);
  }

  /**
   * 検索された時に呼ぶ。
   */
  emitSearch() {
    this.emit('search');
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{ id:number, completed: boolean }}
   * @returns
   */
  updateTodo({ id, completed }) {
    const todoItem = this.items.find((todo) => todo.id === id);
    if (!todoItem) return;

    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを削除する
   * @param {{ id: number }}
   */
  deleteTodo({ id }) {
    // `id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除する
    this.items = this.items.filter((todo) => {
      return todo.id !== id;
    });
    this.emitChange();
  }

  /**
   * 検索に一致する
   * @param { title: string }
   */
  searchTodo({ title }) {
    // 正規表現を用いて、部分一致したTodoのみ表示
    this.searchedItems = this.items.filter((todo) => {
      return searchResult(title, todo.title);
    });

    this.emitSearch();
  }
}
