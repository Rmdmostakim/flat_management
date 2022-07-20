export default function SuperadminAuth() {
    const user = localStorage.getItem('super-admin');
    if(user){
        return true;
    }
    return false;
}
