import axios from "axios";
import { constants } from '../Utils/constants';

export const getBlogsData = (pageNum) => {
    return axios.get(`${constants.API_BASE_URL}search_by_date?tags=story&page=${pageNum}`)
}
