export interface BloodNumberDataUnit {
  id: number;
  name: string;
  number: number;
}
export interface BloodNumberData {
  numberData: BloodNumberDataUnit[];
}
export interface MoreData {
  title: string;
  marquee: string[];
  info: string;
}
