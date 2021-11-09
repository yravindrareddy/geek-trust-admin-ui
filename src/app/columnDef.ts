export class columnDef {
    title: string;
    column: string;
    renderType: RenderType
}

export enum RenderType {
    text,
    select,
    actions
}