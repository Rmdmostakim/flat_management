<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Tenant;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Flat;

class HouseController extends Controller
{
    public function index(Request $request){
        $id = $this->getUserIdByName($request->user);
        $houses = House::where('user_id',$this->getUserIdByName($request->user))
            ->orderBy('created_at', 'desc')
            ->withCount(['flats' => function ($query) {
                $query->where('booked', 1);
            }])
            ->get();
        return response()->json(['status'=>200,'houses'=>$houses]);

    }

    public function store(Request $request):object{

        $validated = $request->validate([
            'name' => 'bail|required|string|min:5',
            'address' => 'bail|required|string|min:5',
            'flat_numbers'=>'bail|required|numeric|min:1',
        ]);

        $result = House::create([
            'house_name'=>$validated['name'],
            'address'=>$validated['address'],
            'flat_numbers'=>$validated['flat_numbers'],
            'user_id'=>$this->getUserIdByName($request->user),
        ]);

        if($result){
            return response()->json(['status'=>200,'message'=>'House added successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Error occurs! Try again']);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'name' => 'bail|required|string|min:5',
            'address' => 'bail|required|string|min:5',
            'flat_numbers'=>'bail|required|numeric|min:1',
        ]);

        $result = House::where('id',$request->house_id)
                ->update([
                    'house_name'=>$validated['name'],
                    'address'=>$validated['address'],
                    'flat_numbers'=>$validated['flat_numbers'],
                ]);
        if($result){
            return response()->json(['status'=>200,'message'=>'House updated successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Error occurs! Try again']);
    }

    public function show($id):object{
        $house = House::where('id',$id)->with('flats')->first();
        return response()->json(['status'=>200,'house'=>$house]);
    }

    public function destroy($id){
        $flats_id = Flat::where('house_id',$id)->pluck('id');
        Tenant::whereIn('flat_id',$flats_id)->delete();
        Flat::where('house_id',$id)->delete();
        House::where('id',$id)->delete();
        return response()->json(['status'=>200,'message'=>'House delete successfully']);
    }

    public function getUserIdByName($userName){
        $user = User::where('name',$userName)->first();
        return $user->id;
    }


}
