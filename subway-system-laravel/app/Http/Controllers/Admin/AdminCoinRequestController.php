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
        $oldStatus = $coinRequest->status;

        $coinRequest->status = $request->status;
        $coinRequest->save();

        if ($request->status === 'Approved' && $oldStatus !== 'Approved') {

            $passenger = $coinRequest->passenger;

            $newAmount = $coinRequest->amount;
            $passenger->wallet_balance += $newAmount;
            $passenger->save();
        }
        return response()->json(['status' => 'success', 'message' => 'Coin request updated successfully']);
    }
    public function destroy($id)
    {
        $coinRequest = CoinRequest::findOrFail($id);
        $coinRequest->delete();
        return response()->json(['status' => 'success', 'message' => 'Coin request deleted successfully']);
    }
}
