import { api } from "../service/api";
import crypto from 'crypto-js';
    
export  const RequestHeroes = async () => {
    const timestamp = Date.now();
    const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
    const Hash = crypto.MD5(formatHash)
    const {data: spiderM} = await api.get(`characters/${1016181}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    const {data: spiderG} = await api.get(`characters/${1017603}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    const {data: spiderP} = await api.get(`characters/${1009610}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    const {data: Loki} = await api.get(`characters/${1009407}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    const {data: Thor} = await api.get(`characters/${1009664}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    const {data: Doctor} = await api.get(`characters/${1009282}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    const {data: Wanda} = await api.get(`characters/${1009562}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    const {data: Hulk} = await api.get(`characters/${1009351}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
    const heros = [
      spiderG.data.results[0],
      spiderM.data.results[0],
      spiderP.data.results[0],
      Loki.data.results[0],
      Thor.data.results[0],
      Doctor.data.results[0],
      Wanda.data.results[0],
      Hulk.data.results[0]
    ]
    heros.forEach(hero => hero.thumbnail = `${hero.thumbnail.path}.${hero.thumbnail.extension}`)
    const data = heros; 
    console.log(data)
    return data;
  }