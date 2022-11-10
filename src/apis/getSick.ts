import axios from 'axios';

export interface Sick {
  sickCd: string;
  sickNm: string;
}

export function getSick(serchKeyword: string, setsickList: any) {
  axios
    .get(`http://localhost:4000/sick?q=${serchKeyword}`)
    .then(res => {
      console.info('calling api');
      setsickList(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}
