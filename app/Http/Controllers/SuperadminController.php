<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class SuperadminController extends Controller
{
    public function index(){
        $users = User::all();
        return $users;
    }

    public function userManage($id){
        $user = User::where('id',$id)->first();
        if($user->verified == 1){
            $result = User::where('id',$id)->update([
                'verified'=>0
            ]);
        }else{
            $result = User::where('id',$id)->update([
                'verified'=>1
            ]);
        }
        if($result){
            return response()->json(['status'=>200,'message'=>'Status updated successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Status update failed']);
    }

    public function login(Request $request){
        $validated = $request->validate([
            'email'=>'bail|required|email',
            'password'=>'bail|required|string|min:8'
        ]);

        if($validated['email'] == str_replace(' ', '', $this->getCredential('SUPER_ADMIN'))
        && $validated['password'] == str_replace(' ', '', $this->getCredential('SUPER_PASSWORD')) ){
            return response()->json(['status'=>200,'message'=>'Login success','user'=>'super-admin']);
        }
        return response()->json(['status'=>400,'message'=>'Login failed']);
    }

    public function profileReset(Request $request){
        $validated = $request->validate([
            'email'=>'bail|required|email',
            'password'=>'bail|required|string|min:8'
        ]);

        $email = $this->envsetup('SUPER_ADMIN',$validated['email']);
        $pass = $this->envsetup('SUPER_PASSWORD',$validated['password']);

        if($email && $pass){
            return response()->json(['status'=>200,'message'=>'Profile updated successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Profile update failed']);
    }

    public function passwordReset(Request $request){
        $validated = $request->validate([
            'email'=>'bail|required|string',
            'password'=>'bail|required|string|min:8'
        ]);

        if($validated['email'] == str_replace(' ', '', $this->getCredential('SUPER_ADMIN'))){
            $pass = $this->envsetup('SUPER_PASSWORD',$validated['password']);
            if($pass){
                return response()->json(['status'=>200,'message'=>'Password updated successfully']);
            }
        }
        return response()->json(['status'=>200,'message'=>'Password update failed']);
    }

    private function getCredential($key){
        $envPath = app()->environmentFilePath();
        $env     = file_get_contents($envPath);
        $env    .= "\n";

        $startPos = strpos($env,$key);
        $endPos   = strpos($env,"\n",$startPos);
        $oldValue = substr($env,$startPos,$endPos-$startPos);
        return substr($oldValue,strpos($oldValue,'=')+1);
    }

    private function envsetup($key,$value){
        $envPath = app()->environmentFilePath();
        $env     = file_get_contents($envPath);
        $env    .= "\n";

        $startPos = strpos($env,$key);
        $endPos   = strpos($env,"\n",$startPos);
        $oldValue = substr($env,$startPos,$endPos-$startPos);
        $replace  = str_replace($oldValue,"{$key}={$value}",$env);
        $newEnv   = file_put_contents($envPath,$replace);
        return $newEnv;
    }

    public function userPasswordReset(Request $request){
        $validated = $request->validate([
            'user_id'=>'bail|required|numeric|min:1',
            'password'=>'bail|required|string|min:6',
        ]);

        $result = User::where('id',$validated['user_id'])->update(['password'=>Hash::make($validated['password'])]);

        if($result){
            return response()->json(['status'=>200,'message'=>'Password reset successfully']);
        }
        return response()->json(['status'=>400,'message'=>'Password reset failed']);
    }
}
