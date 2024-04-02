<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use App\Models\Passenger;
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

    public function view_passenger_rides($passenger_id)
    {
        $passenger = Passenger::find($passenger_id);

        if(!$passenger) {
            return response()->json([
                "message" => "passenger not found"
            ], 404);
        }

        $rides = Ride::with('reviews')
                    ->whereHas('tickets', function($query) use($passenger_id) {
                        $query->where('passenger_id', $passenger_id);
                    })
                    ->get();

        $formattedRides = $rides->map(function($ride) {
            return [
                'start_stations_latitude' => $ride->startStation->latitude,
                'start_station_longitude' => $ride->startStation->longitude,
                'end_station_latitude' => $ride->endStation->latitude,
                'end_station_longitude' => $ride->endStation->longitude,
                'start_time' => $ride->start_time,
                'end_time' => $ride->end_time,
                'capacity' => $ride->capacity,
                'rating' => $this->calculateAverageRating($ride->reviews),
            ];
        });

        return response()->json([
            "message" => "success",
            "data" => $formattedRides
        ], 200);
    }

    private function calculateAverageRating($reviews)
    {
        $totalRating = 0;
        $reviewCount = $reviews->count();

        if ($reviewCount == 0) {
            return null;
        }

        foreach ($reviews as $review) {
            $totalRating += $review->rating;
        }

        return $totalRating / $reviewCount;
    }
}
