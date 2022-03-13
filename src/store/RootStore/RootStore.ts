import ApiStore from "store/RootStore/ApiStore";

export default class RootStore {
  private readonly _apiStore: ApiStore = new ApiStore("https://api.github.com");
  get apiStore() {
    return this._apiStore;
  }
}
