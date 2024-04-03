<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CoinRequest;

class UserCoinRequestController extends Controller
{
    public function index()
    {
        $user_id = auth()->id();
        $requests = CoinRequest::where('passenger_id', $user_id)->get();
        $responseData = [];
        foreach ($requests as $request) {
            $requestData = [
                'amount' => $request->amount,
                'coin_request_status' => $request->status,
                'date' => $request->created_at
            ];
            $responseData[] = $requestData;
        }
        return response()->json(['status' => 'success', 'coin_requests' => $responseData]);
    }
    public function store()
    {
        $data = request()->validate(['amount' => 'required']);
        $user_id = auth()->id();

        $data['amount'] = request()->amount;
        $data['passenger_id'] = $user_id;

        CoinRequest::create($data);
        return response()->json(['status' => 'success', 'messsage' => "Request sent successfully"], 200);
    }
}
