import {ip} from '../API/Configs'
export const getCoverImage=(data)=>{
    // Replce with an env var to heck if we are in dev or prod
      if(data.event_files.length > 0){
        // console.log(data.event_files[0])
        const replacedUrl = data.event_files[0].file.replace(/http:\/\/localhost:8000\//g, `${ip}/`);
        // console.log(replacedUrl)
  
        return replacedUrl;
      }else{
        return `${ip}/media/local/hotel.jpg`

      }
  }

  export const getCoverImageArtifacts=(data)=>{
    // Replce with an env var to heck if we are in dev or prod
      if(data.artifact_files.length > 0){
        // console.log(data.artifact_files[0])
        const replacedUrl = data.artifact_files[0].file.replace(/http:\/\/localhost:8000\//g, `${ip}/`);
        // console.log(replacedUrl)
  
        return replacedUrl;
      }else{
        return `${ip}/media/local/hotel.jpg`

      }
  }

export const getAllImagesArtifacts =(data)=>{
  if(data.artifact_files.length > 0){
    return data.artifact_files.map((element)=>{
      return element.file.replace(/http:\/\/localhost:8000\//g, `${ip}/`)
    })
  }else{
    return []
  }
}