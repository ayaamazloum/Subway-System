<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\DB;

class PassengerMessageController extends Controller
{
    public function index()
    {
        $messages = DB::table('messages')
            ->join('branches', 'messages.receiver_id', '=', 'branches.user_id')
            ->join('stations', 'branches.id', '=', 'stations.branch_id')
            ->where('messages.sender_id', '=', auth()->id())
            ->select('messages.message', 'messages.content', 'stations.name as station_name')
            ->distinct()
            ->get();
        return response()->json(['status' => 'success', 'data' => $messages], 200);
    }
    public function store()
    {
        $data = request()->validate([
            'receiver_id' => 'required',
            'message' => 'required|string',
        ]);
        $data['sender_id'] = auth()->id();
        $data['receiver_id'] = request()->receiver_id;
        $data['content'] = request()->content;
        Message::create($data);
        return response()->json(['status' => 'success', 'messsage' => "Message Sent Successfully"], 200);
    }
}
