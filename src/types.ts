export interface Sick {
  sickCd: string;
  sickNm: string;
}

export interface Cache {
  [index: string]: Sick[];
}
