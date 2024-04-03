<?php

namespace App\Http\Controllers\Branch;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BranchMessageController extends Controller
{
    public function index()
    {
        $user_id = auth()->id();
        $branch = Branch::where('user_id', $user_id)->first();

        if ($branch) {
            $messages = DB::table('messages')
                ->join('users', 'messages.sender_id', '=', 'users.id')
                ->where('messages.receiver_id', '=', $branch->user_id)
                ->select('messages.*', 'users.name as sender_name', 'users.email as sender_email')
                ->get();

            return response()->json(['status' => 'success', 'data' => $messages], 200);
        }
    }
    public function store()
    {
        $data = request()->validate([
            'receiver_id' => 'required',
            'content' => 'required|string|max:300',
        ]);
        $data['sender_id'] = auth()->id();
        $message = new Message();
        $message->receiver_id = $data['receiver_id'];
        $message->sender_id = $data['sender_id'];
        $message->content = $data['content'];
        $message->save();
        return response()->json(['status' => 'success', 'message' => "Message Sent Successfully"], 200);
    }
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();
        return response()->json(['status' => 'success', 'message' => "Message Deleted Successfully"], 200);
    }
}
