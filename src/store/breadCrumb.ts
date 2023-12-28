import { action, observable, makeObservable } from "mobx";
import { TOKEN_PREFIX } from "../config/const";
export class BreadStore {
  /** 面包屑导航信息 */
  @observable
  public pageData: any = [
    {
      title: "首页",
      href: "/",
    },
  ];

  /**设置面包屑数据 */
  @action
  public setPageData = (data: any) => {
    this.pageData = data;
    localStorage.setItem(`${TOKEN_PREFIX}-pageData`, JSON.stringify(data));
  };
  /**获取面包屑数据 */
  @action
  public getPageData = () => {
    let oriData: any = localStorage.getItem(`${TOKEN_PREFIX}-pageData`);
    if (oriData) {
      oriData = JSON.parse(oriData);
      if (!Array.isArray(oriData)) {
        oriData.split(",");
      }
    }
    return oriData;
    // let result: any = [];
    // if (temp) {
    //   temp = JSON.parse(temp);
    //   temp!=null && result = temp.split(",");
    // }
    // return result;
    // return JSON.parse(localStorage.getItem(`${TOKEN_PREFIX}-pageData`));
    // return localStorage.getItem(`${TOKEN_PREFIX}-token`);
    // return this.pageData;
  };
  constructor() {
    makeObservable(this);
  }
}

export default new BreadStore();
