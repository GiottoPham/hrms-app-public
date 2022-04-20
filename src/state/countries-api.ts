import type { City, District, Ward } from '@/types/coutries'

import axios from 'axios'
const axiosWithCountries = axios.create({
  baseURL: `https://arcane-taiga-55468.herokuapp.com/https://provinces.open-api.vn/api`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

export const fetchCities = (): Promise<City[]> => {
  return axiosWithCountries
    .request({
      method: 'GET',
      url: `/p`,
    })
    .then((res) =>
      res.data.map((city: { name: string; code: number }) => ({
        province_name: city.name,
        province_id: city.code,
      }))
    )
}
export const fetchDistricts = (): Promise<District[]> => {
  return axiosWithCountries
    .request({
      method: 'GET',
      url: `/d`,
    })
    .then((res) =>
      res.data.map((dist: { name: string; code: number; province_code: number }) => ({
        district_name: dist.name,
        district_id: dist.code,
        province_code: dist.province_code,
      }))
    )
}
export const fetchWards = (): Promise<Ward[]> => {
  return axiosWithCountries
    .request({
      method: 'GET',
      url: `w`,
    })
    .then((res) =>
      res.data.map((ward: { name: string; code: number; district_code: number }) => ({
        district_code: ward.district_code,
        ward_name: ward.name,
        ward_id: ward.code,
      }))
    )
}
