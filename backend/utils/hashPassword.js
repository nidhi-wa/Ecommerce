import { genSaltSync, hashSync } from "bcryptjs"
const salt = genSaltSync(10)

const hashPassword = password => hashSync(password, salt)
export default { hashPassword }