<?php

namespace App\Http\Controllers\Branch;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Station;
use Illuminate\Http\Request;

class BranchStationController extends Controller
{
    public function index()
    {
        $user_id = auth()->id();
        $branch = Branch::where('user_id', $user_id)->first();
        if (!$branch) {
            return response()->json(['status' => 'error', 'message' => 'Branch not found'], 404);
        }

        $branch_id = $branch->id;
        $branchWithStations = Branch::with('station')->find($branch_id);
        $stations = $branchWithStations->station; 
        return response()->json(['status' => 'success', 'data' => [$stations]]);
    }
    public function update($id, Request $request)
    {
        $station = Station::findOrFail($id);
        $station->operating_hours = $request->operating_hours;
        $station->service_status = $request->service_status;
        $station->facilities = $request->facilities;
        $station->save();
        return response()->json(['status' => 'success', 'message' => 'Station updated successfully'], 200);
    }
}
