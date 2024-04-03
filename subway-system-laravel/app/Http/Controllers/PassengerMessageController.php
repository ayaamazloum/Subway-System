<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Branch;
use Illuminate\Support\Facades\DB;

class PassengerMessageController extends Controller
{
    public function index()
    {
        $passenger_messages = DB::table('messages')
            ->join('branches', 'messages.receiver_id', '=', 'branches.user_id')
            ->join('stations', 'branches.id', '=', 'stations.branch_id')
            ->where('messages.sender_id', '=', auth()->id())
            ->select('messages.content', 'stations.name as station_name')
            ->distinct()
            ->get();
        $branch_replies = DB::table('messages')
            ->join('users', 'messages.receiver_id', '=', 'users.id')
            ->join('branches', 'messages.sender_id', '=', 'branches.user_id')
            ->join('stations', 'branches.id', '=', 'stations.branch_id')
            ->where('messages.receiver_id', '=', auth()->id())
            ->select('messages.content', 'stations.name as station_name')
            ->distinct()
            ->get();
        return response()->json([
            'status' => 'success', 
            'passenger_messages' => $passenger_messages,
            'branch_replies' => $branch_replies], 200);
    }
    public function store()
    {
        $data = request()->validate([
            'receiver_id' => 'required',
            'content' => 'required|string',
        ]);
        $branch_id = Branch::where('id', request()->receiver_id)->first()->user_id;
        $data['sender_id'] = auth()->id();
        $data['receiver_id'] = $branch_id;
        $data['content'] = request()->content;
        Message::create($data);
        return response()->json(['status' => 'success', 'messsage' => "Message Sent Successfully"], 200);
    }
}
