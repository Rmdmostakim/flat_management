<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use App\Models\House;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;

class ReportController extends Controller
{

    public function index(Request $request){
        $houses = House::where('user_id',$this->getUserIdByName($request->user))->pluck('id');
        $flats = Flat::whereIn('house_id',$houses)->pluck('id');

        $inputMonth = date_format(date_create($request->month),"m");
        $inputYear  = date_format(date_create($request->year),"Y");

        $tenants = Tenant::whereIn('flat_id',$flats)
            ->where('phone', 'like', '%' . $request->phone . '%')
            ->with(['payment' => function ($query) use ($inputYear,$inputMonth) {
                $query->whereMonth('created_at',$inputMonth)->whereYear('created_at', $inputYear);
            },'flat'])
            ->get();

        if($tenants != null){
            return response()->json(['status'=>200,'tenants'=>$tenants]);
        }
        return response()->json(['status'=>400]);
    }

    public function getUserIdByName($userName){
        $user = User::where('name',$userName)->first();
        return $user->id;
    }
}
