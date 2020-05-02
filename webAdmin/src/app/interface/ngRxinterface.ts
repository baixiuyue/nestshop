
export interface userInfo {
  _id?:number,
  username?:string,
  password?:string,
  token?:string,
}
export interface adminState {
  userInfo:userInfo
}
export interface AppState {
  adminState: adminState
}