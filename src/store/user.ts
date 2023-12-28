import { action, observable, makeObservable } from "mobx";
import { TOKEN_PREFIX } from "../config/const";

export interface UserInfoType {
  avatar: string;
  nickname: string;
  uid: string;
  org: any;
  gender?: any;
  tenantId: string;
  wxAuth: boolean;
  mobile: string | number;
}

const InitInfo: UserInfoType = {
  avatar: "https://acc.wangxiao.cn/image/app/woman0517.png", //默认头像地址
  nickname: "", // 默认状态
  uid: "", // 默认状态
  org: "",
  tenantId: "",
  wxAuth: false,
  mobile: "",
};

export class UserStore {
  /**
   * 用户信息
   */
  @observable
  public userInfo: UserInfoType = InitInfo;

  /**设置用户信息 */
  @action
  public setUserInfo = (userInfo: UserInfoType | any ) => {
    localStorage.setItem(`${TOKEN_PREFIX}-userinfo`, JSON.stringify(userInfo));
    this.userInfo = userInfo;
  };

    /**获取用户信息 */
    @action
    public getUserInfo = () => {
      const userinfo = localStorage.getItem(`${TOKEN_PREFIX}-userinfo`);
      return JSON.parse(userinfo??'{}'); 
    };

  /** token信息 */
  @observable
  public token: string = "";

  /**设置token */
  @action
  public setToken = (token: string) => {
    localStorage.setItem(`${TOKEN_PREFIX}-token`, token);
    this.token = token;
  };
  /**获取token */
  @action
  public getToken = () => {
    return localStorage.getItem(`${TOKEN_PREFIX}-token`);
  };
  constructor() {
    makeObservable(this);
  }
}

export default new UserStore();
