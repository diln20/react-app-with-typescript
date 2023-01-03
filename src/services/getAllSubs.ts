import axios from 'axios';
import { Sub ,SubsRenponseFromApi} from '../types';

export const getAllSubs = () => {
const fecthSubs = (): Promise<SubsRenponseFromApi>=>{
      return axios.get("http://localhost:3021/subs").then(res => res.data)
    }

const mapFromApiToSubs = (apiResponse: SubsRenponseFromApi): 
      Array<Sub> => {
      return apiResponse.map((subFromApi) => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description,
        } = subFromApi;
        return {
          nick,
          subMonths,
          avatar,
          description,
        };
      });
    }

    return fecthSubs().then(mapFromApiToSubs);
}

