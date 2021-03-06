import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "store/models/gitHub";
import { IRepoItemStore } from "store/ReposListStore/types";
import rootStore from "store/RootStore";
import { HTTPMethod } from "utils/HTTPMethod";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/UseLocalStore";

type PrivateFields = "_repo" | "_meta";
export default class RepoItemStore implements IRepoItemStore, ILocalStore {
  private _repo: RepoItemModel | null = null;
  private _meta: Meta = Meta.initial;
  private readonly _id: string | undefined;

  constructor(id: string | undefined) {
    this._id = id;
    makeObservable<RepoItemStore, PrivateFields>(this, {
      _meta: observable,
      _repo: observable.ref,
      meta: computed,
      repo: computed,
      getRepo: action,
    });
  }
  get repo(): RepoItemModel | null {
    return this._repo;
  }
  get meta(): Meta {
    return this._meta;
  }
  get id(): string | undefined {
    return this._id;
  }

  async getRepo(): Promise<void> {
    this._meta = Meta.loading;
    this._repo = null;
    try {
      const result = await rootStore.apiStore.request<RepoItemApi>({
        method: HTTPMethod.GET,
        headers: {},
        data: {},
        endpoint: `/repositories/${this._id}`,
      });
      runInAction(() => {
        if (result.success) {
          try {
            this._meta = Meta.success;
            this._repo = normalizeRepoItem(result.data);
            return;
          } catch (e) {
            this._repo = null;
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
    this._repo = null;
  }
}
