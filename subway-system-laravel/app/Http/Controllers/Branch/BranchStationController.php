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
        $branch_id = $branch->id;
        $branch = Branch::with('station')->find($branch_id);
        $station = $branch->station;
        return response()->json(['status' => 'success', 'data' => $station]);
    }
    public function update($id, Request $request)
    {
        $station = Station::findOrFail($id);
        $data = $request->validate([
            'facilities' => 'text',
            'operating_hours' => 'text'
        ]);
        $station->update($data);
        return response()->json(['status' => 'success', 'message' => 'Station updated successfully']);
    }
}
