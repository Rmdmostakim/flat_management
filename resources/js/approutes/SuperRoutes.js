
import {Navigate} from "react-router-dom";
import SuperadminAuth from "./SuperadminAuth";
export default function SuperRoutes({children}){
    const auth = SuperadminAuth();
    return auth ? children : <Navigate to='/super-admin/login'/>;
}
