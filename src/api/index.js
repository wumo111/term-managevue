import axios from "axios"
import router from '@/router/index.js'
import ElementUI from "element-ui"

const myaxios=axios.create({
    timeout:5000,
});

myaxios.defaults.baseURL='/sys';

myaxios.interceptors.response.use(response=>{
    let Result=response.data;
    if(Result.code==200){
        return response;
    }else{
        ElementUI.Message.error(Result.msg?Result.msg:"系统异常",{
            duration:1000,
        });
        return Promise.reject(response.data.message);
    }
},error=>{
    if(error){
        error.message=error,response.data.msg;
    }
    if(error.response.status==401){
        router.push('/login');
        return Promise.reject(error);
    }
    if(error.response.status==404){
        router.push('/notFound');
        return Promise.reject(error);
    }
    if(error.response.status==400){
        error.message='请求服务器端方法错误';
    }
    if(error.response.status==500){
        error.message='服务器端代码发生错误';
}
Element.Message.error(error.message,{
    duration:1000,
});
return Promise.reject(error);
})

export default myaxios