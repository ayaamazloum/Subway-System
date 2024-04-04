<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;

class UserTicketController extends Controller
{
    public function book_ticket(Request $request) {
        
        $request->validate([
            'type' => 'required|in:one_way,pass',
            'ride_id' => 'required|integer',
        ]);

        $passenger = Passenger::where('user_id', auth()->id())->first();
        $type = $request->input('type');
        $rideId = $request->input('ride_id');

        $ticket = new Ticket();
        $ticket->passenger_id = $passenger->id;
        $ticket->type = $type;
        $ticket->ride_id = $rideId;
        $ticket->save();
    
        return response()->json(['message' => 'Ticket booked successfully'], 201);
    }
}
