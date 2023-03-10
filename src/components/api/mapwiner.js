import axios, {isCancel, AxiosError} from 'axios';



export default axios.create({
    baseURL: 'https://elect-her.herokuapp.com/api/v1'
})