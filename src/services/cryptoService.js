const CryptoJS = require('crypto-js')

const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || 'your-secret-key'

const encryptUrl = (url) => {
  if (!url) return ''
  return CryptoJS.AES.encrypt(url, SECRET_KEY).toString()
}

const decryptUrl = (encryptedUrl) => {
  if (!encryptedUrl) return ''
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedUrl, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    // Si no se puede descifrar, devolver la URL original
    return encryptedUrl
  }
}

module.exports = {
  encryptUrl,
  decryptUrl
}
