import CryptoJS  from 'crypto-js'

export const cifrar = (texto) => {
 const cifrado = CryptoJS.AES.encrypt(texto, "@@Facil12345PueApp").toString()
 return cifrado

} 

export const descifrar = (texto) => {
    const bytes = CryptoJS.AES.decrypt(texto, "@@Facil12345PueApp")
    const legible = bytes.toString(CryptoJS.enc.Utf8)
    return legible
}