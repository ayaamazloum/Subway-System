<?php

namespace App\Http\Controllers\Branch;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Ride;
use App\Models\Station;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BranchRideController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        $branchs = Branch::where('user_id', $user_id)->first();
        $branch_id = $branchs->id;
        $stations = Station::all();
        $branch = Branch::with('station')->find($branch_id);
        $station = $branch->station;
        $station_id = $station->id;
        $rides = Ride::where('start_station_id', $station_id)->get();
        return response()->json(['status' => 'success', 'data' => ['rides' => $rides, 'stations' => $stations]]);
    }
    public function update($id, Request $request)
    {
        $ride = Ride::findOrFail($id);
        $data = $request->validate([
            'start_time' => "string",
            'end_time' => "string",
            'status' => 'string'
        ]);
        $ride->start_time = $data['start_time'];
        $ride->end_time = $data['end_time'];
        $ride->status = $data['status'];
        $ride->save();
        return response()->json(['status' => 'success', 'message' => "Ride Updated Successfully"]);
    }
}
