<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\FlatController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SuperadminController;
use App\Http\Controllers\ReportController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::post('super-admin/login',[SuperadminController::class,'login'])->name('super_admin.login');
Route::post('super-admin/update',[SuperadminController::class,'profileReset'])->name('super-admin.update');
Route::post('super-admin/reset',[SuperadminController::class,'passwordReset'])->name('super-admin.password');
Route::get('super-admin',[SuperadminController::class,'index'])->name('super-admin');
Route::get('super-admin/userManage/{userId}',[SuperadminController::class,'userManage'])->name('super-admin.userManage');
Route::post('super-admin/user/pass-reset',[SuperadminController::class,'userPasswordReset'])->name('super-admin.user.pass-reset');

Route::post('registration',[UserController::class,'registration'])->name('user.registration');
Route::post('login',[UserController::class,'login'])->name('user.login');
Route::post('emailValidation',[UserController::class,'emailValidation'])->name('email.validation');
Route::post('user/reset',[UserController::class,'passwordReset'])->name('user.reset');

Route::post('dashboard',[DashboardController::class,'index'])->name('dashboard.index');

Route::post('houses',[HouseController::class,'index'])->name('houses');
Route::post('house/store',[HouseController::class,'store'])->name('house.store');
Route::get('house/show/{houseId}',[HouseController::class,'show'])->name('house.show');
Route::put('house/update',[HouseController::class,'update'])->name('house.update');
Route::delete('house/destroy/{houseId}',[HouseController::class,'destroy'])->name('house.delete');

Route::post('flats',[FlatController::class,'index'])->name('flats');
Route::post('flat/store',[FlatController::class,'store'])->name('flat.store');
Route::get('flat/show/{flatId}',[FlatController::class,'show'])->name('flat.show');
Route::put('flat/update',[FlatController::class,'update'])->name('flat.update');
Route::delete('flat/destroy/{flatId}',[FlatController::class,'destroy'])->name('flat.delete');

Route::post('tenants',[TenantController::class,'index'])->name('tenants');
Route::post('tenant/store',[TenantController::class,'store'])->name('tenant.store');
Route::get('tenant/show/{tenantId}',[TenantController::class,'show'])->name('tenant.show');
Route::post('tenant/update/{tenantId}',[TenantController::class,'update'])->name('tenant.update');
Route::get('tenant/destroy/{tenantId}',[TenantController::class,'destroy'])->name('tenant.destroy');

Route::post('settings',[BusinessController::class,'index'])->name('settings');
Route::post('settings/store',[BusinessController::class,'store'])->name('settings.store');

Route::post('payments/{tenantId}',[PaymentController::class,'index'])->name('payment.index');
Route::get('payment/show/{id}',[PaymentController::class,'show'])->name('invoice.show');
Route::post('payment/store',[PaymentController::class,'store'])->name('payment.store');

Route::post('reports',[ReportController::class,'index'])->name('reports');
