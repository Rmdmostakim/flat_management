<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\House;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Flat;
use App\Models\Tenant;
class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
         $user = User::where('id',$this->getUserIdByName($request->user))->with('houses')->get();
         $house_id = array();
         foreach ($user as $houses){
             foreach ($houses->houses as $house){
                 array_push($house_id,$house->id);
             }
         }
         $flats = Flat::whereIn('house_id',$house_id)->with('tenant')->get();
         return response()->json(['status'=>200,'flats'=>$flats]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'bail|required|string|min:3',
            'last_name' => 'bail|required|string|min:3',
            'email'=>'bail|required|email',
            'phone'=>'bail|required|string|min:11',
            'rent'=>'bail|required|numeric|min:1',
            'date'=>'bail|required|date',
            'billing_type'=>'bail|required|numeric|min:0|max:1',
            'flat_id'=>'bail|required|numeric|min:1',
            'gas_single'=>'bail|required|numeric|min:0',
            'gas_double'=>'bail|required|numeric|min:0',
            'electricity'=>'bail|required|numeric|min:0',
            'water'=>'bail|required|numeric|min:0',
            'garbage'=>'bail|required|numeric|min:0',
            'security'=>'bail|required|numeric|min:0',
            'internet'=>'bail|required|numeric|min:0',
            'dish_antenna'=>'bail|required|numeric|min:0',
            'service_charge'=>'bail|required|numeric|min:0',
            'type'=>'bail|required|numeric|min:0|max:2',
            'others'=>'bail|required|numeric|min:0',
        ]);

        $tenant = Tenant::updateOrCreate(
            ['flat_id' => $validated['flat_id']],
            [
                'first_name'=>$validated['first_name'],
                'last_name'=>$validated['last_name'],
                'email'=>$validated['email'],
                'phone'=>$validated['email'],
                'rent'=>$validated['rent'],
                'rent_start_date'=>date_format(date_create($validated['date']),"Y/m/d"),
                'billing_type'=>$validated['billing_type'],
            ]
        );

        $booked = Flat::where('id',$request->flat_id)->update([
            'booked'=>1
        ]);

        if($validated['billing_type'] == 1){
            $result = Business::updateOrCreate(
                ['flat_id' => $validated['flat_id']],
                [
                    'gas_single'=>$validated['gas_single'],'gas_double'=>$validated['gas_double'],'electricity'=>$validated['electricity'],
                    'water'=>$validated['water'],'garbage'=>$validated['garbage'],'security'=>$validated['security'],'internet'=>$validated['internet'],
                    'dish_antenna'=>$validated['dish_antenna'],'service_charge'=>$validated['service_charge'],'type'=>$validated['type'],'others'=>$validated['others'],
                ]
            );
        }

        return response()->json(['status'=>200,'message'=>'Booking confirmed']);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tenant = Tenant::where('id',$id)->first();
        return response()->json(['status'=>200,'tenant'=>$tenant]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'first_name'=>'bail|required|string|min:3',
            'last_name'=>'bail|required|string|min:3',
            'email'=>'bail|required|email',
            'phone'=>'bail|required|string|min:11',
            'rent'=>'bail|required|numeric|min:1',
        ]);

        $update = Tenant::where('id',$id)
                        ->update([
                            'first_name'=>$validated['first_name'],
                            'last_name'=>$validated['last_name'],
                            'email'=>$validated['email'],
                            'phone'=>$validated['phone'],
                            'rent'=>$validated['rent'],
                        ]);
        if($update){
            return response()->json(['status'=>200,'message'=>'Tenant update successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Tenant update failed']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tenant = Tenant::where('id',$id)->first();
        $removeFlat = Flat::where('id',$tenant->flat_id)->update(['booked'=>0]);
        $removeTenant = Tenant::where('id',$id)->delete();
        if($removeTenant){
            return response()->json(['status'=>200,'message'=>'Tenant removed successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Tenant remove failed']);
    }

    public function getUserIdByName($userName){
        $user = User::where('name',$userName)->first();
        return $user->id;
    }
}
