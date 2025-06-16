// src/components/backend/backend_data.tsx

export interface BloodNumberDataUnit {
  id: number;
  name: string;
  number: number;
}

export interface BloodNumberData {
  numberData: BloodNumberDataUnit[];
}

export interface MoreData {
  id?: string; // 因為 Cloud Function 返回的數據中包含 id，可以加上
  title: string;
  marquee: string[];
  info: string;
  video?: string; // <-- **請務必添加這一行！** 表示 video 字段是可選的字串
}