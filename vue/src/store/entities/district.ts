import Entity from './entity'
export default class District extends Entity<number>{
    // totalCount: number;
    // AreaId:number;
    // BuildingId: number;
    // UserList:object;
    // p_Name:string;
    // p_Base1:string;
    // p_Ton1:string
    areaName:string;
    parentId: 0;
    manageUserid: string;
    description: string;
    id: 0;
    expand:boolean;
    selected:boolean;
}