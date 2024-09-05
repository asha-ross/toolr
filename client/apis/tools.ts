//Tool Api:
//This should request access to all the tools listed on profiles, stored in the database table "tools"
//rootUrl will be something like '/api/v1/tools'?
//import models/interfaces for tools, users etc

import request from 'superagent'
import { Tools, NewTool, Users } from '../../models/tools'


const rootUrl = '/api/v1/'

export async function getTools(): Promise<Tools[]> {
  return request.get(rootUrl + 'tools').then((res) => {
    return res.body.tools
  })
}

// TODO: add addTool function
// Use request.post() to send a POST request to rootUrl
// Return the newly created tool from the response

export async function addTool(tool: NewTool): Promise<Tools> {
  return request
    .post(rootUrl + 'tools')
    .send(tool)
    .then((res) => {
      return res.body // Assuming the newly created tool is returned in the response body
    })
}

// TODO: add editTool function
// Use request.patch() or request.put() to send a PATCH/PUT request to `${rootUrl}/${id}`
// Return the updated tool from the response

export async function editTool(
  id: number,
  updates: Partial<Tools>,
): Promise<Tools> {
  return request
    .put(`${rootUrl + 'tools'}/${id}`)
    .send(updates)
    .then((res) => {
      return res.body
    })
}

// TODO: add deleteTool function
// // // Use request.delete() to send a DELETE request to `${rootUrl}/${id}`
// // Return success message "tool deleted"
export async function deleteTool(id: number): Promise<void> {
  return request.delete(`${rootUrl}tools/${id}`).then(() => {
    return
  })
}

export async function checkUserExists(auth_id: string, token: string) {
  const response = await fetch(`/api/v1/users/${auth_id}`, {
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


