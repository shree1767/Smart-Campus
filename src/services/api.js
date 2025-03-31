import axios from "axios";

export const processVideo=async(videofile)=>{
    try{
        const formdata=new FormData()
        formdata.append('video', videofile)
        const response= await axios.post('localhost:5000/process-video', formdata, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        return response.data
    }
    catch(e){
        console.error('error while processing video', e)
        throw e
    }
}
