declare module 'stats' {

    type Comparator = (a: any, b: any) => number;
    type GetValue = (item: any) => number;

    export function getMaxIndex(input: any[], comparator: Comparator): number;
    export function getMaxElement(input: any[], comparator: Comparator): any | null;
    export function getMinIndex(input: any[], comparator: Comparator): number;
    export function getMinElement(input: any[], comparator: Comparator): any | null;
    export function getMedianIndex(input: any[], comparator: Comparator): number;
    export function getMedianElement(input: any[], comparator: Comparator): any | null;
    export function getAverageValue(input: any[], getValue: GetValue): number | null;
}
