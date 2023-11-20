import { login, addToken, getToken, signup } from "../services/Auth.service";


const reducer=(state,action)=>{
    switch(action.type){
         case "LOGIN":
            return {
                login(action.payload)
            }
    }

}