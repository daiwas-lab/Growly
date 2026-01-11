/**
 * すべてのモデルの基底となるクラス
 * React Stateで使いやすいように、イミュータブルな操作をサポートします。
 */
export abstract class BaseModel {
  /**
   * インスタンスを複製します。
   * プロトタイプを継承しつつ、新しいオブジェクトとして全プロパティをコピーします。
   */
  clone(): this {
    const clone = Object.create(Object.getPrototypeOf(this));
    return Object.assign(clone, this);
  }

  /**
   * 指定したプロパティを上書きした新しいインスタンスを返します。
   * Reactの State 更新（setTasksなど）で非常に便利に使えます。
   * 
   * @example
   * const updatedTask = task.with({ status: 'done' });
   */
  with(attributes: Partial<this>): this {
    const cloned = this.clone();
    Object.assign(cloned, attributes);
    return cloned;
  }
}
