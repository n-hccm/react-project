const rest_url = "http://localhost:4000/customers";

export async function getAll(){
  try{
    const res = await fetch(rest_url);
    if( res.ok ){
      const data = await res.json();
      return data;
    }else{
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }catch(e){
    console.error("Error getting data:", e);
    return [];
  }
}

export async function get(id) {
  try{
    const res = await fetch(`${rest_url}/${id}`);
    if( res.ok ){
      const data = await res.json();
      return data;
    }else{
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }catch(e){
    console.error("Error getting data:", e);
    return null;
  }
}

export async function deleteById(id) {
  try{
    const res = await fetch(`${rest_url}/${id}`, {
      method: 'DELETE'
    });
    if( res.ok ){
      return true;
    }else{
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }catch(e){
    console.error("Error deleting data:", e);
    return false;º
  }
}

export async function post(item) {
  try{
    const { id, ...rest } = item;
    const res = await fetch(rest_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rest)
    });
    if( res.ok ){
      const data = await res.json();
      return data;
    }else{
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }catch(e){
    console.error("Error posting data:", e);
    return null;
  }
}

export async function put(id, item) {
  try{
    const res = await fetch(`${rest_url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    if( res.ok ){
      const data = await res.json();
      return data;
    }else{
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }catch(e){
    console.error("Error updating data:", e);
    return null;
  }
}

export default {getAll, get, deleteById, post, put};