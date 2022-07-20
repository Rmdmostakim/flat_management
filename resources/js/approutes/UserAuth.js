export default function UserAuth() {
    const user = localStorage.getItem('user');
    if(user){
        return true;
    }
    return false;
}
