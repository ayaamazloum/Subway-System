<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Station;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminStationController extends Controller
{
    public function index()
    {
        $branches = Branch::where('status', 'free')
            ->with('user')
            ->get();
        $stations = Station::all();
        return response()->json(['status' => 'success', 'data' => [
            'branches' => $branches,
            'stations' => $stations
        ]]);
    }
    public function store()
    {
        try {
            $data = request()->validate([
                'name' => 'required|string|min:3|max:20',
                'facilities' => 'required',
                'operating_hours' => 'required',
                'branch_id' => ['required', Rule::exists('branches', 'id')],
                'latitude' => 'required',
                'longitude' => 'required',
            ]);
            $branch = Branch::where('id', $data['branch_id'])->first();
            $branch->status = "active";
            $branch->save();
            $station = new Station();
            $station->name = $data['name'];
            $station->facilities = $data['facilities'];
            $station->operating_hours = $data['operating_hours'];
            $station->branch_id = $data['branch_id'];
            $station->latitude = floatval($data['latitude']);
            $station->longitude = floatval($data['longitude']);
            $station->save();
            return response()->json(['status' => 'success', 'message' => 'Station Created Successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'message' => 'Request Failed'], 500);
        }
    }
    public function update($id)
    {
        $station = Station::findOrFail($id);
        $data = request()->validate([
            'name' => ['required', 'string', 'min:3', 'max:20'],
            'facilities' => ['required'],
            'branch_id' => ['required', Rule::exists('branches', 'id')],
            'operating_hours' => ['required'],
            'latitude' => ['required'],
            'longitude' => ['required'],
        ]);
        $station->name = $data['name'];
        $station->facilities = $data['facilities'];
        $station->branch_id = $data['branch_id'];
        $station->operating_hours = $data['operating_hours'];
        $station->latitude = floatval($data['latitude']);
        $station->longitude = floatval($data['longitude']);
        $station->save();
        return response()->json(['status' => 'success', 'message' => 'Station Updated Successfully'], 200);
    }

    public function destroy($id)
    {
        $station = Station::findOrFail($id);
        $branch = Branch::where('id', $station->branch_id)->first();
        $branch->status = "free";
        $branch->save();
        $station->delete();
        return response()->json(['status' => 'success', 'message' => 'Station Deleted Successfully'], 200);
    }
}
