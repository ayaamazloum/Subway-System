<?php

namespace App\Http\Controllers\Branch;

use App\Http\Controllers\Controller;
use App\Models\Passenger;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BranchReviewController extends Controller
{
    public function index()
    {
        $passengers = Passenger::with(['reviews', 'user:id,name,email'])->get();

        $responseData = [];

        foreach ($passengers as $passenger) {
            $passengerData = [
                'name' => $passenger->user->name,
                'email' => $passenger->user->email,
                'reviews' => [
                    'reviews' => $passenger->reviews,
                ]
            ];
            $responseData[] = $passengerData;
        }

        return response()->json(['status' => 'success', 'data' => $responseData]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'ride_id' => 'required',
            'rating' => 'required',
            'content' => 'required',
        ]);
        $user_id = auth()->id();
        $passenger = Passenger::where('user_id', $user_id)->first();
        $passenger_id = $passenger->id;
        $review = new Review();
        $review->passenger_id = $passenger_id;
        $review->ride_id = $data['ride_id'];
        $review->rating = $data['rating'];
        $review->content = $data['content'];
        $review->save();
        return response()->json(['status' => 'success', 'message' => 'Review added successfully']);
    }
    public function destory($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(['status' => 'success', 'message' => 'Review deleted successfully']);
    }
}
