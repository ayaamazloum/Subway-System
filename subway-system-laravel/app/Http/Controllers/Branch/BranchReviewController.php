<?php

namespace App\Http\Controllers\Branch;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Passenger;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BranchReviewController extends Controller
{
    public function index()
    {
        $user_id = auth()->id();
        $branch = Branch::where('user_id', $user_id)->first();
        $branchId = $branch->id;

        $reviews = Review::with(['passenger.user' => function ($query) {
            $query->select('id', 'name', 'email');
        }, 'ride.startStation.branch'])
            ->whereHas('ride.startStation.branch', function ($query) use ($branchId) {
                $query->where('id', $branchId);
            })
            ->get();
        return response()->json(['status' => 'success', 'data' => $reviews]);
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
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(['status' => 'success', 'message' => 'Review deleted successfully']);
    }
}
