import { action, computed, makeObservable, observable } from "mobx";
import { ILocalStore } from "utils/UseLocalStore";

type PrivateFields = "_value";
export default class InputValueStore implements ILocalStore {
  private _value: string = "";
  get value(): string {
    return this._value;
  }
  constructor() {
    makeObservable<InputValueStore, PrivateFields>(this, {
      _value: observable,
      value: computed,
      setValue: action,
    });
  }
  setValue(newValue: string): void {
    this._value = newValue;
  }
  destroy(): void {
    this._value = "";
  }
}
