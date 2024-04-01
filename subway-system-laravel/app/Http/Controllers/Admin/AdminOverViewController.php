<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CoinRequest;
use App\Models\Passenger;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminOverViewController extends Controller
{
    public function index()
    {
        $registeredPassengersByMonth = Passenger::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();
        $coinRequestsByStatus = CoinRequest::select(
            'status',
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('status')
            ->get();
        $ticketsByMonth = Ticket::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();
        return response()->json(['status' => 'success', 'data' => [
            'passengersByMonth' => $registeredPassengersByMonth,
            'coinRequestsByStatus' => $coinRequestsByStatus,
            'ticketsByMonth' => $ticketsByMonth,
        ]]);
    }
}
