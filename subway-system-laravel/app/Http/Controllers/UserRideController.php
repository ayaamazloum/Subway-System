<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use App\Models\Passenger;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserRideController extends Controller
{
    public function store()
    {
        $data = request()->validate([
            'content' => 'required|string',
            'rating' => 'required',
            'ride_id' => ['required', Rule::exists('rides', 'id')]
        ]);
        $user_id = auth()->user()->id;
        $passenger = Passenger::where('user_id', $user_id)->first();
        $passenger_id = $passenger->id;
        $review = new Review();
        $review->passenger_id = $passenger_id;
        $review->ride_id = $data['ride_id'];
        $review->rating = $data['rating'];
        $review->content = $data['content'];
        $review->save();
        return response()->json(['status' => 'success', 'message' => 'Review created successfully']);
    }
    public function view_station_rides($station_id)
    {
        $rides = Ride::with(['startStation', 'endStation', 'reviews'])
            ->where('start_station_id', $station_id)
            ->orWhere('end_station_id', $station_id)
            ->get();

        $transformedRides = $rides->map(function ($ride) {
            return [
                'ride_id' => $ride->id, 
                'rating' => $ride->reviews->avg('rating'),
                'start_station_longitude' => $ride->startStation->longitude,
                'start_station_latitude' => $ride->startStation->latitude,
                'start_station_id' => $ride->endStation->id,
                'end_station_id' => $ride->endStation->id,
                'start_time' => $ride->start_time,
                'end_station_latitude' => $ride->endStation->latitude,
                'end_station_longitude' => $ride->endStation->longitude,
                'end_time' => $ride->end_time,
                'capacity' => $ride->capacity,
            ];
        });

        return response()->json([
            "message" => "success",
            "data" => $transformedRides
        ], 200);
    }

    public function view_passenger_rides()
    {
        $passenger = Passenger::where('user_id', auth()->id())->first();
        $passenger_id = $passenger->id;

        if (!$passenger) {
            return response()->json([
                "message" => "passenger not found"
            ], 404);
        }

        $rides = Ride::with('reviews')
            ->whereHas('tickets', function ($query) use ($passenger_id) {
                $query->where('passenger_id', $passenger_id);
            })
            ->get();

        $formattedRides = $rides->map(function ($ride) {
            return [
                'start_station_latitude' => $ride->startStation->latitude,
                'start_station_longitude' => $ride->startStation->longitude,
                'end_station_latitude' => $ride->endStation->latitude,
                'end_station_longitude' => $ride->endStation->longitude,
                'start_station_id' => $ride->startStation->id,
                'end_station_id' => $ride->endStation->id,
                'start_time' => $ride->start_time,
                'end_time' => $ride->end_time,
                'capacity' => $ride->capacity,
                'id' => $ride->id,
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
