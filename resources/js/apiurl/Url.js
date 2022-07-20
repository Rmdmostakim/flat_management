export default class Url{
    static baseUrl = 'http://localhost:8000/api/';

    static superadminLogin = `${this.baseUrl}super-admin/login`;
    static superadminUpdate = `${this.baseUrl}super-admin/update`;
    static superadminReset = `${this.baseUrl}super-admin/reset`;
    static superadmin = `${this.baseUrl}super-admin`;
    static userManage = `${this.baseUrl}super-admin/userManage/`;
    static superadminReset = `${this.baseUrl}super-admin/reset`;
    static superadminUserReset = `${this.baseUrl}super-admin/user/pass-reset`;

    static registration = `${this.baseUrl}registration`;
    static login = `${this.baseUrl}login`;
    static userEmail = `${this.baseUrl}emailValidation`;
    static userReset = `${this.baseUrl}user/reset`;


    static dashboard = `${this.baseUrl}dashboard`;

    static getHouses = `${this.baseUrl}houses`;
    static storeHouse = `${this.baseUrl}house/store`;
    static showHouse = `${this.baseUrl}house/show/`;
    static updateHouse= `${this.baseUrl}house/update`;
    static deleteHouse= `${this.baseUrl}house/destroy/`;

    static getFlats = `${this.baseUrl}flats`;
    static storeFlat = `${this.baseUrl}flat/store`;
    static updateFlat = `${this.baseUrl}flat/update`;
    static showFlat = `${this.baseUrl}flat/show/`;
    static deleteFlat= `${this.baseUrl}flat/destroy/`;

    static getTenants = `${this.baseUrl}tenants`;
    static storeTenant = `${this.baseUrl}tenant/store`;
    static showTenant = `${this.baseUrl}tenant/show/`;
    static updateTenant = `${this.baseUrl}tenant/update/`;
    static destroyTenant = `${this.baseUrl}tenant/destroy/`;

    static settings= `${this.baseUrl}settings`;
    static settingsStore= `${this.baseUrl}settings/store`;

    static payments = `${this.baseUrl}payments/`;
    static individualPayment = `${this.baseUrl}payment/show/`;
    static storePayment = `${this.baseUrl}payment/store`;
    static notify = `${this.baseUrl}payment/notification/`;

    static reports = `${this.baseUrl}reports`;
}
