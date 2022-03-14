import ApiStore from "store/RootStore/ApiStore";

const url = "https://api.github.com";
export default class RootStore {
  private readonly _apiStore: ApiStore = new ApiStore(url);
  get apiStore() {
    return this._apiStore;
  }
}
