<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\Request;

class UserRideController extends Controller
{
    public function view_station_rides(Request $request, $station_id)
    {
        $rides = Ride::where('start_station_id', $station_id)
        ->orWhere('end_station_id', $station_id)
        ->get();

        return response()->json([
            "message" => "success",
            "data" => $rides
        ], 200);
    }
}
