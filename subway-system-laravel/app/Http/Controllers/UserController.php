<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            $data = $request->validate([
                'email' => ["required", "email", Rule::unique('users', 'email')],
                'name' => ["required", "string"],
                'password' => ['required', 'string'],
                "latitude" => ['required'],
                "longitude" => ['required'],
            ]);

            $passenger_role = Role::where('name', 'Passenger')->first();

            if (!$passenger_role) {
                return response()->json(['error' => 'Role not found'], 404);
            }

            $user = new User();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = bcrypt($data['password']);
            $user->role_id = $passenger_role->id;
            $user->save();
            $passenger = new Passenger();
            $passenger->latitude = $request->latitude;
            $passenger->longitude = $request->longitude;
            $passenger->user_id = $user->id;
            $passenger->save();
            return response()->json(['status' => 'sucess', 'message' => 'User registered successfully'], 201);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            return response()->json(['status' => 'failed',  'errors' => $errors], 422);
        }
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
