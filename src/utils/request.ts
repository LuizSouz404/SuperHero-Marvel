import { api } from "../service/api";
import crypto from 'crypto-js';
    
export  const RequestHeroes = async (id: number) => {
    const timestamp = Date.now();
    const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
    const Hash = crypto.MD5(formatHash)
    const response = await api.get(`characters/${id}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    response.data.data.results[0].thumbnail = `${response.data.data.results[0].thumbnail.path}.jpg`
    return response.data.data.results[0];
  }