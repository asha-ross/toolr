import db from '../connection.ts'
import { Users } from '../../../models/tools.ts'

export function addUser(user: Users) {
  return db('users').insert(user).onConflict('auth_id').ignore()
}

export function getUsers() {
  return db('users').select('*')
}

export function getUserById(id:number) {
  return db('users').select('*').where({id}).first()
}


export function getUserByAuthId(auth_id: string) {
  return db('users').select('*').where('auth_id', auth_id).first()
}
