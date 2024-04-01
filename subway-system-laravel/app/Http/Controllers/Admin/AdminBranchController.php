<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\InvitationEmail;
use App\Models\Branch;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class AdminBranchController extends Controller
{
    public function store()
    {
        $data = request()->validate([
            'email' => ['required', 'email', Rule::unique('invitations')]
        ]);
        $toEmail = $data['email'];
        $email_key = $this->generateRandomKey();
        $message = "http://localhost:3000/branchAuth?email=" . $toEmail . "&key=" . $email_key;
        $invitation = new Invitation();
        $invitation->email = $toEmail;
        $invitation->key = $email_key;
        $invitation->save();
        Mail::to($toEmail)->send(new InvitationEmail($message));
        return response()->json(['status' => 'success', 'message' => 'Invitation sent successfully']);
    }
    public function create_branch(Request $request)
    {
        try {
            $data = $request->validate([
                "email" => ["required", "email", Rule::exists('invitations', 'email')],
                "key" => ["required", Rule::exists('invitations', 'key')],
                "name" => ["required", "string"],
                "password" => ["required"]
            ]);
            $user = new User();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = bcrypt($data['password']);
            $user->role_id = 1;
            $user->save();
            $branch = new Branch();
            $branch->user_id = $user->id;
            $branch->save();
            return response()->json(['status' => 'success', 'message' => "Successfully created account"]);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            return response()->json(['status' => 'failed', 'message' => 'You are cheating', 'errors' => $errors], 422);
        }
    }
    function generateRandomKey($length = 20)
    {
        return Str::random($length);
    }
}
