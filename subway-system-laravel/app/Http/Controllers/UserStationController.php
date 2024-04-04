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

    public function passenger_nearest_stations()
    {
        $user_id = auth()->id();
        $passenger = Passenger::where('user_id', $user_id)->first();

        if (!$passenger) {
            return response()->json([
                "message" => "Passenger not found"
            ], 404);
        }
        
        $latitude = $passenger->latitude;
        $longitude = $passenger->longitude;

        $maxDistance = 0.5;
        $stations = Station::whereBetween('latitude', [$latitude - $maxDistance, $latitude + $maxDistance])
        ->whereBetween('longitude', [$longitude - $maxDistance, $longitude + $maxDistance])
        ->get();

        return response()->json([
            "message" => "success",
            "stations" => $stations
        ], 200);
    }

    public function view_nearest_stations(Request $request)
    {
        
        $latitude = $request->latitude;
        $longitude = $request->longitude;

        $maxDistance = 0.5;
        $stations = Station::whereBetween('latitude', [$latitude - $maxDistance, $latitude + $maxDistance])
        ->whereBetween('longitude', [$longitude - $maxDistance, $longitude + $maxDistance])
        ->get();

        return response()->json([
            "message" => "success",
            "stations" => $stations
        ], 200);
    }

    public function view_highest_rating_stations()
    {
        $stations = Station::orderBy('average_rating', 'desc')->take(4)->get();

        return response()->json([
            "message" => "success",
            "data" => $stations
        ], 200);
    }
}
