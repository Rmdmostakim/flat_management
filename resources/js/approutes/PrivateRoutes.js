import UserAuth from "./UserAuth";
import {Navigate} from "react-router-dom";

export default function PrivateRoutes({children}){
    const auth = UserAuth();
    return auth ? children : <Navigate to='/login'/>;
}
