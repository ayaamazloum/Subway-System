<?php

namespace App\Http\Controllers\Branch;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Ride;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BranchRideController extends Controller
{
    public function index()
    {
        $user_id = auth()->id();
        $branch = Branch::where('user_id', $user_id)->first();
        $branch_id = $branch->id;
        $branch = Branch::with('station')->find($branch_id);
        $station = $branch->station;
        $station_id = $station->id;
        $rides = Ride::where('start_station_id', $station_id)->get();
        return response()->json(['status' => 'success', 'data' => $rides]);
    }
    public function update($id, Request $request)
    {
        $ride = Ride::findOrFail($id);
        $data = $request->validate([
            'start_time' => "time",
            'end_time' => "time",
            'start_station_id' => [Rule::exists('stations')],
            'end_station_id' => [Rule::exists('stations')]
        ]);
        $ride->start_time = $data['start_time'];
        $ride->end_time = $data['end_time'];
        $ride->start_station_id = $data['start_station_id'];
        $ride->end_station_id = $data['end_station_id'];
        $ride->save();
        return response()->json(['status' => 'success', 'message' => "Ride Updated Successfully"]);
    }
}
