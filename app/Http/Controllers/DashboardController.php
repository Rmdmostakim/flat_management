<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use App\Models\House;
use App\Models\Payment;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request){
        $userId = $this->getUserIdByName($request->user);
        $totalHouse = House::where('user_id',$userId)->count();
        $totalFlat = Flat::whereIn('house_id',House::where('user_id',$userId)->pluck('id'))->count();
        $totalTenat = Tenant::whereIn('flat_id',Flat::whereIn('house_id',House::where('user_id',$userId)->pluck('id'))->pluck('id'))->count();
        $totalPayment = Payment::whereIn('tenant_id',Tenant::whereIn('flat_id',Flat::whereIn('house_id',House::where('user_id',$userId)->pluck('id'))->pluck('id'))->pluck('id'))
                                ->whereMonth('created_at', date('m'))
                                ->whereYear('created_at', date('Y'))
                                ->count();
        return response()->json(['house'=>$totalHouse,'flat'=>$totalFlat,'tenant'=>$totalTenat,'paid'=>$totalPayment]);
    }

    public function getUserIdByName($userName){
        $user = User::where('name',$userName)->first();
        return $user->id;
    }
}
