export interface IPermission {
  id: number;
  name: string;
  type: number;
  permissionPages: IPermissionPage[];
}

export interface IPagedPermission {
  totalItems: number;
  items: IPermission[];
}

export interface IPermissionPage {
  id: number;
  profileId: number;
  name: string;
  funcs: IFunc[];
  hasAcess: boolean;
}

export interface IFunc {
  id: number;
  profilePermissionPagesId: number;
  name: string;
  hasAcess: boolean;
}
