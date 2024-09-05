//Tool Api:
//This should request access to all the tools listed on profiles, stored in the database table "tools"
//rootUrl will be something like '/api/v1/tools'?
//import models/interfaces for tools, users etc

import request from 'superagent'
import { Tools, Users } from '../../models/tools'

const rootUrl = '/api/v1/'

export function getTools(): Promise<Tools[]> {
  return request.get(rootUrl + '/tools').then((res) => {
    return res.body.tools
  })
}

// TODO: add addTool function
// export function addTool(tool: NewTool): Promise<Tool> {
//   // Use request.post() to send a POST request to rootUrl
//   // Return the newly created tool from the response
// }

// TODO: add editTool function
// export function editTool(id: number, updates: Partial<Tool>): Promise<Tool> {
//   // Use request.patch() or request.put() to send a PATCH/PUT request to `${rootUrl}/${id}`
//   // Return the updated tool from the response
// }

// TODO: add deleteTool function
// export function deleteTool(id: number): Promise<void> {
//   // Use request.delete() to send a DELETE request to `${rootUrl}/${id}`
//   // Return success message "tool deleted"
// }

export async function checkUserExists(auth_id: string, token: string) {
  const response = await fetch(`/api/users/${auth_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok ? await response.json() : null;
}


export async function addUser(user: Users, token: string) {
  try {
    const response = await request
    .post('/api/v1/').send(user)
    .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error adding user:', error)
    throw error
  }
}


