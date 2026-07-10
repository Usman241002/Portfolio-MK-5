import bcrypt from "bcrypt";

const password = "pakistan910";

const hash = await bcrypt.hash(password, 12);

console.log(hash);
