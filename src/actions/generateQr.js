"use server"
import QRCode from 'qrcode';


export const GenerateQr = async (text) => {
  try {
    const url = await QRCode.toDataURL(text);
    return url;
  } catch (err) {
    console.error(err);
  }
}