<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
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
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
}
