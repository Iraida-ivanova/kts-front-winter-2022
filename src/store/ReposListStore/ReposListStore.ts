import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import InputValueStore from "store/InputValueStore";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";
import rootStore from "store/RootStore";
import { HTTPMethod } from "utils/HTTPMethod";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/UseLocalStore";

import { IReposListStore } from "./types";

type PrivateFields = "_list" | "_meta";

export default class ReposListStore implements IReposListStore, ILocalStore {
  private _list: CollectionModel<number, RepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _input: InputValueStore = new InputValueStore();
  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _meta: observable,
      _list: observable.ref,
      meta: computed,
      list: computed,
      getOrganizationReposList: action,
    });
  }
  get list(): RepoItemModel[] {
    return linearizeCollection(this._list);
  }
  get meta(): Meta {
    return this._meta;
  }
  get input(): InputValueStore {
    return this._input;
  }

  async getOrganizationReposList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    try {
      const result = await rootStore.apiStore.request<RepoItemApi[]>({
        method: HTTPMethod.GET,
        headers: {},
        data: {},
        endpoint: `/orgs/${this._input.value}/repos`,
      });
      runInAction(() => {
        if (result.success) {
          try {
            this._meta = Meta.success;
            this._list = normalizeCollection(
              result.data.map(normalizeRepoItem),
              (item) => item.id
            );
            return;
          } catch (e) {
            this._list = getInitialCollectionModel();
            this._meta = Meta.error;
          }
        }
        this._meta = Meta.error;
      });
    } catch (e) {
      this._meta = Meta.error;
    }
  }

  destroy(): void {
    this._meta = Meta.initial;
    this._list = getInitialCollectionModel();
  }
}
