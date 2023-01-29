import axios from "axios"
import { DiamondClass, MY_SERVER } from "../../env"

// A mock function to mimic making an async request for data
export const getDiamonds =async () => {
  const res = await axios.get(`${MY_SERVER}/read`)
  return res.data
}

export const getSumDiamonds =async () => {
  const res = await axios.get(`${MY_SERVER}/read/sum`)
  return res.data
}

export const getMaxDiamonds =async () => {
  const res = await axios.get(`${MY_SERVER}/read/max`)
  return res.data
}
export const getCutAmounts =async () => {
  const res = await axios.get(`${MY_SERVER}/read/counts`)
  return res.data
}
export const getcolorAmounts =async () => {
  const res = await axios.get(`${MY_SERVER}/read/colors`)
  return res.data
}
export const getPremiumMedianCarat =async () => {
  const res = await axios.get(`${MY_SERVER}/read/premiumMedian`)
  return res.data
}
export const getavgCaratPerCut =async () => {
  const res = await axios.get(`${MY_SERVER}/read/avgPerCut`)
  return res.data
}
export const getavgPricePerColor =async () => {
  const res = await axios.get(`${MY_SERVER}/read/avgPerColor`)
  return res.data
}
export const addDiamond=async (diamond:DiamondClass) => {
  const res = await axios.post(`${MY_SERVER}/add`,{diamond})
  return res.data
}
export const delDiamond=async (id:number) => {
  const res = await axios.delete(`${MY_SERVER}/delete/`+id)
  return res.data
}
export const updDiamond=async (id:number,diamond:DiamondClass) => {
  const res = await axios.put(`${MY_SERVER}/update/`+id,{diamond})
  return res.data
}