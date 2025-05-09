import {uuid} from 'uuidv4'

export const generateVerificationToken = ()=> {
    const token = uuid()
    const expiresAt = new Date (new Date().getTime()+ 3600+1000)
    return {token,expiresAt}
}