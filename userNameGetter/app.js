const axios = require('axios');




const url = 'http://192.168.0.102'
axios.post(`${url}/api`, {"devicetype":"HueWebApp#Goffy"})
.then(({ data }) => console.log(data))

// [ { success: { username: '' } } ]
