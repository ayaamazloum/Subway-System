<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;

class UserTicketController extends Controller
{
    public function book_ticket(Request $request) {

        $request->validate([
            'passenger_id' => 'required|integer',
            'type' => 'required|in:one_way,pass',
            'ride_id' => 'required|integer',
        ]);

        $passengerId = $request->input('passenger_id');
        $type = $request->input('type');
        $rideId = $request->input('ride_id');

        $ticket = new Ticket();
        $ticket->passenger_id = $passengerId;
        $ticket->type = $type;
        $ticket->ride_id = $rideId;
        $ticket->save();
    
        return response()->json(['message' => 'Ticket booked successfully'], 201);
    }
}
