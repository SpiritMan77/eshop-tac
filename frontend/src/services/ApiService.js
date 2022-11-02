import axios from 'axios';

const apiUrl = "http://localhost:8085/api/product/"

export async function getProducts(category, page, size) {
 let address = apiUrl + category.toLowerCase();
 return await axios
   .get(address, {params: {page: page, size: size,}})
   .then(res => res.data, res => res.config)
   .catch(err => {console.log(err.message)})
}

export async function getCurrentProduct(category, id) {
 let address = apiUrl + category.toLowerCase() + '/' + id;
 return await axios
   .get(address)
   .then(res => res.data)
   .catch(err => {console.log(err.message)})
}

