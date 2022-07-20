<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Business;
class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $this->getUserIdByName($request->user);
        $settings = House::where('user_id',$id)->with('business')->get();
        return response()->json(['status'=>200,'settings'=>$settings]);
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
            'gas_single'=>'bail|required|numeric|min:0',
            'gas_double'=>'bail|required|numeric|min:0',
            'electricity'=>'bail|required|numeric|min:0',
            'water'=>'bail|required|numeric|min:0',
            'garbage'=>'bail|required|numeric|min:0',
            'security'=>'bail|required|numeric|min:0',
            'internet'=>'bail|required|numeric|min:0',
            'dish_antenna'=>'bail|required|numeric|min:0',
            'service_charge'=>'bail|required|numeric|min:0',
            'type'=>'bail|required|numeric|min:1|max:2',
            'others'=>'bail|required|numeric|min:0',
            'house_id'=>'bail|required|numeric|min:1'
        ]);

        $result = Business::updateOrCreate(
            ['house_id' => $validated['house_id']],
            [
                'gas_single'=>$validated['gas_single'],'gas_double'=>$validated['gas_double'],'electricity'=>$validated['electricity'],
                'water'=>$validated['water'],'garbage'=>$validated['garbage'],'security'=>$validated['security'],'internet'=>$validated['internet'],
                'dish_antenna'=>$validated['dish_antenna'],'service_charge'=>$validated['service_charge'],'type'=>$validated['type'],'others'=>$validated['others'],
            ]
        );

        if($result){
            return response()->json(['status'=>200,'message'=>'Settings created successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Error occurs! Try again']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getUserIdByName($userName){
        $user = User::where('name',$userName)->first();
        return $user->id;
    }
}
