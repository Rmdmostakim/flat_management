<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Flat;
use App\Models\House;
use App\Models\Tenant;
class FlatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $this->getUserIdByName($request->user);
        $flats = House::where('user_id',$id)->with('flats')->get();
        if($flats){
            return response()->json(['status'=>200,'flats'=>$flats]);
        }
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
            'name' => 'bail|required|string|min:1',
            'size' => 'bail|required|numeric|min:1',
            'house_id'=>'bail|required|numeric|min:1'
        ]);

        $totalFlat = House::where('id',$request->house_id)->pluck('flat_numbers')->first();
        $createdFlats = Flat::where('house_id',$request->house_id)->count('id');

        if($totalFlat == $createdFlats){
            return response()->json(['status'=>400,'message'=>'Flats quota fulfil']);
        }

        $result = Flat::create([
            'flat_name'=>$validated['name'],
            'size'=>$validated['size'],
            'house_id'=>$validated['house_id'],
        ]);

        if($result){
            return response()->json(['status'=>200,'message'=>'Flat added successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Error occurs! Try again']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id):object{
        $flat = Flat::where('id',$id)->with('house')->first();

        return response()->json(['status'=>200,'flat'=>$flat]);
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
    public function update(Request $request)
    {
        $validated = $request->validate([
            'flat_name' => 'bail|required|string|min:1',
            'size' => 'bail|required|numeric|min:1',
            'flat_id'=>'bail|required|numeric|min:1'
        ]);

        $result = Flat::where('id',$validated['flat_id'])->update(['flat_name'=>$validated['flat_name'],'size'=>$validated['size']]);
        if($result){
            return response()->json(['status'=>200,'message'=>'Flat updated successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Error occurs! Try again']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Tenant::where('flat_id',$id)->update(['status'=>0]);
        Flat::where('id',$id)->delete();
        return response()->json(['status'=>200,'message'=>'Flat Delete successfully']);
    }
    public function getUserIdByName($userName){
        $user = User::where('name',$userName)->first();
        return $user->id;
    }
}
