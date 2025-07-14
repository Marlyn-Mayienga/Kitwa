import axios from "axios";
import { restoreToken } from "../utils/LocalStorageTools";
// 192.168.1.67 Home
// 172.29.105.77 Cylab
// 192.168.1.113
// Home
// export let ip = "http://192.168.1.67:8000"
// Other
// export let ip = "http://0.0.0.0:8000"
// Cylab
export let ip = "http://192.168.1.77:8000"
export class API {
  BASE_URL = ip+"/api/v1";
  baseJsonHeaders = {
    "Content-Type": "application/json",
  };

  baseFormHeaders = {
    "Content-Type": "multipart/form-data",
    Athorization: "Token " + this.token,
  };
  token = "";

  constructor () {
    restoreToken().then((res)=>{
        if(res){
          this.token =  `${res}`
        }
    })
  }

  async getHeaders (protectedRoute=false) {
    this.token = await restoreToken()
    // console.log(`There it is again ${this.token}`)

    const headers = protectedRoute
      ? { ...this.baseJsonHeaders, Authorization: "Token " + this.token }
      : this.baseJsonHeaders;

    // console.log(headers)
    return headers
  }

  async getRequest(endpoint, protectedRoute = false) {
    const headers = await this.getHeaders(protectedRoute);
    // console.log(headers)
   
    try {
      const response = await axios({
        method: "get",
        url: `${this.BASE_URL}${endpoint}`,
        headers: headers,
      });

      return response;
    } catch (e) {
      return { error: e };
    }
  }

  async postRequest(endpoint, body, protectedRoute = false) {
      // console.table("Here we are")
      const headers = await this.getHeaders(protectedRoute);
      // console.log(headers)
      const response = await axios({
        method: "post",
        url: `${this.BASE_URL}${endpoint}`,
        headers: headers,
        data:body,

      });
      // const response = await axios.post(this.BASE_URL+endpoint, body, {
      //   headers: headers,
      // });
     
      return response;
    
  }

  async putRequest(endpoint, body, protectedRoute = false) {
    const headers = this.getHeaders(protectedRoute);
    try {
      const response = await axios({
        method: "put",
        url: `${this.BASE_URL}${endpoint}`,
        headers: headers,
        data: body,
      });

      return response;
    } catch (e) {
      return { error: e };
    }
  }

  async formRequest(endpoint, body, setProgress, protectedRoute = false) {
    const formData = fromJSON_to_formData(body);
    try {
      const response = await axios.post(this.BASE_URL + endpoint, formData, {
        headers: this.baseFormHeaders,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(progress);
          console.log(`Upload Progress: ${progress}%`);
        },
      });

      return response;
    } catch (e) {
      return { error: e };
    }
  }
}

