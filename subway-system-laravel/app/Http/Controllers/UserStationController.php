<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use App\Models\Station;
use App\Models\Ride;
use Illuminate\Http\Request;

class UserStationController extends Controller
{
    public function view_stations()
    {  
        $ridesWithReviews = Ride::with('reviews')->get();
        $averageRatings = [];
        foreach ($ridesWithReviews as $ride) {
            $totalRating = 0;
            $reviewCount = $ride->reviews->count();
            foreach ($ride->reviews as $review) {
                $totalRating += $review->rating;
            }
            $averageRating = $reviewCount > 0 ? $totalRating / $reviewCount : 0;
            $averageRatings[$ride->id] = $averageRating;

        }
        foreach ($averageRatings as $rideId => $averageRating) {
            $ride = Ride::find($rideId);
            if ($ride) {
                $station = $ride->station;
                if ($station) {
                    $station->average_rating = $averageRating;
                    $station->save();
                }
            }
        }

        $stations = Station::all();
        return response()->json( [
            "message" => 'success',
            "data" => $stations
        ]);

    }

    public function view_nearest_stations(Request $request)
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
            "message" => "success",
            "data" => $stations
        ], 200);
    }
}
