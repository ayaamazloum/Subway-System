<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CoinRequest;
use App\Models\Passenger;
use Illuminate\Http\Request;

class AdminCoinRequestController extends Controller
{
    public function index()
    {
        $passengers = Passenger::with('coins')->get();
        $responseData = [];

        foreach ($passengers as $passenger) {
            $passengerData = [
                'passenger_id' => $passenger->id,
                'name' => $passenger->user->name,
                'email' => $passenger->user->email,
                'coin_requests' => $passenger->coins
            ];
            $responseData[] = $passengerData;
        }
        return response()->json(['status' => 'success', 'data' => $responseData]);
    }
    public function update($id, Request $request)
    {
        $coinRequest = CoinRequest::findOrFail($id);
        $coinRequest->status = $request->status;
        $coinRequest->save();
        return response()->json(['status' => 'success', 'message' => 'Coin request updated successfully']);
    }
}
