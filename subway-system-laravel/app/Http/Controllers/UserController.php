<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $existing_email = User::where('email', $request->email)->first();

        if($existing_email)
            return response()->json(['error' => 'Email already exists'], 422);

        $passenger_role = Role::where('name', 'Passenger')->get()[0];

        if (!$passenger_role) {
            return response()->json(['error' => 'Role not found'], 404);
        }

        $user = User::create([
            'name' => $request->first_name.' '.$request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $passenger_role->id
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = JWTAuth::fromUser(Auth::user());

            $role_id = User::where('email', $request->email)->first()->role_id;
            $role_id === 1 
            ? $redirect =  '/admin/overview'
            : ($role_id === 2
                ? $redirect =  '/admin/branches'
                : $redirect =  '/');
                
            return response()->json(['token' => compact('token'), 'redirect'=>$redirect], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}