<?php

namespace App\Http\Controllers\Branch;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BranchMessageController extends Controller
{
    public function index()
    {
        $messages = DB::table('messages')
            ->join('users', 'messages.sender_id', '=', 'users.id')
            ->where('users.role_id', '=', 1)
            ->select('messages.*', 'users.name as sender_name', 'users.email as sender_email')
            ->get();
        return response()->json(['status' => 'success', 'data' => $messages], 200);
    }
    public function store()
    {
        $data = request()->validate([
            'receiver_id' => 'required',
            'content' => 'required|string|max:300',
        ]);
        $data['sender_id'] = auth()->id();
        Message::create($data);
        return response()->json(['status' => 'success', 'messsage' => "Message Sent Successfully"], 200);
    }
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();
        return response()->json(['status' => 'success', 'messsage' => "Message Deleted Successfully"], 200);
    }
}
