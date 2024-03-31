<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Rules\UniqueEmail;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $existing_email = User::where('email', $request->email)->get()[0];

        if($existing_email->exists())
            return response()->json(['error' => 'Email already exists'], 422);

        $passenger_role = Role::where('name', 'Passenger')->get()[0];

        if (!$passenger_role) {
            return response()->json(['error' => 'Role not found'], 404);
        }

        $user = User::create([
            'name' => $request->name,
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
            $token = Auth::user()->createToken('MyApp')->accessToken;
            return response()->json(['token' => $token]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}