<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CoinRequest;

class UserCoinRequestController extends Controller
{
    public function index()
    {
        $requests = CoinRequest::where('passenger_id', auth()->id())->get();
        $responseData = [];

        return response()->json(['status' => 'success', 'data' => $requests]);
    }
}
