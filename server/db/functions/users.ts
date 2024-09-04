import db from '../connection.ts'
import { Users } from '../../../models/tools.ts'

export function addUser(user: Users) {
  return db('users').insert(user).onConflict('id').ignore()
}
