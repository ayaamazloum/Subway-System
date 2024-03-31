<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use App\Models\Station;
use Illuminate\Http\Request;

class UserStationController extends Controller
{
    public function view_stations()
    {
        $stations = Station::all();

        return response()->json([
            "message" => "found successfully",
            "stations" => $stations
        ], 200);
    }

    public function vew_recommended_stations(Request $request)
    {
        $passenger = Passenger::find($request->input('passenger_id'));

        if (!$passenger) {
            return response()->json([
                "message" => "passenger not found"
            ], 404);
        }
        $passengerLatitude = $passenger->latitude;
        $passengerLongitude = $passenger->longitude;
        $maxDistance = 0.5;

        $stations = Station::whereBetween('latitude', [$passengerLatitude - $maxDistance, $passengerLatitude + $maxDistance])
        ->whereBetween('longitude', [$passengerLongitude - $maxDistance, $passengerLongitude + $maxDistance])
        ->get();

        return response()->json([
            "message" => "recommended stations found successfully",
            "stations" => $stations
        ], 200);
    }
}
