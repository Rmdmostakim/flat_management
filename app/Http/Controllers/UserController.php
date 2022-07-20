<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function registration(Request $request):object{
         $validated = $request->validate([
                        'name' => 'bail|required|string|min:5',
                        'phone' => 'bail|required|string|min:11',
                        'email'=>'bail|required|email|unique:users',
                        'password'=> 'required|string|min:6',
                    ]);

         $result = User::create([
             'name'=>$validated['name'],
             'phone'=>$validated['phone'],
             'email'=>$validated['email'],
             'password'=>Hash::make($validated['password']),
         ]);

         if($result) {
             return response()->json(['status' => 200, 'message' => 'Registration success wait for verification']);
         }
        return response()->json(['status'=>400,'message'=>'Registration failed']);
    }

    public function login(Request $request){
        $validated = $request->validate([
            'email'=>'bail|required|email|exists:users',
            'password'=> 'required|string|min:6',
        ]);

        $user   = User::where('email','=',$validated['email'])->first();
        $matched = Hash::check($validated['password'],$user->password);

        if($matched && $user->verified == 1){
            return response()->json(['status' => 200, 'message' => 'Login success','user'=>$user->name]);
        }
        return response()->json(['status'=>400,'message'=>'Login failed']);

    }

    public function emailValidation(Request $request){
        $validated = $request->validate([
            'email'=>'bail|required|email',
        ]);
        $user = User::where('email',$validated['email'])->first();
        if($user){
            return response()->json(['status'=>200]);
        }
        return response()->json(['status'=>400,'message'=>'Invalid Email']);
    }

    public function passwordReset(Request $request){
        $validated = $request->validate([
            'email'=>'bail|required|email',
            'password'=>'bail|required|string|min:6'
        ]);

        $user = User::where('email',$validated['email'])->update(['password'=>Hash::make($validated['password'])]);
        if($user){
            return response()->json(['status' => 200, 'message' => 'Password reset successfully']);
        }
        return response()->json(['status' => 400, 'message' => 'Password reset failed']);
    }
}
